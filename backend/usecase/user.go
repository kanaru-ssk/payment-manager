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

func (u *UserUseCase) FindUserByUserId(ctx context.Context, userId uuid.UUID) (*user.User, error) {
	us, err := u.userRepository.FindUserByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}
	return us, nil
}
