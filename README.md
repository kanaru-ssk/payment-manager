# Payment Manager

家計管理アプリケーション

## 家計管理の目的

1. 支出の内訳を把握する
2. 最低限の生活費を把握する
3. 満足度の低い支出を減らし、満足度の高い支出を増やす

## 主に管理する項目

- 支出対象
- 支出金額
- 支出日
- カテゴリー
- 必要支出フラグ (最低限の生活に必要か)
- 満足度 (低い or 普通 or 高い)

## 設計書

- [インフラ構成図](/docs/infrastructure.md)
- [ER 図](/docs/entity_relationship.md)
- [テーブル定義](/docs/table.md)
- [ソフトウェアアーキテクチャ](/docs/software_architecture.md)

## ローカル起動方法

```sh
docker compose up --watch # 全サービス起動
./scripts/dbmate.sh up    # DBスキーマ適用
./scripts/dbseed.sh       # テストデータ挿入
```
