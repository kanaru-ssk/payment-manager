package user

import "fmt"

type UserError struct {
	Code    int
	Message string
}

func NewUserError(code int, message string) *UserError {
	return &UserError{
		Code:    code,
		Message: message,
	}
}

func (e *UserError) Error() string {
	return fmt.Sprintf("UserError [Code: %d] %s", e.Code, e.Message)
}

const (
	ErrUserNotFoundCode     = 1001
	ErrInvalidUserInputCode = 1002
)

var (
	ErrUserNotFound     = NewUserError(ErrUserNotFoundCode, "user not found")
	ErrInvalidUserInput = NewUserError(ErrInvalidUserInputCode, "invalid user input")
)
