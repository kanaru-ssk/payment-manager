terraform {
  backend "gcs" {
    bucket = "terraform-backend-payment-manager"
    prefix = "common"
  }
}
