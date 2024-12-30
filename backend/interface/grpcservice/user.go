package grpcservice

import (
	"context"

	"github.com/google/uuid"
	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/user/v1"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserService struct {
	pb.UnimplementedUserServiceServer
	useCase *usecase.UserUseCase
}

func NewUserService(
	useCase *usecase.UserUseCase,
) *UserService {
	return &UserService{
		useCase: useCase,
	}
}

func (h *UserService) FindUserByUserId(ctx context.Context, req *pb.FindUserByUserIdRequest) (*pb.FindUserByUserIdResponse, error) {
	userId, err := uuid.Parse(req.UserId)
	if err != nil {
		return nil, err
	}
	u, err := h.useCase.FindUserByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}

	return &pb.FindUserByUserIdResponse{User: &pb.User{
		UserId:    u.UserId.String(),
		UserName:  u.UserName,
		Email:     u.Email.String(),
		CreatedAt: timestamppb.New(u.CreatedAt),
		UpdatedAt: timestamppb.New(u.UpdatedAt),
	}}, nil
}
