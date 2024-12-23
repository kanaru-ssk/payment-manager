# データベース

データベースは[PostgreSQL](https://www.postgresql.org)、マイグレーションは[dbmate](https://github.com/amacneil/dbmate)を使用します。

※ README 内のコマンドはプロジェクトルートで実行してください。

## データベースのローカル起動

```sh
docker compose up -d db
```

## ローカルのデータベースに接続

```sh
PGPASSWORD=password docker compose exec db psql -U postgres -d postgres
```

## dbmate コマンド

```sh
./scripts/dev/dbmate.sh help                   # ヘルプを表示
./scripts/dev/dbmate.sh new create_users_table # 新しいマイグレーションファイルを作成
./scripts/dev/dbmate.sh up                     # 最新バージョンにマイグレート
./scripts/dev/dbmate.sh down                   # 直近のマイグレーションをロールバック
./scripts/dev/dbmate.sh dump                   # db/schema.sqlを更新
```
