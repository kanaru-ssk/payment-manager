"use server";

import { signup } from "@/infrastructure/persistence/auth-repository";
import { redirect } from "next/navigation";
import { type SignupFormState, signupFormSchema } from "./type";

export async function signupAction(
	_: SignupFormState,
	formData: FormData,
): Promise<SignupFormState> {
	const parsed = signupFormSchema.safeParse({
		userName: formData.get("userName"),
		email: formData.get("email"),
		newPassword: formData.get("newPassword"),
		confirmNewPassword: formData.get("confirmNewPassword"),
	});
	if (!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten(),
		};
	}

	const response = await signup(
		parsed.data.userName,
		parsed.data.email,
		parsed.data.newPassword,
	);

	if (!response.success) {
		// apiエラーをフォームエラーにマッピング
		// TODO: エラーコードを定数で管理する
		const formErrors: string[] = [];
		if (
			response.errors.code === 9000 ||
			response.errors.code === 9001 ||
			response.errors.code === 2000
		) {
			formErrors.push(response.errors.message);
		}
		const emailErrors: string[] = [];
		if (response.errors.code === 1000) {
			emailErrors.push(response.errors.message);
		}
		const newPasswordErrors: string[] = [];
		if (response.errors.code === 1001) {
			newPasswordErrors.push(response.errors.message);
		}
		return {
			success: false,
			errors: {
				formErrors,
				fieldErrors: {
					userName: [],
					email: emailErrors,
					newPassword: newPasswordErrors,
					confirmNewPassword: [],
				},
			},
		};
	}

	return redirect("/category");
}
