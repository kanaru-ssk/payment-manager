// see: https://nextjs.org/docs/app/building-your-application/authentication

import "server-only";
import { type Auth, authSchema } from "@/domain/auth";
import type {
	GetAuth,
	Signin,
	Signout,
	Signup,
} from "@/domain/auth/repository";
import { authClient } from "@/infrastructure/appidentitytoolkit/client";
import type { identitytoolkit_v3 } from "@googleapis/identitytoolkit";
import type { GaxiosResponse } from "gaxios";
import { cookies } from "next/headers";

export const signup: Signup = async (userName, email, password) => {
	try {
		const response = await new Promise<
			GaxiosResponse<identitytoolkit_v3.Schema$SignupNewUserResponse>
		>((resolve, reject) => {
			authClient.relyingparty.signupNewUser(
				{
					requestBody: {
						displayName: userName,
						email,
						password,
					},
				},
				(err, res) => {
					if (res) {
						resolve(res);
					}
					if (err) {
						reject(err);
					}
					reject(new Error("unknown error"));
				},
			);
		});

		const parsed = authSchema.safeParse({
			userId: response.data.localId,
			userName: response.data.displayName,
			email: response.data.email,
			idToken: response.data.idToken,
			refreshToken: response.data.refreshToken,
		});
		if (!parsed.success) {
			console.log(parsed.error);
			return {
				success: false,
				errors: {
					code: 9001,
					message: "response parse error",
				},
			};
		}

		createSession(parsed.data);

		return {
			success: true,
			data: parsed.data,
		};
	} catch (err) {
		if (err instanceof Error) {
			return {
				success: false,
				errors: {
					code: 2000,
					message: err.message,
				},
			};
		}
	}
	return {
		success: false,
		errors: {
			code: 9000,
			message: "unknown",
		},
	};
};

export const signin: Signin = async (email, password) => {
	try {
		const response = await new Promise<
			GaxiosResponse<identitytoolkit_v3.Schema$SignupNewUserResponse>
		>((resolve, reject) => {
			authClient.relyingparty.verifyPassword(
				{
					requestBody: {
						email,
						password,
					},
				},
				(err, res) => {
					if (res) {
						resolve(res);
					}
					if (err) {
						reject(err);
					}
					reject(new Error("unknown error"));
				},
			);
		});
		console.log(response);

		const parsed = authSchema.safeParse({
			userId: response.data.localId,
			userName: response.data.displayName,
			email: response.data.email,
			idToken: response.data.idToken,
			refreshToken: response.data.refreshToken,
		});
		if (!parsed.success) {
			console.log(parsed.error);
			return {
				success: false,
				errors: {
					code: 9001,
					message: "response parse error",
				},
			};
		}

		createSession(parsed.data);

		return {
			success: true,
			data: parsed.data,
		};
	} catch (err) {
		if (err instanceof Error) {
			return {
				success: false,
				errors: {
					code: 2000,
					message: err.message,
				},
			};
		}
	}
	return {
		success: false,
		errors: {
			code: 9000,
			message: "unknown",
		},
	};
};

export const signout: Signout = async () => {
	await deleteSession();
};

export const getAuth: GetAuth = async () => {
	return await getSession();
};

const USER_ID_KEY = "user_id";
const ID_TOKEN_KEY = "id_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// 共通のCookie設定
const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
	maxAge: 60 * 60, // 1時間
};

// リフレッシュトークン用の設定
const REFRESH_TOKEN_OPTIONS = {
	...COOKIE_OPTIONS,
	maxAge: 60 * 60 * 24 * 30, // 30日間
};

const createSession = async (auth: Auth) => {
	const cookieStore = await cookies();

	cookieStore.set(USER_ID_KEY, auth.userId, COOKIE_OPTIONS);
	cookieStore.set(ID_TOKEN_KEY, auth.idToken, COOKIE_OPTIONS);
	if (auth.refreshToken)
		cookieStore.set(
			REFRESH_TOKEN_KEY,
			auth.refreshToken,
			REFRESH_TOKEN_OPTIONS,
		);
};

export const getSession = async () => {
	const cookieStore = await cookies();

	const userId = cookieStore.get(USER_ID_KEY)?.value;
	const idToken = cookieStore.get(ID_TOKEN_KEY)?.value;
	const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

	if (!userId || !idToken) {
		return null;
	}

	return {
		userId,
		idToken,
		refreshToken,
	};
};

const deleteSession = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(USER_ID_KEY);
	cookieStore.delete(ID_TOKEN_KEY);
	cookieStore.delete(REFRESH_TOKEN_KEY);
};
