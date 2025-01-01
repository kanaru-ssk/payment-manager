variable "instance_name" {
  type        = string
  description = "Google Cloud SQL Instance Name"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "vpc_link" {
  type        = string
  description = "Virtual Private Cloud Link"
}

variable "database_name" {
  type        = string
  description = "Google Cloud SQL Database Name"
}

variable "user_name" {
  type        = string
  description = "Google Cloud SQL User Name"
}

variable "user_password" {
  type        = string
  description = "Google Cloud SQL User Password"
}
