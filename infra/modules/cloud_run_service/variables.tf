variable "name" {
  type        = string
  description = "Google Cloud Run Service Name"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "deploy_account_email" {
  type        = string
  description = "Email address of the service account that deploys the Cloud Run service"
}
