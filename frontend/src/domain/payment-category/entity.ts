import { z } from "zod";
import {
	type ColorName,
	type ColorTone,
	colorNameSchema,
	colorToneSchema,
} from "./value-object";

export type PaymentCategory = {
	paymentCategoryId: string;
	userId: string;
	paymentCategoryName: string;
	isNeeds: boolean;
	colorName: ColorName;
	colorTone: ColorTone;
	createdAt: Date;
	updatedAt: Date;
};

export const paymentCategorySchema: z.ZodType<PaymentCategory> = z.object({
	paymentCategoryId: z.string().uuid(),
	userId: z.string(),
	paymentCategoryName: z.string(),
	isNeeds: z.boolean(),
	colorName: colorNameSchema,
	colorTone: colorToneSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});
