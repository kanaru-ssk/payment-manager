package usecase

import (
	"context"

	"github.com/kanaru-ssk/payment-manager/backend/domain/user"
)

type UserUseCase struct {
	userRepository user.UserRepository
}

func NewUserUseCase(
	userRepository user.UserRepository,
) *UserUseCase {
	return &UserUseCase{
		userRepository: userRepository,
	}
}

func (u *UserUseCase) FindUserByUserId(ctx context.Context, userId string) (*user.User, error) {
	us, err := u.userRepository.FindUserByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) FindUserByEmail(ctx context.Context, email string) (*user.User, error) {
	e, err := user.NewEmail(email)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.FindUserByEmail(ctx, e)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) CreateUser(ctx context.Context, userName, email, password string) (*user.User, error) {
	e, err := user.NewEmail(email)
	if err != nil {
		return nil, err
	}
	p, err := user.NewPassword(password)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.CreateUser(ctx, userName, e, p)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) UpdateUser(ctx context.Context, userId, userName, email string) (*user.User, error) {
	e, err := user.NewEmail(email)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.UpdateUser(ctx, userId, userName, e)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) DeleteUser(ctx context.Context, userId string) error {
	if err := u.userRepository.DeleteUser(ctx, userId); err != nil {
		return err
	}
	return nil
}
