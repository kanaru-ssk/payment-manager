import type { AppError } from "@/lib/app-error";
import type { SuccessOrError } from "@/lib/success-or-error";
import type { Auth } from "./entity";
import type { Email, Password } from "./value-object";

/**
 * サインアップ
 * @param userName - ユーザー名
 * @param email - メールアドレス
 * @param password - パスワード
 * @returns 認証情報
 */
export type Signup = (
	userName: string,
	email: Email,
	password: Password,
) => Promise<SuccessOrError<Auth, AppError>>;

/**
 * サインイン
 * @param userName - ユーザー名
 * @param email - メールアドレス
 * @param password - パスワード
 * @returns 認証情報
 */
export type Signin = (
	email: Email,
	password: Password,
) => Promise<SuccessOrError<Auth, AppError>>;

/**
 * サインアウト
 * @returns - 認証情報
 */
export type Signout = () => Promise<void>;

export type GetAuth = () => Promise<Auth | null>;
