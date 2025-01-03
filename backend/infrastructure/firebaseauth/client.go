package firebaseauth

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
)

func NewClient(ctx context.Context) (*auth.Client, error) {
	fa, err := firebase.NewApp(ctx, nil)
	if err != nil {
		return nil, err
	}
	c, err := fa.Auth(ctx)
	if err != nil {
		return nil, err
	}
	return c, nil
}
