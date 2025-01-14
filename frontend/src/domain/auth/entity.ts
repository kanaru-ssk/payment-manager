import { z } from "zod";

export type Auth = {
	userId: string;
	idToken: string;
	refreshToken?: string;
};

export const authSchema: z.ZodType<Auth> = z.object({
	userId: z.string(),
	idToken: z.string(),
	refreshToken: z.string().optional(),
});
