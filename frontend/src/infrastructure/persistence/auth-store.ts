import {
	type DeleteAuth,
	EMAIL_KEY,
	type GetAuth,
	type GetEmail,
	ID_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	type SetAuth,
	type SetEmail,
	USER_ID_KEY,
	USER_NAME_KEY,
} from "@/domain/auth/store";
import { cookies } from "next/headers";

export const setEmail: SetEmail = async (email) => {
	const cookieStore = await cookies();
	cookieStore.set(EMAIL_KEY, email);
};

export const getEmail: GetEmail = async () => {
	const cookieStore = await cookies();
	return cookieStore.get(EMAIL_KEY)?.value;
};

// TODO: 認証情報は暗号化して保存する
export const setAuth: SetAuth = async (auth) => {
	const cookieStore = await cookies();
	cookieStore.set(USER_ID_KEY, auth.userId);
	cookieStore.set(USER_NAME_KEY, auth.userName);
	cookieStore.set(EMAIL_KEY, auth.email);
	cookieStore.set(ID_TOKEN_KEY, auth.idToken);
	cookieStore.set(REFRESH_TOKEN_KEY, auth.refreshToken);
};

export const getAuth: GetAuth = async () => {
	const cookieStore = await cookies();
	const userId = cookieStore.get(USER_ID_KEY)?.value;
	const userName = cookieStore.get(USER_NAME_KEY)?.value;
	const email = cookieStore.get(EMAIL_KEY)?.value;
	const idToken = cookieStore.get(ID_TOKEN_KEY)?.value;
	const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

	// userNameは空文字列を許容
	if (!userId || userName === undefined || !email || !idToken || !refreshToken)
		return;

	return { userId, userName, email, idToken, refreshToken };
};

export const deleteAuth: DeleteAuth = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(USER_ID_KEY);
	cookieStore.delete(USER_NAME_KEY);
	cookieStore.delete(EMAIL_KEY);
	cookieStore.delete(ID_TOKEN_KEY);
	cookieStore.delete(REFRESH_TOKEN_KEY);
};
