INSERT INTO
    users (user_name, email)
VALUES
    ($1, $2)
RETURNING
    user_id,
    user_name,
    email,
    created_at,
    updated_at;