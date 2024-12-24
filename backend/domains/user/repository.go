package user

import "context"

type UserRepository interface {
	FindByUserId(ctx context.Context, userId string) (*User, error)

	Create(ctx context.Context, user *User) (*User, error)
	Update(ctx context.Context, user *User) (*User, error)
	Delete(ctx context.Context, userId string) error
}
