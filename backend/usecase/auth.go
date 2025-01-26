package usecase

import (
	"context"
	"fmt"

	"github.com/kanaru-ssk/payment-manager/backend/domain/auth"
	"github.com/kanaru-ssk/payment-manager/backend/domain/emailaddress"
)

type AuthUseCase struct {
	authOperation auth.Operation
}

func NewAuthUseCase(
	authOperation auth.Operation,
) *AuthUseCase {
	return &AuthUseCase{
		authOperation: authOperation,
	}
}

func (u *AuthUseCase) SendSignInLink(ctx context.Context, email string) error {
	e, err := emailaddress.NewEmailAddress(email)
	if err != nil {
		return fmt.Errorf("usecase.AuthUseCase.SendSignInLink: %w", err)
	}

	return u.authOperation.SendSignInLink(ctx, e)
}

func (u *AuthUseCase) SignInWithLink(ctx context.Context, email, verificationToken string) (*auth.Auth, error) {
	e, err := emailaddress.NewEmailAddress(email)
	if err != nil {
		return nil, fmt.Errorf("usecase.AuthUseCase.SignInWithLink: %w", err)
	}

	return u.authOperation.SignInWithLink(ctx, e, verificationToken)
}
