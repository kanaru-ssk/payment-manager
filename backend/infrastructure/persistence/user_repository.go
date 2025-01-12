package persistence

import (
	"context"
	_ "embed"
	"time"

	"firebase.google.com/go/v4/auth"
	"github.com/kanaru-ssk/payment-manager/backend/domain/user"
)

type UserRepository struct {
	auth *auth.Client
}

func NewUserRepository(
	auth *auth.Client,
) user.UserRepository {
	return &UserRepository{auth: auth}
}

func (r *UserRepository) FindUserByUserId(ctx context.Context, userId string) (*user.User, error) {
	u, err := r.auth.GetUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UID,
		UserName:  u.DisplayName,
		Email:     user.Email(u.Email),
		CreatedAt: time.UnixMilli(u.UserMetadata.CreationTimestamp),
		UpdatedAt: time.UnixMilli(u.UserMetadata.LastLogInTimestamp),
	}, nil
}

func (r *UserRepository) FindUserByEmail(ctx context.Context, email user.Email) (*user.User, error) {
	u, err := r.auth.GetUserByEmail(ctx, email.String())
	if err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UID,
		UserName:  u.DisplayName,
		Email:     user.Email(u.Email),
		CreatedAt: time.UnixMilli(u.UserMetadata.CreationTimestamp),
		UpdatedAt: time.UnixMilli(u.UserMetadata.LastLogInTimestamp),
	}, nil
}

func (r *UserRepository) CreateUser(ctx context.Context, userName string, email user.Email, password user.Password) (*user.User, error) {
	u, err := r.auth.CreateUser(ctx, (&auth.UserToCreate{}).
		Email(email.String()).
		Password(password.String()).
		DisplayName(userName))

	if err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UID,
		UserName:  u.DisplayName,
		Email:     user.Email(u.Email),
		CreatedAt: time.UnixMilli(u.UserMetadata.CreationTimestamp),
		UpdatedAt: time.UnixMilli(u.UserMetadata.LastLogInTimestamp),
	}, nil
}

func (r *UserRepository) UpdateUser(ctx context.Context, userId string, userName string, email user.Email) (*user.User, error) {
	u, err := r.auth.UpdateUser(ctx, userId, (&auth.UserToUpdate{}).
		DisplayName(userName).
		Email(email.String()))
	if err != nil {
		return nil, err
	}

	return &user.User{
		UserId:    u.UID,
		UserName:  u.DisplayName,
		Email:     user.Email(u.Email),
		CreatedAt: time.UnixMilli(u.UserMetadata.CreationTimestamp),
		UpdatedAt: time.UnixMilli(u.UserMetadata.LastLogInTimestamp),
	}, nil
}

func (r *UserRepository) DeleteUser(ctx context.Context, userId string) error {
	err := r.auth.DeleteUser(ctx, userId)
	if err != nil {
		return err
	}
	return nil
}
