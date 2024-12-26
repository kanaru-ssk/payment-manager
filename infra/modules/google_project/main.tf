# Google Cloud Project
resource "google_project" "project" {
  project_id      = var.project_id
  name            = var.name
  billing_account = var.billing_account_id

  labels = {
    environment = var.environment_label
    managed_by  = "terraform"
    group       = var.group_label
  }
}
