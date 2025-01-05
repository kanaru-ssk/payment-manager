-- migrate:up
-- 支出カテゴリーテーブル
CREATE TYPE color_name_enum AS ENUM(
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
);

CREATE TABLE payment_categories (
    payment_category_id uuid DEFAULT gen_random_uuid () PRIMARY KEY, -- 支出カテゴリーID
    user_id varchar(64), -- ユーザーID (NULL以外はuser独自のカテゴリー)
    payment_category_name varchar(64) NOT NULL, -- 支出カテゴリー名
    is_needs boolean NOT NULL, -- 必要支出フラグ
    color_name color_name_enum NOT NULL, -- カラー名
    color_tone smallint NOT NULL, -- カラートーン
    created_at timestamptz DEFAULT current_timestamp NOT NULL, -- 作成日時
    updated_at timestamptz DEFAULT current_timestamp NOT NULL -- 更新日時
    -- 制約
    CONSTRAINT color_tone_check CHECK (
        color_tone IN (
            50,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            950
        )
    )
);

CREATE INDEX idx_payment_categories_user_id ON payment_categories (user_id);

CREATE INDEX idx_payment_categories_is_needs ON payment_categories (is_needs);

-- migrate:down
DROP INDEX idx_payment_categories_user_id;

DROP INDEX idx_payment_categories_is_needs;

DROP TABLE payment_categories;

DROP TYPE color_name_enum;