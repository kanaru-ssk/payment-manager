package paymentcategory

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

const (
	ErrInvalidColorNameCode = 2001
	ErrInvalidColorToneCode = 2002
)

var (
	ErrInvalidColorName = apperror.NewAppError(ErrInvalidColorNameCode, "invalid color name")
	ErrInvalidColorTone = apperror.NewAppError(ErrInvalidColorToneCode, "invalid color tone")
)
