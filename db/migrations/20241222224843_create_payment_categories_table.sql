-- migrate:up
-- 支出カテゴリーテーブル
CREATE TABLE payment_categories (
    payment_category_id uuid DEFAULT gen_random_uuid () PRIMARY KEY, -- 支出カテゴリーID
    user_id uuid, -- ユーザーID (NULL以外はuser独自のカテゴリー)
    color_id uuid NOT NULL, -- カラーID
    payment_category_name varchar(64) NOT NULL, -- 支出カテゴリー名
    is_needs boolean NOT NULL, -- 必要支出フラグ
    created_at timestamptz DEFAULT current_timestamp NOT NULL, -- 作成日時
    updated_at timestamptz DEFAULT current_timestamp NOT NULL, -- 更新日時
    -- 制約
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors (color_id) ON DELETE RESTRICT
);

-- migrate:down
DROP TABLE payment_categories;
