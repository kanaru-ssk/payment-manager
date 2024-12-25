locals {
  environment = "common"
  project_id  = "${local.environment}-${var.project_name}"
}

module "google_project" {
  source = "../../modules/google_project"

  name            = local.project_id
  project_id      = local.project_id
  billing_account = var.billing_account
  environment     = local.environment
  group           = var.project_name
}

module "terraform_backend" {
  source = "../../modules/cloud_storage"

  name       = "terraform-backend-${var.project_name}"
  location   = var.region
  project_id = local.project_id
}
