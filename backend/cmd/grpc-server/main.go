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
	db, err := cloudsql.NewClient(config.DbUrl)
	if err != nil {
		log.Fatalf("main.main cloudsql.NewClient err: %v", err)
	}
	// DI ---------------------------------------------------------
	paymentCategoryRepository := persistence.NewPaymentCategoryRepository(db)
	paymentCategoryUseCase := usecase.NewPaymentCategoryUseCase(paymentCategoryRepository)
	paymentCategoryService := grpcservice.NewPaymentCategoryService(paymentCategoryUseCase)

	// gRPC Service登録 -------------------------------------------
	s := grpc.NewServer()
	paymentcategoryv1.RegisterPaymentCategoryServiceServer(s, paymentCategoryService)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", config.Port))
	if err != nil {
		log.Fatalf("main.main net.Listen err: %v", err)
	}

	if err := s.Serve(lis); err != nil {
		log.Fatalf("main.main s.Serve err: %v", err)
	}
}
