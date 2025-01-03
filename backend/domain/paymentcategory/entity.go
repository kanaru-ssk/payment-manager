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
	ColorCode           ColorCode
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

func NewPaymentCategory(userId, paymentCategoryName string, isNeeds bool, colorCode ColorCode) PaymentCategory {
	paymentCategoryId := uuid.New()
	createdAt := time.Now()
	updatedAt := time.Now()

	return PaymentCategory{
		PaymentCategoryId:   paymentCategoryId,
		UserId:              userId,
		PaymentCategoryName: paymentCategoryName,
		IsNeeds:             isNeeds,
		ColorCode:           colorCode,
		CreatedAt:           createdAt,
		UpdatedAt:           updatedAt,
	}
}
