package user

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

type UserError struct {
	Code    int
	Message string
}

const (
	ErrInvalidEmailCode = 1001
)

var (
	ErrInvalidEmail = apperror.NewAppError(ErrInvalidEmailCode, "invalid email")
)
