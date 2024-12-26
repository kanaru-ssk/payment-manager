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
    "artifactregistry.googleapis.com"
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

# dev,prd環境のCloud Run Service AgentにArtifact Registry読み取り権限を付与
# see: https://cloud.google.com/run/docs/deploying?hl=ja#other-projects
resource "google_artifact_registry_repository_iam_binding" "binding" {
  project    = google_artifact_registry_repository.main.project
  location   = google_artifact_registry_repository.main.location
  repository = google_artifact_registry_repository.main.name
  role       = "roles/artifactregistry.reader"
  members = [
    "serviceAccount:service-${local.dev_project_number}@serverless-robot-prod.iam.gserviceaccount.com",
    "serviceAccount:service-${local.prd_project_number}@serverless-robot-prod.iam.gserviceaccount.com"
  ]
}

# github-actions用のService Accountを作成
resource "google_service_account" "github_actions" {
  account_id = "github-actions"
}

# Workload Identity Federationで認証するためのIdentity Poolを作成
# see: https://cloud.google.com/iam/docs/workload-identity-federation?hl=ja
# see: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iam_workload_identity_pool_provider#example-usage---iam-workload-identity-pool-provider-github-actions
resource "google_iam_workload_identity_pool" "github_actions" {
  workload_identity_pool_id = "github-actions"
}

# Workload Identity Federationで認証するためのIdentity Pool Providerを作成
resource "google_iam_workload_identity_pool_provider" "github_actions" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions"
  attribute_condition                = "attribute.repository == 'kanaru-ssk/payment-manager'"

  attribute_mapping = {
    "google.subject"        = "assertion.sub"
    "attribute.actor"       = "assertion.actor"
    "attribute.aud"         = "assertion.aud"
    "attribute.repository"  = "assertion.repository"
    "attribute.environment" = "assertion.environment"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}
