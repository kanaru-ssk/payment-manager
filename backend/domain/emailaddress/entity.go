package emailaddress

import (
	"fmt"
	"net/mail"

	"github.com/kanaru-ssk/payment-manager/backend/domain/status"
)

type EmailAddress string

func NewEmailAddress(email string) (EmailAddress, error) {
	a, err := mail.ParseAddress(email)
	if err != nil {
		return "", fmt.Errorf("domain.email.NewEmail: %w: %w", status.ErrEmailAddressInvalidEmailFormat, err)
	}

	return EmailAddress(a.Address), nil
}

func (e EmailAddress) String() string {
	return string(e)
}
