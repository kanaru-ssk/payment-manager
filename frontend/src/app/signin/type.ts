import { type Auth, emailSchema } from "@/domain/auth";
import type { SuccessOrError } from "@/lib/success-or-error";
import type { typeToFlattenedError } from "zod";
import { z } from "zod";

export const signinFormSchema = z.object({
	email: emailSchema,
});

export type SigninFormData = z.infer<typeof signinFormSchema>;

export type SigninFormState =
	| SuccessOrError<Auth, typeToFlattenedError<SigninFormData>>
	| undefined;
