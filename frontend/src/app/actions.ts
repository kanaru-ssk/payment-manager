"use server";

import { deleteAuth } from "@/infrastructure/persistence/auth-store";
import { redirect } from "next/navigation";

export async function signoutAction() {
	await deleteAuth();
	return redirect("/signin");
}
