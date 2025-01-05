package user

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

const (
	ErrInvalidEmailCode = 1001
)

var (
	ErrInvalidEmail = apperror.NewAppError(ErrInvalidEmailCode, "invalid email")
)
