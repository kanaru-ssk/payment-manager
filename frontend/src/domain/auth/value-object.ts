import { z } from "zod";

export type Email = string;

export const emailSchema: z.ZodType<Email> = z
	.string()
	.nonempty("メールアドレスを入力してください")
	.regex(
		/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
		"メールアドレスの形式が正しくありません",
	);

export type Password = string;

export const passwordSchema: z.ZodType<Password> = z
	.string()
	.nonempty("パスワードを入力してください")
	.min(8, "パスワードは8文字以上で入力してください")
	.regex(/^[!-~]{8,}$/, "パスワードの形式が正しくありません");
