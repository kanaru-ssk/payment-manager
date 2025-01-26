// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.4
// 	protoc        (unknown)
// source: paymentcategory/v1/paymentcategory.proto

package paymentcategoryv1

import (
	common "github.com/kanaru-ssk/payment-manager/backend/interface/proto/common"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type PaymentCategory struct {
	state               protoimpl.MessageState `protogen:"open.v1"`
	PaymentCategoryId   string                 `protobuf:"bytes,1,opt,name=payment_category_id,json=paymentCategoryId,proto3" json:"payment_category_id,omitempty"`
	UserId              string                 `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	PaymentCategoryName string                 `protobuf:"bytes,3,opt,name=payment_category_name,json=paymentCategoryName,proto3" json:"payment_category_name,omitempty"`
	IsNeeds             bool                   `protobuf:"varint,4,opt,name=is_needs,json=isNeeds,proto3" json:"is_needs,omitempty"`
	ColorName           string                 `protobuf:"bytes,5,opt,name=color_name,json=colorName,proto3" json:"color_name,omitempty"`
	ColorTone           int64                  `protobuf:"varint,6,opt,name=color_tone,json=colorTone,proto3" json:"color_tone,omitempty"`
	CreatedAt           *timestamppb.Timestamp `protobuf:"bytes,7,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt           *timestamppb.Timestamp `protobuf:"bytes,8,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	unknownFields       protoimpl.UnknownFields
	sizeCache           protoimpl.SizeCache
}

func (x *PaymentCategory) Reset() {
	*x = PaymentCategory{}
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *PaymentCategory) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PaymentCategory) ProtoMessage() {}

func (x *PaymentCategory) ProtoReflect() protoreflect.Message {
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PaymentCategory.ProtoReflect.Descriptor instead.
func (*PaymentCategory) Descriptor() ([]byte, []int) {
	return file_paymentcategory_v1_paymentcategory_proto_rawDescGZIP(), []int{0}
}

func (x *PaymentCategory) GetPaymentCategoryId() string {
	if x != nil {
		return x.PaymentCategoryId
	}
	return ""
}

func (x *PaymentCategory) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *PaymentCategory) GetPaymentCategoryName() string {
	if x != nil {
		return x.PaymentCategoryName
	}
	return ""
}

func (x *PaymentCategory) GetIsNeeds() bool {
	if x != nil {
		return x.IsNeeds
	}
	return false
}

func (x *PaymentCategory) GetColorName() string {
	if x != nil {
		return x.ColorName
	}
	return ""
}

func (x *PaymentCategory) GetColorTone() int64 {
	if x != nil {
		return x.ColorTone
	}
	return 0
}

func (x *PaymentCategory) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *PaymentCategory) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

type FindPaymentCategoriesByUserIdRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	UserId        string                 `protobuf:"bytes,1,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FindPaymentCategoriesByUserIdRequest) Reset() {
	*x = FindPaymentCategoriesByUserIdRequest{}
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FindPaymentCategoriesByUserIdRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FindPaymentCategoriesByUserIdRequest) ProtoMessage() {}

func (x *FindPaymentCategoriesByUserIdRequest) ProtoReflect() protoreflect.Message {
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FindPaymentCategoriesByUserIdRequest.ProtoReflect.Descriptor instead.
func (*FindPaymentCategoriesByUserIdRequest) Descriptor() ([]byte, []int) {
	return file_paymentcategory_v1_paymentcategory_proto_rawDescGZIP(), []int{1}
}

func (x *FindPaymentCategoriesByUserIdRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

type FindPaymentCategoriesByUserIdResponse struct {
	state             protoimpl.MessageState `protogen:"open.v1"`
	Status            *common.Status         `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
	PaymentCategories []*PaymentCategory     `protobuf:"bytes,2,rep,name=payment_categories,json=paymentCategories,proto3" json:"payment_categories,omitempty"`
	unknownFields     protoimpl.UnknownFields
	sizeCache         protoimpl.SizeCache
}

func (x *FindPaymentCategoriesByUserIdResponse) Reset() {
	*x = FindPaymentCategoriesByUserIdResponse{}
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FindPaymentCategoriesByUserIdResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FindPaymentCategoriesByUserIdResponse) ProtoMessage() {}

func (x *FindPaymentCategoriesByUserIdResponse) ProtoReflect() protoreflect.Message {
	mi := &file_paymentcategory_v1_paymentcategory_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FindPaymentCategoriesByUserIdResponse.ProtoReflect.Descriptor instead.
func (*FindPaymentCategoriesByUserIdResponse) Descriptor() ([]byte, []int) {
	return file_paymentcategory_v1_paymentcategory_proto_rawDescGZIP(), []int{2}
}

func (x *FindPaymentCategoriesByUserIdResponse) GetStatus() *common.Status {
	if x != nil {
		return x.Status
	}
	return nil
}

func (x *FindPaymentCategoriesByUserIdResponse) GetPaymentCategories() []*PaymentCategory {
	if x != nil {
		return x.PaymentCategories
	}
	return nil
}

var File_paymentcategory_v1_paymentcategory_proto protoreflect.FileDescriptor

var file_paymentcategory_v1_paymentcategory_proto_rawDesc = string([]byte{
	0x0a, 0x28, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72,
	0x79, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65,
	0x67, 0x6f, 0x72, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x12, 0x70, 0x61, 0x79, 0x6d,
	0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x1a, 0x1f,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f,
	0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a,
	0x13, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2f, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0xdd, 0x02, 0x0a, 0x0f, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74,
	0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x12, 0x2e, 0x0a, 0x13, 0x70, 0x61, 0x79, 0x6d,
	0x65, 0x6e, 0x74, 0x5f, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x5f, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x11, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61,
	0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x49, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72,
	0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49,
	0x64, 0x12, 0x32, 0x0a, 0x15, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x5f, 0x63, 0x61, 0x74,
	0x65, 0x67, 0x6f, 0x72, 0x79, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x13, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72,
	0x79, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x19, 0x0a, 0x08, 0x69, 0x73, 0x5f, 0x6e, 0x65, 0x65, 0x64,
	0x73, 0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x69, 0x73, 0x4e, 0x65, 0x65, 0x64, 0x73,
	0x12, 0x1d, 0x0a, 0x0a, 0x63, 0x6f, 0x6c, 0x6f, 0x72, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x63, 0x6f, 0x6c, 0x6f, 0x72, 0x4e, 0x61, 0x6d, 0x65, 0x12,
	0x1d, 0x0a, 0x0a, 0x63, 0x6f, 0x6c, 0x6f, 0x72, 0x5f, 0x74, 0x6f, 0x6e, 0x65, 0x18, 0x06, 0x20,
	0x01, 0x28, 0x03, 0x52, 0x09, 0x63, 0x6f, 0x6c, 0x6f, 0x72, 0x54, 0x6f, 0x6e, 0x65, 0x12, 0x39,
	0x0a, 0x0a, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x07, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09,
	0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x75, 0x70, 0x64,
	0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74,
	0x65, 0x64, 0x41, 0x74, 0x22, 0x3f, 0x0a, 0x24, 0x46, 0x69, 0x6e, 0x64, 0x50, 0x61, 0x79, 0x6d,
	0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x42, 0x79, 0x55,
	0x73, 0x65, 0x72, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07,
	0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75,
	0x73, 0x65, 0x72, 0x49, 0x64, 0x22, 0xa3, 0x01, 0x0a, 0x25, 0x46, 0x69, 0x6e, 0x64, 0x50, 0x61,
	0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x42,
	0x79, 0x55, 0x73, 0x65, 0x72, 0x49, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x26, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x0e, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52,
	0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x52, 0x0a, 0x12, 0x70, 0x61, 0x79, 0x6d, 0x65,
	0x6e, 0x74, 0x5f, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x18, 0x02, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x23, 0x2e, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74,
	0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74,
	0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x52, 0x11, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e,
	0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x32, 0xaf, 0x01, 0x0a, 0x16,
	0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x94, 0x01, 0x0a, 0x1d, 0x46, 0x69, 0x6e, 0x64, 0x50,
	0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73,
	0x42, 0x79, 0x55, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x38, 0x2e, 0x70, 0x61, 0x79, 0x6d, 0x65,
	0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x46, 0x69,
	0x6e, 0x64, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72,
	0x69, 0x65, 0x73, 0x42, 0x79, 0x55, 0x73, 0x65, 0x72, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x39, 0x2e, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65,
	0x67, 0x6f, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x46, 0x69, 0x6e, 0x64, 0x50, 0x61, 0x79, 0x6d,
	0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x69, 0x65, 0x73, 0x42, 0x79, 0x55,
	0x73, 0x65, 0x72, 0x49, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0xfb, 0x01,
	0x0a, 0x16, 0x63, 0x6f, 0x6d, 0x2e, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74,
	0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x76, 0x31, 0x42, 0x14, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e,
	0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x62, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6b, 0x61, 0x6e,
	0x61, 0x72, 0x75, 0x2d, 0x73, 0x73, 0x6b, 0x2f, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x2d,
	0x6d, 0x61, 0x6e, 0x61, 0x67, 0x65, 0x72, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f,
	0x69, 0x6e, 0x74, 0x65, 0x72, 0x66, 0x61, 0x63, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f,
	0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x2f,
	0x76, 0x31, 0x3b, 0x70, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f,
	0x72, 0x79, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x50, 0x58, 0x58, 0xaa, 0x02, 0x12, 0x50, 0x61, 0x79,
	0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x56, 0x31, 0xca,
	0x02, 0x12, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72,
	0x79, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x1e, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63, 0x61,
	0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x13, 0x50, 0x61, 0x79, 0x6d, 0x65, 0x6e, 0x74, 0x63,
	0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
})

var (
	file_paymentcategory_v1_paymentcategory_proto_rawDescOnce sync.Once
	file_paymentcategory_v1_paymentcategory_proto_rawDescData []byte
)

func file_paymentcategory_v1_paymentcategory_proto_rawDescGZIP() []byte {
	file_paymentcategory_v1_paymentcategory_proto_rawDescOnce.Do(func() {
		file_paymentcategory_v1_paymentcategory_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_paymentcategory_v1_paymentcategory_proto_rawDesc), len(file_paymentcategory_v1_paymentcategory_proto_rawDesc)))
	})
	return file_paymentcategory_v1_paymentcategory_proto_rawDescData
}

var file_paymentcategory_v1_paymentcategory_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_paymentcategory_v1_paymentcategory_proto_goTypes = []any{
	(*PaymentCategory)(nil),                       // 0: paymentcategory.v1.PaymentCategory
	(*FindPaymentCategoriesByUserIdRequest)(nil),  // 1: paymentcategory.v1.FindPaymentCategoriesByUserIdRequest
	(*FindPaymentCategoriesByUserIdResponse)(nil), // 2: paymentcategory.v1.FindPaymentCategoriesByUserIdResponse
	(*timestamppb.Timestamp)(nil),                 // 3: google.protobuf.Timestamp
	(*common.Status)(nil),                         // 4: common.Status
}
var file_paymentcategory_v1_paymentcategory_proto_depIdxs = []int32{
	3, // 0: paymentcategory.v1.PaymentCategory.created_at:type_name -> google.protobuf.Timestamp
	3, // 1: paymentcategory.v1.PaymentCategory.updated_at:type_name -> google.protobuf.Timestamp
	4, // 2: paymentcategory.v1.FindPaymentCategoriesByUserIdResponse.status:type_name -> common.Status
	0, // 3: paymentcategory.v1.FindPaymentCategoriesByUserIdResponse.payment_categories:type_name -> paymentcategory.v1.PaymentCategory
	1, // 4: paymentcategory.v1.PaymentCategoryService.FindPaymentCategoriesByUserId:input_type -> paymentcategory.v1.FindPaymentCategoriesByUserIdRequest
	2, // 5: paymentcategory.v1.PaymentCategoryService.FindPaymentCategoriesByUserId:output_type -> paymentcategory.v1.FindPaymentCategoriesByUserIdResponse
	5, // [5:6] is the sub-list for method output_type
	4, // [4:5] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_paymentcategory_v1_paymentcategory_proto_init() }
func file_paymentcategory_v1_paymentcategory_proto_init() {
	if File_paymentcategory_v1_paymentcategory_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_paymentcategory_v1_paymentcategory_proto_rawDesc), len(file_paymentcategory_v1_paymentcategory_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_paymentcategory_v1_paymentcategory_proto_goTypes,
		DependencyIndexes: file_paymentcategory_v1_paymentcategory_proto_depIdxs,
		MessageInfos:      file_paymentcategory_v1_paymentcategory_proto_msgTypes,
	}.Build()
	File_paymentcategory_v1_paymentcategory_proto = out.File
	file_paymentcategory_v1_paymentcategory_proto_goTypes = nil
	file_paymentcategory_v1_paymentcategory_proto_depIdxs = nil
}
