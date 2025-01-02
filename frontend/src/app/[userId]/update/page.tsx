import { findUserByUserId } from "@/infrastructure/persistence/user-repository";
import { connection } from "next/server";
import { UserTable } from "../user-table";
import { UpdateUserForm } from "./update-user-form";

export default async function Page({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	await connection();
	const userId = (await params).userId;
	const user = await findUserByUserId(userId);
	if (!user) return <div className="p-5">user not found</div>;

	return (
		<div>
			<UserTable user={user} />
			<UpdateUserForm
				userId={user.userId}
				userName={user.userName}
				email={user.email}
			/>
		</div>
	);
}
