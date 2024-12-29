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
    "artifactregistry.googleapis.com",
    "run.googleapis.com"
  ]
}

# Dockerイメージを管理するArtifact Registryのリポジトリを作成
# GitHubのmainブランチからBuildしたImageをPushするためのリポジトリ
resource "google_artifact_registry_repository" "main" {
  repository_id = "main"
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
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

# GitHub ActionsのService Accountを作成
module "github_actions_service_account" {
  source = "../../modules/github_actions_service_account"
}

# GitHub ActionsからCloud Runにデプロイするための権限を付与
resource "google_project_iam_member" "github_actions_cloud_run_developer" {
  project = local.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${module.github_actions_service_account.email}"
}
resource "google_service_account_iam_member" "service_account_act_as" {
  service_account_id = "projects/${local.project_id}/serviceAccounts/${module.google_project.project_number}-compute@developer.gserviceaccount.com"
  member             = "serviceAccount:${module.github_actions_service_account.email}"
  role               = "roles/iam.serviceAccountUser"
}
