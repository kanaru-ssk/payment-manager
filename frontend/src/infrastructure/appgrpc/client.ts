import { env } from "@/env";
import { PaymentCategoryService } from "@/infrastructure/proto/paymentcategory/v1/paymentcategory_pb";
import { createClient } from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";

const transport = createGrpcTransport({
	baseUrl: env.BACKEND_URL,
});

export const paymentCategoryServiceClient = createClient(
	PaymentCategoryService,
	transport,
);
