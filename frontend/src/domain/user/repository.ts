import { type User } from "./entity";

/**
 * 指定されたuserIdに基づいてユーザーを取得
 * @param userId - ユーザーID
 * @returns ユーザー情報、またはnull
 */
export type FindByUserId = (userId: string) => Promise<User | null>;

/**
 * 新しいユーザーを作成
 * @param user - ユーザー情報
 * @returns 作成されたユーザー情報
 */
export type CreateUser = (user: User) => Promise<User | null>;

/**
 * ユーザー情報を更新
 * @param user - 更新するユーザー情報
 * @returns 更新されたユーザー情報
 */
export type UpdateUser = (user: User) => Promise<User | null>;

/**
 * 指定されたuserIdのユーザーを削除
 * @param userId - ユーザーID
 * @returns 削除の成功状態
 */
export type DeleteUser = (userId: string) => Promise<void>;
