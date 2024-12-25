locals {
  environment        = "common"
  project_id         = "${local.environment}-${var.project_name}"
  dev_project_number = 604586293033
  prd_project_number = 811083787873
}

module "google_project" {
  source = "../../modules/google_project"

  name            = local.project_id
  project_id      = local.project_id
  billing_account = var.billing_account
  environment     = local.environment
  group           = var.project_name
}

module "project_services" {
  source     = "../../modules/project_services"
  project_id = local.project_id
  services = [
    "artifactregistry.googleapis.com"
  ]
}

resource "google_storage_bucket" "terraform_backend" {
  name          = "terraform-backend-${var.project_name}"
  location      = var.region
  project       = local.project_id
  force_destroy = true

  uniform_bucket_level_access = true
}

resource "google_artifact_registry_repository" "main" {
  repository_id = "main"
  location      = var.region
  project       = local.project_id
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
}

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
