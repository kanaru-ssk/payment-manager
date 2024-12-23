-- migrate:up
-- user_id の更新を防ぐ関数
CREATE OR REPLACE FUNCTION prevent_user_id_update () RETURNS TRIGGER AS $$
BEGIN
    -- user_id の更新を防ぐ
    NEW.user_id = OLD.user_id;
    IF OLD.user_id != NEW.user_id THEN
        RAISE EXCEPTION 'cannot update user_id column';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 支出カテゴリーテーブルのuser_id の更新を防ぐトリガー
CREATE TRIGGER prevent_user_id_update_before_update BEFORE
UPDATE ON payment_categories FOR EACH ROW
EXECUTE FUNCTION prevent_user_id_update ();

-- 支出テーブルのuser_id の更新を防ぐトリガー
CREATE TRIGGER prevent_user_id_update_before_update BEFORE
UPDATE ON payments FOR EACH ROW
EXECUTE FUNCTION prevent_user_id_update ();

-- migrate:down
DROP TRIGGER prevent_user_id_update_before_update ON payment_categories;
DROP TRIGGER prevent_user_id_update_before_update ON payments;
DROP FUNCTION prevent_user_id_update;
