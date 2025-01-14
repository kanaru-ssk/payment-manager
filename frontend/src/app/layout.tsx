import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { signoutAction } from "./actions";

export const metadata: Metadata = {
	title: "Payment Manager",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ja" className="dark">
			<body className="font-sans p-5 dark:bg-neutral-900 dark:text-neutral-200 max-w-5xl mx-auto">
				<Button type="button" onClick={signoutAction}>
					サインアウト
				</Button>
				{children}
			</body>
		</html>
	);
}
