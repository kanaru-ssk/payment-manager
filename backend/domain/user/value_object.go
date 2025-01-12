package user

import (
	"regexp"
)

type Email string

func NewEmail(e string) (Email, error) {
	if !isValidEmailFormat(e) {
		return "", ErrInvalidEmail
	}
	return Email(e), nil
}

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$`)

func isValidEmailFormat(e string) bool {
	return emailRegex.MatchString(e)
}

func (e Email) String() string {
	return string(e)
}

type Password string

func NewPassword(p string) (Password, error) {
	if !isValidPasswordFormat(p) {
		return "", ErrInvalidPassword
	}
	return Password(p), nil
}

var passwordRegex = regexp.MustCompile(`^[!-~]{8,}$`) // 半角英数字記号のみ8文字以上

func isValidPasswordFormat(p string) bool {
	return passwordRegex.MatchString(p)
}

func (p Password) String() string {
	return string(p)
}
