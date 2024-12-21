# テーブル定義

## users テーブル

| 論理名         | 物理名     | データ型     | Default           | NULL | 制約        |
| -------------- | ---------- | ------------ | ----------------- | ---- | ----------- |
| ユーザー ID    | user_id    | uuid         | gen_random_uuid   | N    | PRIMARY KEY |
| ユーザー名     | user_name  | varchar(256) |                   | N    |             |
| メールアドレス | email      | varchar(256) |                   | N    | UNIQUE      |
| 作成日時       | created_at | timestamptz  | current_timestamp | N    |             |
| 更新日時       | updated_at | timestamptz  | current_timestamp | N    |             |

### インデックス

- idx_users_email (email)

## colors テーブル

| 論理名       | 物理名     | データ型    | Default           | NULL | 制約        |
| ------------ | ---------- | ----------- | ----------------- | ---- | ----------- |
| カラー ID    | color_id   | uuid        | gen_random_uuid   | N    | PRIMARY KEY |
| カラーコード | color_code | varchar(7)  |                   | N    |             |
| 作成日時     | created_at | timestamptz | current_timestamp | N    |             |
| 更新日時     | updated_at | timestamptz | current_timestamp | N    |             |

## payment_categories テーブル

| 論理名            | 物理名                | データ型     | Default           | NULL | 制約                 |
| ----------------- | --------------------- | ------------ | ----------------- | ---- | -------------------- |
| 支出カテゴリー ID | payment_category_id   | uuid         | gen_random_uuid   | N    | PRIMARY KEY          |
| カラー ID         | color_id              | uuid         |                   | N    | FOREIGN KEY (colors) |
| 支出カテゴリー名  | payment_category_name | varchar(256) |                   | N    |                      |
| 必要支出フラグ    | is_needs              | boolean      |                   | N    |                      |
| 作成日時          | created_at            | timestamptz  | current_timestamp | N    |                      |
| 更新日時          | updated_at            | timestamptz  | current_timestamp | N    |                      |

## payments テーブル

| 論理名                           | 物理名              | データ型    | Default           | NULL | 制約                             |
| -------------------------------- | ------------------- | ----------- | ----------------- | ---- | -------------------------------- |
| 支出 ID                          | payment_id          | uuid        | gen_random_uuid   | N    | PRIMARY KEY                      |
| 支出ユーザー ID                  | paid_user_id        | uuid        |                   | N    | FOREIGN KEY (users)              |
| 支出カテゴリー ID                | payment_category_id | uuid        |                   | N    | FOREIGN KEY (payment_categories) |
| 支出対象                         | payment_target      | varchar(64) |                   | N    |                                  |
| 支出金額                         | payment_amount      | integer     |                   | N    | CHECK (>= 0)                     |
| 満足度 (-1:低い, 0:普通, 1:高い) | satisfaction_level  | integer     |                   | N    | CHECK (IN (-1, 0, 1))            |
| 支出日時                         | paid_at             | timestamptz | current_timestamp | N    |                                  |
| 作成日時                         | created_at          | timestamptz | current_timestamp | N    |                                  |
| 更新日時                         | updated_at          | timestamptz | current_timestamp | N    |                                  |

### インデックス

- idx_payments_paid_user_id (paid_user_id)
- idx_payments_payment_category_id (payment_category_id)
- idx_payments_paid_at (paid_at)
