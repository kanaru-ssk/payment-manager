locals {
  environment = "stg"
  project_id  = "${var.project_name}-${local.environment}"
}

# Google Cloud Projectを作成
resource "google_project" "project" {
  project_id      = local.project_id
  name            = local.project_id
  billing_account = var.billing_account_id

  labels = {
    environment = local.environment
    managed_by  = "terraform"
    group       = var.project_name
  }
}

provider "google" {
  project = local.project_id
  region  = var.region
}

# 有効化するサービスを指定
resource "google_project_service" "services" {
  for_each = toset([
    "iamcredentials.googleapis.com",
    "vpcaccess.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com"
  ])

  service = each.value
}

# GitHub用のService Accountを作成
module "github_service_account" {
  source = "../../modules/github_service_account"

  project_id     = local.project_id
  project_number = google_project.project.number
}

# Artifact Registryのリポジトリを作成
module "artifact_registry_main" {
  source = "../../modules/artifact_registry"

  repository_id = "main"
  region        = var.region
  reader_emails = [module.github_service_account.email]
  writer_emails = [module.github_service_account.email]
}

# VPCを作成
resource "google_compute_network" "vpc" {
  name                    = "vpc"
  auto_create_subnetworks = false
}

# backendリクエスト用のサブネットを作成
resource "google_compute_subnetwork" "backend_subnet" {
  name                     = "backend-subnet"
  ip_cidr_range            = "10.0.0.0/24"
  region                   = var.region
  network                  = google_compute_network.vpc.id
  private_ip_google_access = true
}

# dbリクエスト用のサブネットを作成
resource "google_compute_subnetwork" "db_subnet" {
  name          = "db-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id
}

resource "google_compute_global_address" "private_ip_address" {
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

resource "google_service_networking_connection" "default" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

# Cloud SQLを作成
module "db" {
  source = "../../modules/cloud_sql"

  instance_name = "payment-manager"
  database_name = "payment-manager"
  region        = var.region
  user_name     = "backend-${local.environment}"
  user_password = var.db_user_password
  vpc_link      = google_compute_network.vpc.self_link
}

# backend用のCloud Run Serviceを作成
module "backend" {
  source = "../../modules/cloud_run_service"

  name                 = "backend"
  region               = var.region
  deploy_account_email = module.github_service_account.email
}

# frontend用のCloud Run Serviceを作成
module "frontend" {
  source = "../../modules/cloud_run_service"

  name                 = "frontend"
  region               = var.region
  deploy_account_email = module.github_service_account.email
}

# Secret Managerにシークレッド作成
module "frontend_secret" {
  source = "../../modules/secret_manager_secret"

  secret_names = ["BACKEND_URL"]
  accessor     = "serviceAccount:${module.frontend.service_account_email}"
}
module "backend-secret" {
  source = "../../modules/secret_manager_secret"

  secret_names = ["DB_URL"]
  accessor     = "serviceAccount:${module.backend.service_account_email}"
}
