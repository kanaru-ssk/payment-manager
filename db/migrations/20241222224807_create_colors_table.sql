-- migrate:up
-- カラーテーブル
CREATE TABLE colors (
    color_id uuid DEFAULT gen_random_uuid () PRIMARY KEY, -- カラーID
    color_code varchar(7) NOT NULL, -- カラーコード
    created_at timestamptz DEFAULT current_timestamp NOT NULL, -- 作成日時
    updated_at timestamptz DEFAULT current_timestamp NOT NULL, -- 更新日時
    -- 制約
    CONSTRAINT color_code_check CHECK (color_code ~ '^#[0-9A-Fa-f]{6}$')
);

-- migrate:down
DROP TABLE colors;
