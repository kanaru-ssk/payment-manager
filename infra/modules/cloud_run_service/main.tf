# Cloud Run Service
resource "google_cloud_run_v2_service" "default" {
  name     = var.name
  location = var.region

  template {
    containers {
      # リソース作成時はサンプルのイメージで作成
      # 実際のイメージはGitHub Actionsでデプロイする
      image = "us-docker.pkg.dev/cloudrun/container/hello"
    }
  }

  # リソース作成後、containersの変更を無視する
  lifecycle {
    ignore_changes = [template]
  }
}

# 未認証の呼び出しを許可
resource "google_cloud_run_service_iam_binding" "default" {
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  members  = ["allUsers"]
}

resource "google_service_account" "cloud_run_sa" {
  account_id = var.name
}

resource "google_service_account_iam_member" "service_account_act_as" {
  service_account_id = google_service_account.cloud_run_sa.id
  member             = "serviceAccount:${var.deploy_account_email}"
  role               = "roles/iam.serviceAccountUser"
}
