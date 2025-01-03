package user

import (
	"time"
)

type User struct {
	UserId    string
	UserName  string
	Email     Email
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewUser(userId, userName string, email Email) User {
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
