import { env } from "@/env";
import { AuthService } from "@/infrastructure/proto/auth/v1/auth_pb";
import { PaymentCategoryService } from "@/infrastructure/proto/paymentcategory/v1/paymentcategory_pb";
import { createClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";

const transport = createGrpcTransport({
	baseUrl: env.BACKEND_URL,
});

export const authServiceClient = createClient(AuthService, transport);
export const paymentCategoryServiceClient = createClient(
	PaymentCategoryService,
	transport,
);
