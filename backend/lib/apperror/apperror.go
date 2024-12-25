package apperror

import "fmt"

type AppError struct {
	Code    int
	Message string
}

func NewAppError(code int, message string) *AppError {
	return &AppError{
		Code:    code,
		Message: message,
	}
}

func (e *AppError) Error() string {
	return fmt.Sprintf("AppError [Code: %d] %s", e.Code, e.Message)
}
