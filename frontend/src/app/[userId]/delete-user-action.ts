"use server";

import { deleteUser } from "@/infrastructure/persistence/user-repository";

export async function deleteUserAction(userId: string) {
	deleteUser(userId);
}
