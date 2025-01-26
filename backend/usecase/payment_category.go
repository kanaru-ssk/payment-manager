package usecase

import (
	"context"

	"github.com/kanaru-ssk/payment-manager/backend/domain/paymentcategory"
)

type PaymentCategoryUseCase struct {
	paymentCategoryRepository paymentcategory.Repository
}

func NewPaymentCategoryUseCase(
	paymentCategoryRepository paymentcategory.Repository,
) *PaymentCategoryUseCase {
	return &PaymentCategoryUseCase{
		paymentCategoryRepository: paymentCategoryRepository,
	}
}

func (u *PaymentCategoryUseCase) FindPaymentCategoriesByUserId(ctx context.Context, userId string) ([]paymentcategory.PaymentCategory, error) {
	pcs, err := u.paymentCategoryRepository.FindPaymentCategoriesByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}

	return pcs, nil
}
