package status

import "fmt"

type Status struct {
	Code    int
	Message string
}

func NewStatus(code int, message string) *Status {
	return &Status{
		Code:    code,
		Message: message,
	}
}

func (e *Status) Error() string {
	return fmt.Sprintf("Status Code %d: %s", e.Code, e.Message)
}

var (
	// common status
	Ok         = NewStatus(0, "ok")
	ErrUnknown = NewStatus(1, "unknown error")

	// auth domain status
	ErrAuthInvalidVerificationToken = NewStatus(1000, "invalid verification token")

	// email address domain status
	ErrEmailAddressInvalidEmailFormat = NewStatus(2000, "invalid email format")

	// payment category domain status
	ErrPaymentCategoryInvalidColorName = NewStatus(3000, "invalid color name")
	ErrPaymentCategoryInvalidColorTone = NewStatus(3001, "invalid color tone")
)
