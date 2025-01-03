package paymentcategory

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

const (
	ErrInvalidColorCodeCode = 2001
)

var (
	ErrInvalidColorCode = apperror.NewAppError(ErrInvalidColorCodeCode, "invalid color code")
)
