-- migrate:up
-- 支出テーブル
CREATE TABLE payments (
    payment_id uuid DEFAULT gen_random_uuid () PRIMARY KEY, -- 支出ID
    user_id uuid NOT NULL, -- ユーザーID
    payment_category_id uuid NOT NULL, -- 支出カテゴリーID
    payment_target varchar(64) NOT NULL, -- 支出対象
    payment_amount integer NOT NULL, -- 支出金額
    satisfaction_level integer DEFAULT 0 NOT NULL, -- 満足度 (-1:低い, 0:普通, 1:高い)
    paid_at timestamptz DEFAULT current_timestamp NOT NULL, -- 支出日時
    created_at timestamptz DEFAULT current_timestamp NOT NULL, -- 作成日時
    updated_at timestamptz DEFAULT current_timestamp NOT NULL, -- 更新日時
    -- 制約
    FOREIGN KEY (payment_category_id) REFERENCES payment_categories (payment_category_id) ON DELETE RESTRICT,
    CONSTRAINT payment_amount_check CHECK (payment_amount >= 0),
    CONSTRAINT satisfaction_level_check CHECK (satisfaction_level IN (-1, 0, 1))
);

CREATE INDEX idx_payments_user_id ON payments (user_id);

CREATE INDEX idx_payments_payment_category_id ON payments (payment_category_id);

CREATE INDEX idx_payments_payment_amount ON payments (payment_amount);

CREATE INDEX idx_payments_satisfaction_level ON payments (satisfaction_level);

CREATE INDEX idx_payments_paid_at ON payments (paid_at);

-- migrate:down
DROP INDEX idx_payments_user_id;

DROP INDEX idx_payments_payment_category_id;

DROP INDEX idx_payments_payment_amount;

DROP INDEX idx_payments_satisfaction_level;

DROP INDEX idx_payments_paid_at;

DROP TABLE payments;
