variable "project_id" {
  type        = string
  description = "Google Cloud Project ID"
}

variable "services" {
  description = "A list of services to enable"
  type        = list(string)
}
