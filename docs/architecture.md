# アーキテクチャー

```mermaid
architecture-beta
    group google_cloud(cloud)[Google Cloud]

    service cloud_sql(database)[Cloud SQL] in google_cloud
    service cloud_run(server)[Cloud Run] in google_cloud

    cloud_run:R --> L:cloud_sql
```
