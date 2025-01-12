import { type User, emailSchema, passwordSchema } from "@/domain/user";
import type { FormState } from "@/lib/form-state";
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

export type SignupFormState = FormState<User, SignupFormData>;
