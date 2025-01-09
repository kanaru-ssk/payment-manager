import { findUserByUserId } from "@/infrastructure/persistence/user-repository";
import Link from "next/link";
import { connection } from "next/server";
import { DeleteButton } from "./delete-button";
import { UserTable } from "./user-table";

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
		<main>
			<UserTable user={user} />
			<Link href={`/${user.userId}/update`}>編集</Link>
			<DeleteButton userId={user.userId} />
		</main>
	);
}
