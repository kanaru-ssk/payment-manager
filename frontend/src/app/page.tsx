import { findUserByUserId } from "@/infrastructure/user/repository";
import { UserTable } from "./user-table";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const user = await findUserByUserId("251f5893-8560-464a-9c3b-542caed0297d");
  if (!user) return <div className="p-5">user not found</div>;

  return (
    <div className="p-5">
      <UserTable user={user} />
    </div>
  );
}
