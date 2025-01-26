import { EMAIL_KEY, type GetEmail, type SetEmail } from "@/domain/auth/store";
import { cookies } from "next/headers";

export const setEmail: SetEmail = async (email) => {
	(await cookies()).set(EMAIL_KEY, email);
};

export const getEmail: GetEmail = async () => {
	return (await cookies()).get(EMAIL_KEY)?.value;
};
