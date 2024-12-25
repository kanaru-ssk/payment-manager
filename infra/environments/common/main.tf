locals {
  environment = "common"
}

module "google_project" {
  source = "../../modules/google_project"

  name            = "${local.environment}-${var.project_name}"
  project_id      = "${local.environment}-payment-manager"
  billing_account = var.billing_account
  environment     = local.environment
}
