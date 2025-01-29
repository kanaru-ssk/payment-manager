variable "region" {
  type        = string
  description = "Region"
}

variable "project_number" {
  type        = string
  description = "Google Cloud Project Number"
}

variable "project_id" {
  type        = string
  description = "Google Cloud Project ID"
}

variable "admin_emails" {
  type        = list(string)
  description = "A list of email with admin role"
}
