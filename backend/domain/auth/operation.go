package auth

import (
	"context"

	"github.com/kanaru-ssk/payment-manager/backend/domain/emailaddress"
)

type Operation interface {
	// SendSignInLink: サインイン用リンク送信
	// email: メールアドレス
	SendSignInLink(ctx context.Context, email emailaddress.EmailAddress) error

	// SignInWithLink: リンクによるサインイン
	// email: メールアドレス
	// verificationToken: 検証トークン
	// return: 認証情報
	SignInWithLink(ctx context.Context, email emailaddress.EmailAddress, verificationToken string) (*Auth, error)
}
