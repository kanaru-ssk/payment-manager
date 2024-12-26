# Google Cloud で有効化するサービスを指定する
# gcloud services enable ***.googleapis.com に対応する設定
resource "google_project_service" "services" {
  for_each = toset(var.services)
  service  = each.value
}
