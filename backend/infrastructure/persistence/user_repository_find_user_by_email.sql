SELECT
    user_id,
    user_name,
    email,
    created_at,
    updated_at
FROM
    users
WHERE
    email = $1;
