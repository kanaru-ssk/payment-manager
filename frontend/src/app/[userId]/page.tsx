import { findUserByUserId } from "@/infrastructure/persistence/user-repository";
import { UserTable } from "./user-table";
import { connection } from "next/server";
import { DeleteButton } from "./delete-button";
import Link from "next/link";

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
      <Link href={`/${user.userId}/update`}>編集</Link>
      <DeleteButton userId={user.userId} />
    </div>
  );
}
