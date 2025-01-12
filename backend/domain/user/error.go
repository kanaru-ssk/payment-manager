package user

import (
	"github.com/kanaru-ssk/payment-manager/backend/lib/apperror"
)

const (
	ErrInvalidEmailCode    = 1001
	ErrInvalidPasswordCode = 1002
)

var (
	ErrInvalidEmail    = apperror.NewAppError(ErrInvalidEmailCode, "invalid email")
	ErrInvalidPassword = apperror.NewAppError(ErrInvalidPasswordCode, "invalid password")
)
