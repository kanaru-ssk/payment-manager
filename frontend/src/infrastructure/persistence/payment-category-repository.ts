import {
	type PaymentCategory,
	paymentCategorySchema,
} from "@/domain/payment-category";
import type { FindPaymentCategoriesByUserId } from "@/domain/payment-category/repository";
import { env } from "@/env";
import { paymentcategory } from "@/infrastructure/grpc/proto/paymentcategory/v1/paymentcategory";
import { toMilliseconds } from "@/lib/timestamp";
import { credentials } from "@grpc/grpc-js";

const client = new paymentcategory.v1.PaymentCategoryServiceClient(
	env.BACKEND_URL,
	env.NODE_ENV === "production"
		? credentials.createSsl()
		: credentials.createInsecure(),
);

export const findPaymentCategoriesByUserId: FindPaymentCategoriesByUserId =
	async (userId) => {
		try {
			const request =
				new paymentcategory.v1.FindPaymentCategoriesByUserIdRequest({
					user_id: userId,
				});
			const response =
				await new Promise<paymentcategory.v1.FindPaymentCategoriesByUserIdResponse>(
					(resolve, reject) =>
						client.FindPaymentCategoriesByUserId(request, (err, res) => {
							if (err || !res) {
								reject(new Error("Failed to fetch data from backend server"));
							} else {
								resolve(res);
							}
						}),
				);

			const paymentCategories = response.payment_categories.reduce<
				PaymentCategory[]
			>((acc, paymentCategory) => {
				const parsed = paymentCategorySchema.safeParse({
					paymentCategoryId: paymentCategory.payment_category_id,
					userId: paymentCategory.user_id,
					paymentCategoryName: paymentCategory.payment_category_name,
					isNeeds: paymentCategory.is_needs,
					colorName: paymentCategory.color_name,
					colorTone: paymentCategory.color_tone,
					createdAt: new Date(toMilliseconds(paymentCategory.created_at)),
					updatedAt: new Date(toMilliseconds(paymentCategory.updated_at)),
				});
				if (parsed.success) {
					acc.push(parsed.data);
				}
				return acc;
			}, []);

			return paymentCategories;
		} catch (err) {
			console.log(err);
			return [];
		}
	};
