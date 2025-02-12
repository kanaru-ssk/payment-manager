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
  project               = local.project_id
  region                = var.region
  user_project_override = true
  billing_project       = local.project_id
}

# 有効化するサービスを指定
resource "google_project_service" "services" {
  depends_on = [google_project.project]

  for_each = toset([
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "iamcredentials.googleapis.com",
    "vpcaccess.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "artifactregistry.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com",
    "identitytoolkit.googleapis.com"
  ])

  service = each.value
}

# GitHub用のService Accountを作成
module "github_service_account" {
  depends_on = [google_project.project, google_project_service.services]

  source = "../../modules/github_service_account"

  project_id     = local.project_id
  project_number = google_project.project.number
}

# Artifact Registryのリポジトリを作成
module "artifact_registry_main" {
  depends_on = [google_project.project, google_project_service.services, module.github_service_account]

  source = "../../modules/artifact_registry"

  repository_id = "main"
  region        = var.region
  reader_emails = [module.github_service_account.email]
  writer_emails = [module.github_service_account.email]
}

# VPCを作成
module "vpc" {
  depends_on = [google_project.project, google_project_service.services]

  source = "../../modules/vpc"

  region = var.region
  subnetworks = {
    subnet_backend = {
      name          = "subnet-backend"
      ip_cidr_range = "10.0.0.0/24"
    }
    subnet_frontend = {
      name          = "subnet-frontend"
      ip_cidr_range = "10.0.1.0/24"
    }
  }
}

# Cloud SQLを作成
module "db" {
  depends_on = [google_project.project, google_project_service.services, module.vpc]

  source = "../../modules/cloud_sql"

  instance_name = "payment-manager"
  database_name = "payment-manager"
  region        = var.region
  user_name     = "backend-${local.environment}"
  user_password = var.db_user_password
  vpc_link      = module.vpc.link
}

# backend用のCloud Run Serviceを作成
module "backend" {
  depends_on = [google_project.project, google_project_service.services]

  source = "../../modules/cloud_run_service"

  name                 = "backend"
  region               = var.region
  deploy_account_email = module.github_service_account.email
}

# frontend用のCloud Run Serviceを作成
module "frontend" {
  depends_on = [google_project.project, google_project_service.services]

  source = "../../modules/cloud_run_service"

  name                 = "frontend"
  region               = var.region
  deploy_account_email = module.github_service_account.email
}

# Secret Managerにシークレッド作成
module "frontend_secret" {
  depends_on = [google_project.project, google_project_service.services, module.frontend]

  source = "../../modules/secret_manager_secret"

  secret_names = ["BACKEND_URL"]
  accessor     = "serviceAccount:${module.frontend.service_account_email}"
}
module "backend-secret" {
  depends_on = [google_project.project, google_project_service.services, module.backend]
  source     = "../../modules/secret_manager_secret"

  secret_names = ["DB_URL"]
  accessor     = "serviceAccount:${module.backend.service_account_email}"
}

# Identity Platformを作成
module "identity_platform" {
  depends_on = [google_project.project, google_project_service.services]

  source         = "../../modules/identity_platform"
  region         = var.region
  project_number = google_project.project.number
  project_id     = local.project_id
  admin_emails   = ["serviceAccount:${module.backend.service_account_email}"]
}
