# データベース

Payment Manager のデータベースサービス

※ README 内のコマンドはプロジェクトルートで実行してください。

## 使用技術

- インフラ : [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/postgresql)
- RDBMS : [PostgreSQL](https://www.postgresql.org)
- マイグレーション : [dbmage](https://github.com/amacneil/dbmate)

## 開発用コマンド

```sh
# dbmateコマンド
./scripts/dbmate.sh help # ヘルプを表示
./scripts/dbmate.sh new  # 新しいマイグレーションファイルを作成
./scripts/dbmate.sh up   # 最新バージョンにマイグレート
./scripts/dbmate.sh down # 直近のマイグレーションをロールバック
./scripts/dbmate.sh dump # db/schema.sqlを更新

# psqlコマンド
./scripts/dbclient.sh    # ローカルのデータベースに接続
./scripts/dbseed.sh      # テストデータ挿入
```

## Cloud SQL 接続

[Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/mysql/sql-prox)をローカルで起動し、これを経由して Cloud SQL に接続します。

```sh
# Cloud SQL Auth Proxy起動
./scripts/dbproxy.sh

# 開発用コマンドに環境変数を指定して接続
DB_USER=dev_backend DB_PW=password ./scripts/dbclient.sh
```
