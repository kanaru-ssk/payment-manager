"use server";

import { signout } from "@/infrastructure/persistence/auth-repository";
import { redirect } from "next/navigation";

export async function signoutAction() {
	await signout();
	return redirect("/signin");
}
