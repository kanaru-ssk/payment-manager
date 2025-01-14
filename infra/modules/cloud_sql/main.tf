resource "google_sql_database_instance" "instance" {
  name                = var.instance_name
  region              = var.region
  database_version    = "POSTGRES_17"
  deletion_protection = false

  settings {
    edition = "ENTERPRISE"
    tier    = "db-f1-micro"
    ip_configuration {
      ipv4_enabled                                  = false
      private_network                               = var.vpc_link
      enable_private_path_for_google_cloud_services = true
    }
  }
}

resource "google_sql_database" "database" {
  depends_on = [google_sql_database_instance.instance]

  instance = google_sql_database_instance.instance.name
  name     = var.database_name
}

resource "google_sql_user" "user" {
  depends_on = [google_sql_database_instance.instance]

  instance = google_sql_database_instance.instance.name
  name     = var.user_name
  password = var.user_password
}
