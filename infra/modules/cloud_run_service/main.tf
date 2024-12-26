# Cloud Run Service
resource "google_cloud_run_v2_service" "default" {
  project  = var.project_id
  name     = var.name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # TODO: backendはINGRESS_TRAFFIC_INTERNAL_ONLYにする

  template {
    containers {
      # リソース作成時はサンプルのイメージで作成
      # 実際のイメージはGitHub Actionsでデプロイする
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }

  # リソース作成後、templateの変更を無視する
  lifecycle {
    ignore_changes = [template]
  }
}

# 未認証の呼び出しを許可
resource "google_cloud_run_service_iam_binding" "default" {
  project  = var.project_id
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  members  = ["allUsers"]
}
