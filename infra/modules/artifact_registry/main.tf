resource "google_artifact_registry_repository" "default" {
  repository_id = var.repository_id
  location      = var.region
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
}

# 読み取り権限付与
resource "google_artifact_registry_repository_iam_member" "reader" {
  depends_on = [google_artifact_registry_repository.default]

  for_each   = toset(var.reader_emails)
  project    = google_artifact_registry_repository.default.project
  location   = google_artifact_registry_repository.default.location
  repository = google_artifact_registry_repository.default.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${each.value}"
}

# 書き込み権限付与
resource "google_artifact_registry_repository_iam_member" "writer" {
  depends_on = [google_artifact_registry_repository.default]

  for_each   = toset(var.writer_emails)
  project    = google_artifact_registry_repository.default.project
  location   = google_artifact_registry_repository.default.location
  repository = google_artifact_registry_repository.default.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${each.value}"
}
