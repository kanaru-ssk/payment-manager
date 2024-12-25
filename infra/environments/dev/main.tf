locals {
  environment = "dev"
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

module "project_services" {
  source     = "../../modules/project_services"
  project_id = local.project_id
  services = [
    "run.googleapis.com"
  ]
}

module "backend" {
  source = "../../modules/cloud_run_service"

  name       = "${local.project_id}-backend"
  project_id = local.project_id
  region     = var.region
}
