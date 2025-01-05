package paymentcategory

import (
	"time"

	"github.com/google/uuid"
)

type PaymentCategory struct {
	PaymentCategoryId   uuid.UUID
	UserId              string
	PaymentCategoryName string
	IsNeeds             bool
	ColorName           ColorName
	ColorTone           ColorTone
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

func NewPaymentCategory(userId, paymentCategoryName string, isNeeds bool, colorName ColorName, colorTone ColorTone) PaymentCategory {
	paymentCategoryId := uuid.New()
	createdAt := time.Now()
	updatedAt := time.Now()

	return PaymentCategory{
		PaymentCategoryId:   paymentCategoryId,
		UserId:              userId,
		PaymentCategoryName: paymentCategoryName,
		IsNeeds:             isNeeds,
		ColorName:           colorName,
		ColorTone:           colorTone,
		CreatedAt:           createdAt,
		UpdatedAt:           updatedAt,
	}
}
