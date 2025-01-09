package firebaseauth

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
)

func NewClient(ctx context.Context, projectId string) (*auth.Client, error) {
	fa, err := firebase.NewApp(ctx, &firebase.Config{ProjectID: projectId})
	if err != nil {
		return nil, err
	}
	c, err := fa.Auth(ctx)
	if err != nil {
		return nil, err
	}
	return c, nil
}
