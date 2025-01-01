terraform {
  backend "gcs" {
    bucket = "payment-manager-terraform-backend"
    prefix = "stg"
  }
}
