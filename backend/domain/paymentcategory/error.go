package paymentcategory

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

const (
	ErrInvalidColorNameCode = iota + 1100
	ErrInvalidColorToneCode
)

var (
	ErrInvalidColorName = apperror.NewAppError(ErrInvalidColorNameCode, "invalid color name")
	ErrInvalidColorTone = apperror.NewAppError(ErrInvalidColorToneCode, "invalid color tone")
)
