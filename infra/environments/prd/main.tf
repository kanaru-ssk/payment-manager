locals {
  environment = "prd"
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
    "run.googleapis.com"
  ]
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
