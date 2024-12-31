variable "project_name" {
  description = "Project Name"
  type        = string
}

variable "billing_account_id" {
  type        = string
  description = "Billing Account ID"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "db_user_password" {
  type        = string
  description = "Google Cloud SQL User Password"
}
