package auth

import (
	"fmt"

	"github.com/kanaru-ssk/payment-manager/backend/domain/emailaddress"
)

type Auth struct {
	UserId       string
	UserName     string
	Email        emailaddress.EmailAddress
	IdToken      string
	RefreshToken string
}

func NewAuth(userId, userName, emailAddress, idToken, refreshToken string) (*Auth, error) {
	e, err := emailaddress.NewEmailAddress(emailAddress)
	if err != nil {
		return nil, fmt.Errorf("domain.auth.NewAuth: %w", err)
	}
	return &Auth{
		UserId:       userId,
		UserName:     userName,
		Email:        e,
		IdToken:      idToken,
		RefreshToken: refreshToken,
	}, nil
}
