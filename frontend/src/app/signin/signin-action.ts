"use server";

import { emailSchema } from "@/domain/user";
import { findUserByEmail } from "@/infrastructure/persistence/user-repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signinFormSchema = z.object({
	email: emailSchema,
});

export async function signinAction(formData: FormData) {
	const parsed = signinFormSchema.safeParse({
		email: formData.get("email"),
	});
	if (!parsed.success) {
		console.log(parsed.error);
		return;
	}

	const user = await findUserByEmail(parsed.data.email);
	console.log(user);
	if (user) {
		redirect(`/${user.userId}`);
	}
}
