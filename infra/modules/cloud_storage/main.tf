resource "google_storage_bucket" "default" {
  name          = var.name
  location      = var.location
  project       = var.project_id
  force_destroy = true

  uniform_bucket_level_access = true
}
