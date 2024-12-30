package usecase

import (
	"context"

	"github.com/google/uuid"
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
	ui, err := uuid.Parse(userId)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.FindUserByUserId(ctx, ui)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) CreateUser(ctx context.Context, userName, email string) (*user.User, error) {
	e, err := user.NewEmail(email)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.CreateUser(ctx, userName, e)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) UpdateUser(ctx context.Context, userName, email string) (*user.User, error) {
	e, err := user.NewEmail(email)
	if err != nil {
		return nil, err
	}
	us, err := u.userRepository.UpdateUser(ctx, userName, e)
	if err != nil {
		return nil, err
	}
	return us, nil
}

func (u *UserUseCase) DeleteUser(ctx context.Context, userId string) error {
	ui, err := uuid.Parse(userId)
	if err != nil {
		return err
	}
	if err := u.userRepository.DeleteUser(ctx, ui); err != nil {
		return err
	}
	return nil
}
