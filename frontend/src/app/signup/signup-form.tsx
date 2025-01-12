"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldErrors } from "@/hooks/use-field-errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { signupAction } from "./signup-action";
import { type SignupFormData, signupFormSchema } from "./type";

export function SignupForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction] = useActionState(signupAction, undefined);
	const form = useForm<SignupFormData>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			userName: "",
			email: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});
	useFieldErrors(state, form.setError);

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={form.handleSubmit(() =>
					startTransition(() =>
						formAction(new FormData(formRef.current || undefined)),
					),
				)}
				action={formAction}
				className="space-y-8"
			>
				{state && !state.success && state.errors.formErrors.length !== 0 && (
					<div className="border rounded border-red-800 p-4">
						{state.errors.formErrors.map((error) => (
							<FormMessage key={error}>{error}</FormMessage>
						))}
					</div>
				)}

				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ユーザー名</FormLabel>
							<FormControl>
								<Input type="text" placeholder="ユーザー名" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="email@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>新しいパスワード</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormDescription>
								半角英数字記号8文字以上で入力してください。
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>新しいパスワード(確認用)</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="block mx-auto">
					サインアップ
				</Button>
			</form>
		</Form>
	);
}
