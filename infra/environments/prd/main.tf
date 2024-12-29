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
    "iamcredentials.googleapis.com",
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

  project_id     = local.project_id
  project_number = module.google_project.project_number
}

# GitHub ActionsのService AccountにArtifact Registry読み取り権限を付与
# Buildするコミットのイメージが既に存在するか確認するため
resource "google_artifact_registry_repository_iam_member" "github_actions_reader" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${module.github_actions_service_account.email}"
}
# GitHub ActionsのService AccountにArtifact Registry書き込み権限を付与
# BuildしたImageをPushするため
resource "google_artifact_registry_repository_iam_member" "github_actions_writer" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${module.github_actions_service_account.email}"
}
