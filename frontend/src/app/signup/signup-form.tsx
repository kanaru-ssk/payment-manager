"use client";

import { signupAction } from "./signup-action";

export function SignupForm() {
	return (
		<form action={signupAction} className="flex flex-col items-start">
			<input type="text" name="user-name" placeholder="ユーザー名" />
			<input type="email" name="email" placeholder="メールアドレス" />
			<button type="submit">サインアップ</button>
		</form>
	);
}
