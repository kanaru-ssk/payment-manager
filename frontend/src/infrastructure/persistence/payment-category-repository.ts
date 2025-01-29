import {
	type PaymentCategory,
	paymentCategorySchema,
} from "@/domain/payment-category";
import type { FindPaymentCategoriesByUserId } from "@/domain/payment-category/repository";
import { paymentCategoryServiceClient } from "@/infrastructure/appgrpc/client";
import { toMilliseconds } from "@/lib/timestamp";

export const findPaymentCategoriesByUserId: FindPaymentCategoriesByUserId =
	async (userId) => {
		try {
			const response =
				await paymentCategoryServiceClient.findPaymentCategoriesByUserId({
					userId,
				});

			const paymentCategories = response.paymentCategories.reduce<
				PaymentCategory[]
			>((acc, paymentCategory) => {
				const parsed = paymentCategorySchema.safeParse({
					paymentCategoryId: paymentCategory.paymentCategoryId,
					userId: paymentCategory.userId,
					paymentCategoryName: paymentCategory.paymentCategoryName,
					isNeeds: paymentCategory.isNeeds,
					colorName: paymentCategory.colorName,
					colorTone: Number(paymentCategory.colorTone),
					createdAt:
						paymentCategory.createdAt &&
						new Date(toMilliseconds(paymentCategory.createdAt)),
					updatedAt:
						paymentCategory.updatedAt &&
						new Date(toMilliseconds(paymentCategory.updatedAt)),
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
