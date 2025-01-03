package grpcservice

import (
	"context"

	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/user/v1"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
	"google.golang.org/protobuf/types/known/emptypb"
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

func (s *UserService) FindUserByUserId(ctx context.Context, req *pb.FindUserByUserIdRequest) (*pb.FindUserByUserIdResponse, error) {
	u, err := s.useCase.FindUserByUserId(ctx, req.UserId)
	if err != nil {
		return nil, err
	}

	return &pb.FindUserByUserIdResponse{User: &pb.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email.String(),
		CreatedAt: timestamppb.New(u.CreatedAt),
		UpdatedAt: timestamppb.New(u.UpdatedAt),
	}}, nil
}

func (s *UserService) FindUserByEmail(ctx context.Context, req *pb.FindUserByEmailRequest) (*pb.FindUserByEmailResponse, error) {
	u, err := s.useCase.FindUserByEmail(ctx, req.Email)
	if err != nil {
		return nil, err
	}

	return &pb.FindUserByEmailResponse{User: &pb.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email.String(),
		CreatedAt: timestamppb.New(u.CreatedAt),
		UpdatedAt: timestamppb.New(u.UpdatedAt),
	}}, nil
}

func (s *UserService) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
	u, err := s.useCase.CreateUser(ctx, req.UserName, req.Email)
	if err != nil {
		return nil, err
	}
	return &pb.CreateUserResponse{User: &pb.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email.String(),
		CreatedAt: timestamppb.New(u.CreatedAt),
		UpdatedAt: timestamppb.New(u.UpdatedAt),
	}}, nil
}

func (s *UserService) UpdateUser(ctx context.Context, req *pb.UpdateUserRequest) (*pb.UpdateUserResponse, error) {
	u, err := s.useCase.UpdateUser(ctx, req.UserId, req.UserName, req.Email)
	if err != nil {
		return nil, err
	}
	return &pb.UpdateUserResponse{User: &pb.User{
		UserId:    u.UserId,
		UserName:  u.UserName,
		Email:     u.Email.String(),
		CreatedAt: timestamppb.New(u.CreatedAt),
		UpdatedAt: timestamppb.New(u.UpdatedAt),
	}}, nil
}

func (s *UserService) DeleteUser(ctx context.Context, req *pb.DeleteUserRequest) (*emptypb.Empty, error) {
	if err := s.useCase.DeleteUser(ctx, req.UserId); err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}
