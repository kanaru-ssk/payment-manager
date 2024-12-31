locals {
  environment = "common"
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

# Terraform Backend用のCloud Storage Bucketを作成
resource "google_storage_bucket" "terraform_backend" {
  name          = "${var.project_name}-terraform-backend"
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true
}
