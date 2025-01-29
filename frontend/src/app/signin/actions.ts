"use server";

import { sendSigninLink } from "@/infrastructure/persistence/auth-operation";
import { setEmail } from "@/infrastructure/persistence/auth-store";
import { type SigninFormState, signinFormSchema } from "./type";

export async function signinAction(
	_: SigninFormState,
	formData: FormData,
): Promise<SigninFormState> {
	const parsed = signinFormSchema.safeParse({
		email: formData.get("email"),
	});
	if (!parsed.success) {
		return {
			success: false,
			errors: parsed.error.flatten(),
		};
	}

	// メールのサインインリンクで戻ってきた時にemailを一緒にbackendに送る必要があるのでcookieに保存
	setEmail(parsed.data.email);

	// サインインメール送信
	const response = await sendSigninLink(parsed.data.email);

	if (!response.success) {
		return {
			success: false,
			errors: {
				formErrors: [response.errors.message],
				fieldErrors: {
					email: [],
				},
			},
		};
	}

	return;
}
