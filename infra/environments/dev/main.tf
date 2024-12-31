locals {
  environment = "dev"
  project_id  = "${local.environment}-${var.project_name}"
}

# Google Cloud Projectを作成
module "google_project" {
  source = "../../modules/google_project"

  name               = local.project_id
  project_id         = local.project_id
  billing_account_id = var.billing_account_id
  environment_label  = local.environment
  group_label        = var.project_name
}

provider "google" {
  project = local.project_id
  region  = var.region
}

# 有効化するサービスを指定
module "project_services" {
  source = "../../modules/project_services"

  services = [
    "iamcredentials.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "run.googleapis.com"
  ]
}

# GitHub ActionsのService Accountを作成
module "github_actions_service_account" {
  source = "../../modules/github_actions_service_account"

  project_id     = local.project_id
  project_number = module.google_project.project_number
}

# Artifact Registryのリポジトリを作成
module "artifact_registry_main" {
  source = "../../modules/artifact_registry"

  repository_id = "main"
  region        = var.region
  reader_emails = [module.github_actions_service_account.email]
  writer_emails = [module.github_actions_service_account.email]
}

# Cloud SQLを作成
module "db" {
  source = "../../modules/cloud_sql"

  instance_name = "payment-manager"
  database_name = "payment-manager"
  region        = var.region
  user_name     = "${local.environment}_backend"
  user_password = var.db_user_password
}

# backend用のCloud Run Serviceを作成
module "backend" {
  source = "../../modules/cloud_run_service"

  name   = "${local.project_id}-backend"
  region = var.region
}

# frontend用のCloud Run Serviceを作成
module "frontend" {
  source = "../../modules/cloud_run_service"

  name   = "${local.project_id}-frontend"
  region = var.region
}

# Secret Managerにシークレッド作成
module "secret" {
  source = "../../modules/secret_manager_secret"

  secret_names = ["DATABASE_URL"]
  accessor     = "serviceAccount:${module.google_project.project_number}-compute@developer.gserviceaccount.com"
}
