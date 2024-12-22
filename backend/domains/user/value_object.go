package user

import (
	"errors"
	"regexp"
)

type Email string

func NewEmail(email string) (Email, error) {
	if !isValidEmailFormat(email) {
		return "", errors.New("invalid email format")
	}
	return Email(email), nil
}

func isValidEmailFormat(email string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(email)
}
