resource "google_identity_platform_config" "default" {
  sign_in {
    email {
      enabled           = true
      password_required = false
    }
    phone_number {
      enabled            = false
      test_phone_numbers = {}
    }
  }
  authorized_domains = [
    "localhost",
    "backend-${var.project_number}.${var.region}.run.app",
    "frontend-${var.project_number}.${var.region}.run.app",
  ]
}

resource "google_identity_platform_default_supported_idp_config" "default" {
  enabled       = true
  idp_id        = "google.com"
  client_id     = "client-id"
  client_secret = "secret"
}
