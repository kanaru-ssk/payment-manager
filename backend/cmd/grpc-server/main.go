package main

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"os"

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

	// Setup logging
	setupLogging()

	config, err := config.NewConfig(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "main.main config.NewConfig err:", slog.Any("err", err))
	}

	db, err := appcloudsql.NewClient(config.DbUrl)
	if err != nil {
		slog.ErrorContext(ctx, "main.main appcloudsql.NewClient err:", slog.Any("err", err))
	}
	idp, err := appidentityplatform.NewClient(ctx)
	if err != nil {
		slog.ErrorContext(ctx, "main.main appidentityplatform.NewClient err:", slog.Any("err", err))
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
		slog.ErrorContext(ctx, "main.main net.Listen err:", slog.Any("err", err))
	}

	if err := s.Serve(lis); err != nil {
		slog.ErrorContext(ctx, "main.main s.Serve err:", slog.Any("err", err))
	}
}

func setupLogging() {
	// Use json as our base logging format.
	jsonHandler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{ReplaceAttr: replacer})
	// Add span context attributes when Context is passed to logging calls.
	instrumentedHandler := handlerWithSpanContext(jsonHandler)
	// Set this handler as the global slog handler.
	slog.SetDefault(slog.New(instrumentedHandler))
}

func handlerWithSpanContext(handler slog.Handler) *spanContextLogHandler {
	return &spanContextLogHandler{Handler: handler}
}

// spanContextLogHandler is a slog.Handler which adds attributes from the
// span context.
type spanContextLogHandler struct {
	slog.Handler
}

func replacer(groups []string, a slog.Attr) slog.Attr {
	// Rename attribute keys to match Cloud Logging structured log format
	switch a.Key {
	case slog.LevelKey:
		a.Key = "severity"
		// Map slog.Level string values to Cloud Logging LogSeverity
		// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
		if level := a.Value.Any().(slog.Level); level == slog.LevelWarn {
			a.Value = slog.StringValue("WARNING")
		}
	case slog.TimeKey:
		a.Key = "timestamp"
	case slog.MessageKey:
		a.Key = "message"
	}
	return a
}
