package grpcservice

import (
	"context"
	"errors"
	"log/slog"

	"github.com/kanaru-ssk/payment-manager/backend/domain/status"
	"github.com/kanaru-ssk/payment-manager/backend/interface/proto/common"
	pb "github.com/kanaru-ssk/payment-manager/backend/interface/proto/paymentcategory/v1"
	"github.com/kanaru-ssk/payment-manager/backend/usecase"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type PaymentCategoryService struct {
	pb.UnimplementedPaymentCategoryServiceServer
	useCase *usecase.PaymentCategoryUseCase
}

func NewPaymentCategoryService(
	useCase *usecase.PaymentCategoryUseCase,
) *PaymentCategoryService {
	return &PaymentCategoryService{
		useCase: useCase,
	}
}

func (s *PaymentCategoryService) FindPaymentCategoriesByUserId(ctx context.Context, req *pb.FindPaymentCategoriesByUserIdRequest) (*pb.FindPaymentCategoriesByUserIdResponse, error) {
	pcs, err := s.useCase.FindPaymentCategoriesByUserId(ctx, req.UserId)
	if err != nil {
		slog.ErrorContext(ctx, "grpcservice.PaymentCategoryService.FindPaymentCategoriesByUserId s.useCase.FindPaymentCategoriesByUserId err:", slog.Any("err", err))
		var es *status.Status
		if errors.As(err, &es) {
			return &pb.FindPaymentCategoriesByUserIdResponse{
				Status: &common.Status{
					Code:    int32(es.Code),
					Message: es.Message,
				}}, nil
		}
		return &pb.FindPaymentCategoriesByUserIdResponse{Status: statusErrUnknown}, nil
	}

	mpcs := make([]*pb.PaymentCategory, len(pcs))
	for i, pc := range pcs {
		mpc := &pb.PaymentCategory{
			PaymentCategoryId:   pc.PaymentCategoryId.String(),
			UserId:              pc.UserId,
			PaymentCategoryName: pc.PaymentCategoryName,
			IsNeeds:             pc.IsNeeds,
			ColorName:           pc.ColorName.String(),
			ColorTone:           int64(pc.ColorTone),
			CreatedAt:           timestamppb.New(pc.CreatedAt),
			UpdatedAt:           timestamppb.New(pc.UpdatedAt),
		}
		mpcs[i] = mpc
	}

	return &pb.FindPaymentCategoriesByUserIdResponse{
		Status:            statusOk,
		PaymentCategories: mpcs,
	}, nil
}
