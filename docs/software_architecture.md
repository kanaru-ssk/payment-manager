# ソフトウェアアーキテクチャ

モノレポ構成で、バックエンド、データベース、フロントエンド、インフラを全て管理します。

```
payment-manager/
├── .github/
├── backend/
├── db/
├── docs/
├── frontend/
├── infra/
├── scripts/
└── compose.yaml
```

- [`.github`](#github)
- [`backend`](#backend)
- [`db`](#db)
- [`docs`](#docs)
- [`frontend`](#frontend)
- [`infra`](#infra)
- [`scripts`](#scripts)

## .github

Pull Request 作成時の CI や、デプロイを実行する Workflow を実装します。

## backend

backend は DDD を採用し、ドメインレイヤーは他レイヤーに依存しないようにします。

```mermaid
flowchart TB
    interfaces --> applications --> domains
    infrastructures --> domains
```

```
payment-manager/
└── backend/
    ├── cmd/
    │   └── grpc-server/
    │       └── main.go
    ├── config/
    │   └── config.go
    ├── domain/
    │   └── user/
    │       ├── entity.go
    │       ├── error.go
    │       ├── repository.go
    │       └── value_object.go
    ├── infrastructure/
    ├── interface/
    ├── lib/
    ├── usecase/
    │   └── user/
    │       └── find_by_user_id.go
    ├── test/
    ├── Dockerfile
    └── go.mod
```

## db

データベーススキーマとマイグレーション SQL を管理します。

```
payment-manager/
└── db/
    ├── migrations/
    │   ├── 20241222221600_create_users_table.sql
    │   └── 20241222224807_create_colors_table.sql
    └── schema.sql
```

## docs

開発用のドキュメントを管理します。

## frontend

frontend は backend と同様の domain を定義し、他レイヤーに依存しないようにします。

```mermaid
flowchart TB
    app --> infrastructure --> domains
    app --> components --> hooks
```

```
payment-manager/
└── frontend/
    ├── public/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   │   └── ui/
    │   ├── domain/
    │   │   └── user/
    │   │       ├── entity.ts
    │   │       ├── error.ts
    │   │       └── repository.ts
    │   ├── hooks/
    │   ├── infrastructure/
    │   └── lib/
    ├── Dockerfile
    └── package.json
```

## infra

インフラを Terraform で管理します。

```
payment-manager/
└── infra/
    ├── environments/
    │   ├── common/
    │   ├── dev/
    │   └── prd/
    ├── globals/
    │   └── common.tfvars
    └── modules/
        └── google_project/
            ├── main.tf
            └── variables.tf
```

### environments

環境ごとの Google Cloud プロジェクトを作成します。
terraform init, plan, apply コマンドは`infra/environments/{env}`配下で実行します。

### globals

各プロジェクトで共通の設定をここに置きます。

- `backend.tf` : [Terraform Backend](https://developer.hashicorp.com/terraform/language/backend)を指定
- `common.tfvars` : 共通で使用する変数。`.gitignore`に指定します。

### modules

各環境で共通で利用するリソースを定義します。

## scripts

開発用のスクリプトを管理します。
