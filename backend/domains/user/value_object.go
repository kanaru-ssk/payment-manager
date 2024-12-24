package user

import (
	"regexp"
)

type Email string

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$`)

func NewEmail(email string) (Email, error) {
	if !isValidEmailFormat(email) {
		return "", ErrInvalidEmail
	}
	return Email(email), nil
}

func isValidEmailFormat(email string) bool {
	return emailRegex.MatchString(email)
}

func (e Email) String() string {
	return string(e)
}
