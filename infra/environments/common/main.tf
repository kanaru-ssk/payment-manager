locals {
  environment        = "common"
  project_id         = "${local.environment}-${var.project_name}"
  dev_project_number = 604586293033
  prd_project_number = 811083787873
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
    "iamcredentials.googleapis.com"
  ]
}

# Terraform Backend用のCloud Storage Bucketを作成
resource "google_storage_bucket" "terraform_backend" {
  name          = "terraform-backend-${var.project_name}"
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true
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

# GitHub ActionsのService Accountを作成
module "github_actions_service_account" {
  source = "../../modules/github_actions_service_account"
}

# GitHub ActionsのService AccountにArtifact Registry書き込み権限を付与
resource "google_artifact_registry_repository_iam_member" "github_actions_writer" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${module.github_actions_service_account.email}"
}

# dev,prd環境のCloud Run Service AgentにArtifact Registry読み取り権限を付与
# see: https://cloud.google.com/run/docs/deploying?hl=ja#other-projects
resource "google_artifact_registry_repository_iam_member" "dev_cloud_run_reader" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:service-${local.dev_project_number}@serverless-robot-prod.iam.gserviceaccount.com"
}
resource "google_artifact_registry_repository_iam_member" "prd_cloud_run_reader" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:service-${local.prd_project_number}@serverless-robot-prod.iam.gserviceaccount.com"
}
