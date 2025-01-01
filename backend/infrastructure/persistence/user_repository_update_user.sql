UPDATE users
SET
    user_name = $2,
    email = $3
WHERE
    user_id = $1
RETURNING
    user_id,
    user_name,
    email,
    created_at,
    updated_at;