"use server";

import { createUser } from "@/infrastructure/persistence/user-repository";
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

	const user = await createUser(
		parsed.data.userName,
		parsed.data.email,
		parsed.data.newPassword,
	);

	if (!user) {
		return {
			success: false,
			errors: {
				formErrors: [],
				fieldErrors: {
					userName: [],
					email: [],
					newPassword: [],
					confirmNewPassword: [],
				},
			},
		};
	}

	return {
		success: true,
		data: user,
	};
}
