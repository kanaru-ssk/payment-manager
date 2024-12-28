package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/kanaru-ssk/payment-manager/backend/config"
	"github.com/kanaru-ssk/payment-manager/backend/interface/grpcservice"
	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/user/v1"
	"google.golang.org/grpc"
)

func main() {
	ctx := context.Background()
	config := config.New(ctx)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", config.Port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()

	userService := grpcservice.NewUserService()
	pb.RegisterUserServiceServer(s, userService)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
