package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/kanaru-ssk/payment-manager/backend/config"
	"github.com/kanaru-ssk/payment-manager/backend/infrastructure/cloudsql"
	"github.com/kanaru-ssk/payment-manager/backend/infrastructure/persistence"
	"github.com/kanaru-ssk/payment-manager/backend/interface/grpcservice"
	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/user/v1"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
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

	cloudSqlClient, err := cloudsql.NewClient(config.DbUrl)
	if err != nil {
		log.Fatalf("main.main err: %v", err)
	}
	userRepository := persistence.NewUserRepository(cloudSqlClient)
	userUseCase := usecase.NewUserUseCase(userRepository)
	userService := grpcservice.NewUserService(userUseCase)
	pb.RegisterUserServiceServer(s, userService)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
