-- migrate:up
-- ユーザーテーブル
CREATE TABLE users (
    user_id uuid DEFAULT gen_random_uuid () PRIMARY KEY, -- ユーザーID
    user_name varchar(64) NOT NULL, -- ユーザー名
    email varchar(256) NOT NULL UNIQUE, -- メールアドレス
    created_at timestamptz DEFAULT current_timestamp NOT NULL, -- 作成日時
    updated_at timestamptz DEFAULT current_timestamp NOT NULL, -- 更新日時
    -- 制約
    CONSTRAINT email_check CHECK (
        email ~ '^[a-zA-Z0-9](\\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    )
);
CREATE INDEX idx_users_email ON users (email);

-- migrate:down
DROP INDEX idx_users_email;
DROP TABLE users;
