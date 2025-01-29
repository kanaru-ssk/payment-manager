variable "secret_names" {
  type        = set(string)
  description = "A list of secret name to create"
}

variable "accessor" {
  type        = string
  description = "member to access secret"
}
