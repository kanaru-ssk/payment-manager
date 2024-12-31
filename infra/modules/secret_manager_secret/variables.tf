variable "secret_names" {
  type        = set(string)
  description = "A list of secret name to create"
}

variable "accessor" {
  type        = string
  description = "A list of member to access secret"
}
