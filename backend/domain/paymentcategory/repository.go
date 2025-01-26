package paymentcategory

import (
	"context"
)

type Repository interface {
	// FindPaymentCategoriesByUserId : 指定されたuserIdに基づいて支出カテゴリーを取得
	// userId: ユーザーID
	// return: 支出カテゴリーの配列
	FindPaymentCategoriesByUserId(ctx context.Context, userId string) ([]PaymentCategory, error)
}
