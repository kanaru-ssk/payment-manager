package grpcservice

import (
	"context"
	"time"

	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/user/v1"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserService struct {
	pb.UnimplementedUserServiceServer
}

func NewUserService() *UserService {
	return &UserService{}
}

func (h *UserService) FindUserByUserId(ctx context.Context, req *pb.FindUserByUserIdRequest) (*pb.FindUserByUserIdResponse, error) {
	user := &pb.User{
		UserId:    req.UserId,
		UserName:  "user",
		Email:     "user@example.com",
		CreatedAt: timestamppb.New(time.Now()),
		UpdatedAt: timestamppb.New(time.Now()),
	}
	return &pb.FindUserByUserIdResponse{User: user}, nil
}
