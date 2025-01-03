package grpcservice

import (
	"context"

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
		return nil, err
	}

	mpcs := make([]*pb.PaymentCategory, len(pcs))
	for _, pc := range pcs {
		mpc := &pb.PaymentCategory{
			PaymentCategoryId:   pc.PaymentCategoryId.String(),
			UserId:              pc.UserId,
			PaymentCategoryName: pc.PaymentCategoryName,
			IsNeeds:             pc.IsNeeds,
			ColorCode:           pc.ColorCode.String(),
			CreatedAt:           timestamppb.New(pc.CreatedAt),
			UpdatedAt:           timestamppb.New(pc.UpdatedAt),
		}
		mpcs = append(mpcs, mpc)
	}

	return &pb.FindPaymentCategoriesByUserIdResponse{
		PaymentCategories: mpcs,
	}, nil
}
