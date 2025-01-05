variable "region" {
  type        = string
  description = "Region"
}

variable "subnetworks" {
  type = map(object({
    name          = string
    ip_cidr_range = string
  }))
  description = "A list of subnetwork"
}
