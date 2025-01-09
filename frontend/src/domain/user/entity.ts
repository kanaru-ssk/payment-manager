import { z } from "zod";
import { type Email, emailSchema } from "./value-object";

export type User = {
	userId: string;
	userName: string;
	email: Email;
	createdAt: Date;
	updatedAt: Date;
};

export const userSchema: z.ZodType<User> = z.object({
	userId: z.string(),
	userName: z.string(),
	email: emailSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});
