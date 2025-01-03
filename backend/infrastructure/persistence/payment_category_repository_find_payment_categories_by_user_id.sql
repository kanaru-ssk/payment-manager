SELECT
    payment_category_id,
    user_id,
    payment_category_name,
    is_needs,
    color_code,
    created_at,
    updated_at
FROM
    payment_categories
WHERE
    user_id = $1;
