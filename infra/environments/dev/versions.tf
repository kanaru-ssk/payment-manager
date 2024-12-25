terraform {
  required_version = ">= 1.10.3"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.14.1"
    }
  }
}