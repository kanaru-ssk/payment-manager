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
import { signinAction } from "./actions";
import { type SigninFormData, signinFormSchema } from "./type";

export function SigninForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction] = useActionState(signinAction, undefined);
	const form = useForm<SigninFormData>({
		resolver: zodResolver(signinFormSchema),
		defaultValues: {
			email: "",
			password: "",
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="block mx-auto">
					サインイン
				</Button>
			</form>
		</Form>
	);
}
