package user

import "context"

type UserRepository interface {
	FindByUserID(ctx context.Context, userID string) (*User, error)

	Create(ctx context.Context, user *User) (*User, error)
	Update(ctx context.Context, user *User) (*User, error)
	Delete(ctx context.Context, userID string) error
}
