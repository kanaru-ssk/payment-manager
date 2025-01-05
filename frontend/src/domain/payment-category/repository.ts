import type { PaymentCategory } from "./entity";

/**
 * 指定されたuserIdに基づいて支出カテゴリーを取得
 * @param userId - ユーザーID
 * @returns 支出カテゴリーの配列
 */
export type FindPaymentCategoriesByUserId = (
	userId: string,
) => Promise<PaymentCategory[]>;
