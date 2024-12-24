package user

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	UserId    uuid.UUID
	UserName  string
	Email     Email
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewUser(userName string, email Email) User {
	userId := uuid.New()
	createdAt := time.Now()
	updatedAt := time.Now()

	return User{
		UserId:    userId,
		UserName:  userName,
		Email:     email,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}
}
