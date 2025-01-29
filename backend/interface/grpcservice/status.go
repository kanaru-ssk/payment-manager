package grpcservice

import (
	"github.com/kanaru-ssk/payment-manager/backend/domain/status"
	"github.com/kanaru-ssk/payment-manager/backend/interface/proto/common"
)

var statusOk = &common.Status{
	Code:    int32(status.Ok.Code),
	Message: status.Ok.Message,
}

var statusErrUnknown = &common.Status{
	Code:    int32(status.ErrUnknown.Code),
	Message: status.ErrUnknown.Message,
}
