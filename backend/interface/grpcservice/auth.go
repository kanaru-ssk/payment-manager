package grpcservice

import (
	"context"
	"errors"
	"log/slog"

	"github.com/kanaru-ssk/payment-manager/backend/domain/status"
	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/auth/v1"
	"github.com/kanaru-ssk/payment-manager/backend/interface/proto/common"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
)

type AuthService struct {
	pb.UnimplementedAuthServiceServer
	useCase *usecase.AuthUseCase
}

func NewAuthServiceService(
	useCase *usecase.AuthUseCase,
) *AuthService {
	return &AuthService{
		useCase: useCase,
	}
}

func (s *AuthService) SendSignInLink(ctx context.Context, req *pb.SendSignInLinkRequest) (*pb.SendSignInLinkResponse, error) {
	err := s.useCase.SendSignInLink(ctx, req.Email)
	if err != nil {
		slog.ErrorContext(ctx, "grpcservice.AuthService.SendSignInLink s.useCase.SendSignInLink err:", slog.Any("err", err))
		var es *status.Status
		if errors.As(err, &es) {
			return &pb.SendSignInLinkResponse{
				Status: &common.Status{
					Code:    int32(es.Code),
					Message: es.Message,
				}}, nil
		}
		return &pb.SendSignInLinkResponse{Status: statusErrUnknown}, nil
	}

	return &pb.SendSignInLinkResponse{Status: statusOk}, nil
}

func (s *AuthService) SignInWithLink(ctx context.Context, req *pb.SignInWithLinkRequest) (*pb.SignInWithLinkResponse, error) {
	a, err := s.useCase.SignInWithLink(ctx, req.Email, req.VerificationToken)
	if err != nil {
		slog.ErrorContext(ctx, "grpcservice.AuthService.SignInWithLink s.useCase.SignInWithLink err:", slog.Any("err", err))
		var es *status.Status
		if errors.As(err, &es) {
			return &pb.SignInWithLinkResponse{Status: &common.Status{
				Code:    int32(es.Code),
				Message: es.Message,
			}}, nil
		}
		return &pb.SignInWithLinkResponse{Status: statusErrUnknown}, nil
	}

	return &pb.SignInWithLinkResponse{Status: statusOk, Auth: &pb.Auth{
		UserId:       a.UserId,
		UserName:     a.UserName,
		Email:        a.Email.String(),
		IdToken:      a.IdToken,
		RefreshToken: a.RefreshToken,
	}}, nil
}
