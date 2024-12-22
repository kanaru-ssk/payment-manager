package user

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	UserID    uuid.UUID
	UserName  string
	Email     Email
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewUser(userID uuid.UUID, userName string, email Email, createdAt, updatedAt time.Time) (User, error) {
	return User{
		UserID:    userID,
		UserName:  userName,
		Email:     email,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}, nil
}
