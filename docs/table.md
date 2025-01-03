# テーブル定義

※ ユーザーデータは Google Cloud Identity Platform に保存します。

## payment_categories (支出カテゴリーテーブル)

| 論理名            | 物理名                | データ型    | Default           | NULL | 制約                         |
| ----------------- | --------------------- | ----------- | ----------------- | ---- | ---------------------------- |
| 支出カテゴリー ID | payment_category_id   | uuid        | gen_random_uuid() | N    | PRIMARY KEY                  |
| ユーザー ID       | user_id               | uuid        |                   | Y    | FOREIGN KEY (users) 更新不可 |
| カラー ID         | color_id              | uuid        |                   | N    | FOREIGN KEY (colors)         |
| 支出カテゴリー名  | payment_category_name | varchar(64) |                   | N    |                              |
| 必要支出フラグ    | is_needs              | boolean     |                   | N    |                              |
| カラーコード      | color_code            | varchar(7)  |                   | N    | color_code_check             |
| 作成日時          | created_at            | timestamptz | current_timestamp | N    | 更新不可                     |
| 更新日時          | updated_at            | timestamptz | current_timestamp | N    | 自動更新                     |

### インデックス

- idx_payment_categories_user_id (user_id)
- idx_payment_categories_is_needs (is_needs)

## payments (支出テーブル)

| 論理名                           | 物理名              | データ型    | Default           | NULL | 制約                             |
| -------------------------------- | ------------------- | ----------- | ----------------- | ---- | -------------------------------- |
| 支出 ID                          | payment_id          | uuid        | gen_random_uuid() | N    | PRIMARY KEY                      |
| ユーザー ID                      | user_id             | uuid        |                   | N    | FOREIGN KEY (users) 更新不可     |
| 支出カテゴリー ID                | payment_category_id | uuid        |                   | N    | FOREIGN KEY (payment_categories) |
| 支出対象                         | payment_target      | varchar(64) |                   | N    |                                  |
| 支出金額                         | payment_amount      | integer     |                   | N    | payment_amount_check             |
| 満足度 (-1:低い, 0:普通, 1:高い) | satisfaction_level  | integer     |                   | N    | satisfaction_level_check         |
| 支出日時                         | paid_at             | timestamptz | current_timestamp | N    |                                  |
| 作成日時                         | created_at          | timestamptz | current_timestamp | N    | 更新不可                         |
| 更新日時                         | updated_at          | timestamptz | current_timestamp | N    | 自動更新                         |

### インデックス

- idx_payments_user_id (user_id)
- idx_payments_payment_category_id (payment_category_id)
- idx_payments_payment_amount (payment_amount)
- idx_payments_satisfaction_level (satisfaction_level)
- idx_payments_paid_at (paid_at)
