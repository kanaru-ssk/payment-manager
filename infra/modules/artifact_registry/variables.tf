variable "repository_id" {
  type        = string
  description = "Artifact Registry Repository ID"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "reader_emails" {
  type        = list(string)
  description = "A list of email with reader role"
}

variable "writer_emails" {
  type        = list(string)
  description = "A list of email with writer role"
}
