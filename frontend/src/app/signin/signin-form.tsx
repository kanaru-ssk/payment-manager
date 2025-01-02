"use client";

import { signinAction } from "./signin-action";

export function SigninForm() {
	return (
		<form action={signinAction} className="flex flex-col items-start">
			<input type="email" name="email" placeholder="メールアドレス" />
			<button type="submit">サインイン</button>
		</form>
	);
}
