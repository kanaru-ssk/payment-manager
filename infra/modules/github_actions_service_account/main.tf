# see: https://github.com/google-github-actions/auth?tab=readme-ov-file#preferred-direct-workload-identity-federation

# GitHub Actions用のService Accountを作成
resource "google_service_account" "github_actions" {
  account_id = "github-actions"
}

# Workload Identity Poolを作成
resource "google_iam_workload_identity_pool" "github_actions" {
  workload_identity_pool_id = "github-actions"
}

# 上のPoolにWorkload Identity Providerを作成
resource "google_iam_workload_identity_pool_provider" "github_actions" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions"
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
  service_account_id = google_service_account.github_actions.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/projects/877995333513/locations/global/workloadIdentityPools/github-actions/attribute.repository/kanaru-ssk/payment-manager"
}
