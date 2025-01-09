"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupAction } from "./signup-action";

export function SignupForm() {
	return (
		<form
			action={signupAction}
			className="space-y-8 text-center max-w-lg mx-auto"
		>
			<div className="space-y-4">
				<Input type="text" name="user-name" placeholder="ユーザー名" />
				<Input type="email" name="email" placeholder="メールアドレス" />
			</div>
			<Button type="submit">サインアップ</Button>
		</form>
	);
}
