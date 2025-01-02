import type { User } from "./entity";
import type { Email } from "./value-object";

/**
 * 指定されたuserIdに基づいてユーザーを取得
 * @param userId - ユーザーID
 * @returns ユーザー情報、またはnull
 */
export type FindUserByUserId = (userId: string) => Promise<User | null>;

/**
 * 指定されたemailに基づいてユーザーを取得
 * @param email - メールアドレス
 * @returns ユーザー情報、またはnull
 */
export type FindUserByEmail = (email: Email) => Promise<User | null>;

/**
 * 新しいユーザーを作成
 * @param userName - ユーザー名
 * @param email - メールアドレス
 * @returns 作成されたユーザー情報
 */
export type CreateUser = (
	userName: string,
	email: Email,
) => Promise<User | null>;

/**
 * ユーザー情報を更新
 * @param userName - 新しいユーザー名
 * @param email - メールアドレス
 * @returns 更新されたユーザー情報
 */
export type UpdateUser = (
	userId: string,
	userName: string,
	email: Email,
) => Promise<User | null>;

/**
 * 指定されたuserIdのユーザーを削除
 * @param userId - ユーザーID
 * @returns 削除の成功状態
 */
export type DeleteUser = (userId: string) => Promise<void>;
