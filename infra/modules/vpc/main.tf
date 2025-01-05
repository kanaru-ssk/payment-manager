# VPCを作成
resource "google_compute_network" "vpc" {
  name                    = "vpc"
  auto_create_subnetworks = false
}

# サブネットを作成
resource "google_compute_subnetwork" "subnetwork" {
  for_each                 = var.subnetworks
  name                     = each.value.name
  ip_cidr_range            = each.value.ip_cidr_range
  region                   = var.region
  network                  = google_compute_network.vpc.id
  private_ip_google_access = true
}

# see: https://cloud.google.com/sql/docs/postgres/configure-private-ip
# プライベートIPアドレスを作成
resource "google_compute_global_address" "private_ip_address" {
  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.id
}

# Service Networking接続を作成
resource "google_service_networking_connection" "default" {
  network                 = google_compute_network.vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}
