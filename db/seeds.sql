INSERT INTO
    payment_categories (
        user_id,
        payment_category_name,
        is_needs,
        color_name,
        color_tone
    )
VALUES
    ('user-id-a', '食費', true, 'slate', 800),
    ('user-id-a', '日用品', true, 'slate', 500),
    ('user-id-a', '交通費', true, 'slate', 200),
    ('user-id-a', '趣味', false, 'amber', 800),
    ('user-id-a', '交際費', false, 'amber', 500),
    ('user-id-a', 'その他', false, 'amber', 200);
