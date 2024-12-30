UPDATE users
SET
    user_name = $1,
    email = $2
RETURNING
    user_id,
    user_name,
    email,
    created_at,
    updated_at;