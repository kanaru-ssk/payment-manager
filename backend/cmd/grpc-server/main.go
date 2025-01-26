package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/kanaru-ssk/payment-manager/backend/config"
	"github.com/kanaru-ssk/payment-manager/backend/infrastructure/appcloudsql"
	"github.com/kanaru-ssk/payment-manager/backend/infrastructure/appidentityplatform"
	"github.com/kanaru-ssk/payment-manager/backend/infrastructure/persistence"
	"github.com/kanaru-ssk/payment-manager/backend/interface/grpcservice"
	authv1 "github.com/kanaru-ssk/payment-manager/backend/interface/proto/auth/v1"
	paymentcategoryv1 "github.com/kanaru-ssk/payment-manager/backend/interface/proto/paymentcategory/v1"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
	"google.golang.org/grpc"
)

func main() {
	ctx := context.Background()
	config, err := config.NewConfig(ctx)
	if err != nil {
		log.Fatalf("main.main config.NewConfig err: %v", err)
	}
	db, err := appcloudsql.NewClient(config.DbUrl)
	if err != nil {
		log.Fatalf("main.main: appcloudsql.NewClient: %v", err)
	}
	idp, err := appidentityplatform.NewClient(ctx)
	if err != nil {
		log.Fatalf("main.main: cloudsql.NewClient: %v", err)
	}
	// DI ---------------------------------------------------------
	authOperation := persistence.NewAuthOperation(idp)
	authUseCase := usecase.NewAuthUseCase(authOperation)
	authService := grpcservice.NewAuthServiceService(authUseCase)
	paymentCategoryRepository := persistence.NewPaymentCategoryRepository(db)
	paymentCategoryUseCase := usecase.NewPaymentCategoryUseCase(paymentCategoryRepository)
	paymentCategoryService := grpcservice.NewPaymentCategoryService(paymentCategoryUseCase)

	// gRPC Service登録 -------------------------------------------
	s := grpc.NewServer()
	authv1.RegisterAuthServiceServer(s, authService)
	paymentcategoryv1.RegisterPaymentCategoryServiceServer(s, paymentCategoryService)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", config.Port))
	if err != nil {
		log.Fatalf("main.main net.Listen err: %v", err)
	}

	if err := s.Serve(lis); err != nil {
		log.Fatalf("main.main s.Serve err: %v", err)
	}
}
