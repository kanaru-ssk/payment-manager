import { type Auth, emailSchema, passwordSchema } from "@/domain/auth";
import type { SuccessOrError } from "@/lib/success-or-error";
import type { typeToFlattenedError } from "zod";

import { z } from "zod";
export const signupFormSchema = z
	.object({
		userName: z.string().nonempty("ユーザー名を入力してください"),
		email: emailSchema,
		newPassword: passwordSchema,
		confirmNewPassword: passwordSchema,
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "パスワードが一致しません",
		path: ["confirmNewPassword"],
	});

export type SignupFormData = z.infer<typeof signupFormSchema>;

export type SignupFormState =
	| SuccessOrError<Auth, typeToFlattenedError<SignupFormData>>
	| undefined;
