import { z } from "zod";
import { type Email, emailSchema } from "./value-object";

export type Auth = {
	userId: string;
	userName: string;
	email: Email;
	idToken: string;
	refreshToken: string;
};

export const authSchema: z.ZodType<Auth> = z.object({
	userId: z.string(),
	userName: z.string(),
	email: emailSchema,
	idToken: z.string(),
	refreshToken: z.string(),
});
