package persistence

import (
	"context"
	"database/sql"
	_ "embed"

	"github.com/kanaru-ssk/payment-manager/backend/domain/paymentcategory"
)

type PaymentCategoryRepository struct {
	db *sql.DB
}

func NewPaymentCategoryRepository(
	db *sql.DB,
) paymentcategory.PaymentCategoryRepository {
	return &PaymentCategoryRepository{db: db}
}

//go:embed payment_category_repository_find_payment_categories_by_user_id.sql
var payment_category_repository_find_payment_categories_by_user_id string

func (r *PaymentCategoryRepository) FindPaymentCategoriesByUserId(ctx context.Context, userId string) ([]paymentcategory.PaymentCategory, error) {
	var pcs []paymentcategory.PaymentCategory
	rows, err := r.db.Query(payment_category_repository_find_payment_categories_by_user_id, userId)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var pc paymentcategory.PaymentCategory
		if err := rows.Scan(&pc.PaymentCategoryId, &pc.UserId, &pc.PaymentCategoryName, &pc.IsNeeds, &pc.ColorCode, &pc.CreatedAt, &pc.UpdatedAt); err != nil {
			return nil, err
		}
		pcs = append(pcs, pc)
	}

	return pcs, nil
}
