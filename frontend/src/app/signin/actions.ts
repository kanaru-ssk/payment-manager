"use server";

import { signin } from "@/infrastructure/persistence/auth-repository";
import { redirect } from "next/navigation";
import { type SigninFormState, signinFormSchema } from "./type";

export async function signinAction(
	_: SigninFormState,
	formData: FormData,
): Promise<SigninFormState> {
	const parsed = signinFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});
	if (!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten(),
		};
	}

	const response = await signin(parsed.data.email, parsed.data.password);

	if (!response.success) {
		// apiエラーをフォームエラーにマッピング
		// TODO: エラーコードを定数で管理する
		const formErrors: string[] = [];
		if (response.errors.code === 9000 || response.errors.code === 9001) {
			formErrors.push(response.errors.message);
		}

		return {
			success: false,
			errors: {
				formErrors,
				fieldErrors: {
					email: [],
					password: [],
				},
			},
		};
	}

	return redirect("/category");
}
