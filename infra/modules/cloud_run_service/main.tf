resource "google_cloud_run_v2_service" "default" {
  name     = var.name
  project  = var.project_id
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" # 実際のイメージはGitHub Actionsでデプロイする
    }
  }

  # リソース作成後、templateの変更を無視する
  lifecycle {
    ignore_changes = [template]
  }
}

// 未認証の呼び出しを許可
resource "google_cloud_run_service_iam_binding" "default" {
  project  = var.project_id
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  members  = ["allUsers"]
}
