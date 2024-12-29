# データベース

Payment Manager のデータベースサービス

※ README 内のコマンドはプロジェクトルートで実行してください。

## 使用技術

- インフラ : [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/postgresql)
- RDBMS : [PostgreSQL](https://www.postgresql.org)
- マイグレーション : [dbmage](https://github.com/amacneil/dbmate)

## 開発用コマンド

```sh
./scripts/dev/dbmate.sh help                   # ヘルプを表示
./scripts/dev/dbmate.sh new create_users_table # 新しいマイグレーションファイルを作成
./scripts/dev/dbmate.sh up                     # 最新バージョンにマイグレート
./scripts/dev/dbmate.sh down                   # 直近のマイグレーションをロールバック
./scripts/dev/dbmate.sh dump                   # db/schema.sqlを更新

# ローカルのデータベースに接続
PGPASSWORD=password docker compose exec db psql -U postgres -d postgres
```
