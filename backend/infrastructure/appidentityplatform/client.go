package appidentityplatform

import (
	"context"

	"google.golang.org/api/identitytoolkit/v3"
	"google.golang.org/api/option"
)

func NewClient(ctx context.Context, projectId string) (*identitytoolkit.Service, error) {
	s, err := identitytoolkit.NewService(ctx, option.WithQuotaProject(projectId))
	if err != nil {
		return nil, err
	}
	return s, nil
}
