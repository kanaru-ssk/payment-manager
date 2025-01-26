import type { Status } from "@/domain/status";
import type { SuccessOrError } from "@/lib/success-or-error";
import type { Auth } from "./entity";
import type { Email } from "./value-object";

/**
 * サインイン用リンク送信
 * @param email - メールアドレス
 */
export type SendSigninLink = (
	email: Email,
) => Promise<SuccessOrError<Status, Status>>;

/**
 * リンクによるサインイン
 * @param email - メールアドレス
 * @param verificationToken - 検証トークン
 * @returns - 認証情報
 */
export type SignInWithLink = (
	email: Email,
	verificationToken: string,
) => Promise<SuccessOrError<Auth, Status>>;
