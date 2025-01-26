package appidentityplatform

import (
	"context"

	"google.golang.org/api/identitytoolkit/v3"
)

func NewClient(ctx context.Context) (*identitytoolkit.Service, error) {
	s, err := identitytoolkit.NewService(ctx)
	if err != nil {
		return nil, err
	}
	return s, nil
}
