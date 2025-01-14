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
