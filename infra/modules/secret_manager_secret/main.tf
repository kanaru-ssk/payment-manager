resource "google_secret_manager_secret" "default" {
  for_each  = var.secret_names
  secret_id = each.key
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_iam_member" "accessors" {
  depends_on = [google_secret_manager_secret.default]

  for_each  = var.secret_names
  secret_id = google_secret_manager_secret.default[each.key].id
  role      = "roles/secretmanager.secretAccessor"
  member    = var.accessor
}
