package persistence

import (
	"context"
	"fmt"

	"github.com/kanaru-ssk/payment-manager/backend/domain/auth"
	"github.com/kanaru-ssk/payment-manager/backend/domain/emailaddress"
	"google.golang.org/api/identitytoolkit/v3"
)

type operation struct {
	idp *identitytoolkit.Service
}

func NewAuthOperation(
	idp *identitytoolkit.Service,
) auth.Operation {
	return &operation{idp: idp}
}

func (o *operation) SendSignInLink(ctx context.Context, email emailaddress.EmailAddress) error {
	req := &identitytoolkit.Relyingparty{
		Email:       email.String(),
		RequestType: "EMAIL_SIGNIN",
		ContinueUrl: "http://localhost:3000/signin/complete",
	}
	res, err := o.idp.Relyingparty.GetOobConfirmationCode(req).Do()
	fmt.Println("debug: res:", res)

	return err
}

func (o *operation) SignInWithLink(ctx context.Context, email emailaddress.EmailAddress, verificationToken string) (*auth.Auth, error) {
	req := &identitytoolkit.IdentitytoolkitRelyingpartyEmailLinkSigninRequest{
		Email:   email.String(),
		OobCode: verificationToken,
	}
	res, err := o.idp.Relyingparty.EmailLinkSignin(req).Do()
	fmt.Println("debug: res:", res)
	if err != nil {
		return nil, err
	}
	e, err := emailaddress.NewEmailAddress(res.Email)
	if err != nil {
		return nil, err
	}

	return &auth.Auth{
		UserId:       res.LocalId,
		Email:        e,
		IdToken:      res.IdToken,
		RefreshToken: res.RefreshToken,
	}, nil
}
