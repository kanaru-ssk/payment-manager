-- migrate:up
-- created_at の更新を防ぎ、updated_atを 更新する関数
CREATE
OR REPLACE FUNCTION prevent_created_at_update_and_update_updated_at () RETURNS TRIGGER AS $$
BEGIN
    -- created_at の更新を防ぐ
    NEW.created_at = OLD.created_at;
    IF OLD.created_at != NEW.created_at THEN
        RAISE EXCEPTION 'cannot update created_at column';
    END IF;

    -- updated_at を現在のタイムスタンプに更新
    NEW.updated_at = current_timestamp;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 支出カテゴリーテーブルのcreated_at の更新を防ぎ、updated_atを 更新するトリガー
CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE
UPDATE ON payment_categories FOR EACH ROW
EXECUTE FUNCTION prevent_created_at_update_and_update_updated_at ();

-- 支出テーブルのcreated_at の更新を防ぎ、updated_atを 更新するトリガー
CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE
UPDATE ON payments FOR EACH ROW
EXECUTE FUNCTION prevent_created_at_update_and_update_updated_at ();

-- migrate:down
DROP TRIGGER prevent_created_at_update_and_update_updated_at_before_update ON payment_categories;

DROP TRIGGER prevent_created_at_update_and_update_updated_at_before_update ON payments;

DROP FUNCTION prevent_created_at_update_and_update_updated_at;