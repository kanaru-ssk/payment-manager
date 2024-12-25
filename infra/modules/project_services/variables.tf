variable "project_id" {
  type        = string
  description = "Project id"
}

variable "services" {
  description = "A list of services to enable"
  type        = list(string)
}
