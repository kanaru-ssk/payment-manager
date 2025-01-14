# see: https://github.com/google-github-actions/auth?tab=readme-ov-file#preferred-direct-workload-identity-federation

# GitHub用のService Accountを作成
resource "google_service_account" "github" {
  account_id = "github"
}

# Workload Identity Poolを作成
resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github"
}

# 上のPoolにWorkload Identity Providerを作成
resource "google_iam_workload_identity_pool_provider" "github" {
  depends_on = [google_iam_workload_identity_pool.github]

  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github"
  attribute_condition                = "attribute.repository == 'kanaru-ssk/payment-manager'"

  attribute_mapping = {
    "google.subject"        = "assertion.sub"
    "attribute.actor"       = "assertion.actor"
    "attribute.aud"         = "assertion.aud"
    "attribute.repository"  = "assertion.repository"
    "attribute.environment" = "assertion.environment"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# Workload Identity Poolから Google Cloud リソースへの認証を許可
resource "google_service_account_iam_member" "workload_identity_user" {
  depends_on = [google_service_account.github]

  service_account_id = google_service_account.github.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/projects/${var.project_number}/locations/global/workloadIdentityPools/github/attribute.repository/kanaru-ssk/payment-manager"
}

# GitHubからCloud Runにデプロイするための権限を付与
resource "google_project_iam_member" "github_cloud_run_developer" {
  depends_on = [google_service_account.github]

  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.github.email}"
}
