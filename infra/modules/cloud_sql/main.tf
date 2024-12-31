resource "google_sql_database_instance" "instance" {
  name             = var.instance_name
  region           = var.region
  database_version = "POSTGRES_17"

  settings {
    edition = "ENTERPRISE"
    tier    = "db-f1-micro"
  }
}

resource "google_sql_database" "database" {
  instance = google_sql_database_instance.instance.name
  name     = var.database_name
}

resource "google_sql_user" "user" {
  instance = google_sql_database_instance.instance.name
  name     = var.user_name
  password = var.user_password
}
