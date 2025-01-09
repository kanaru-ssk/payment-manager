"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signinAction } from "./signin-action";

export function SigninForm() {
	return (
		<form
			action={signinAction}
			className="space-y-8 text-center max-w-lg mx-auto"
		>
			<Input type="email" name="email" placeholder="メールアドレス" />
			<Button type="submit">サインイン</Button>
		</form>
	);
}
