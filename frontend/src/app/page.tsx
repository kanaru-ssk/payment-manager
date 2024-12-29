import { findUserByUserId } from "@/infrastructure/user/repository";
import { UserTable } from "./user-table";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const user = await findUserByUserId("ad1b2ae0-30ac-818f-c44b-d041440369d5");
  if (!user) return <div className="p-5">user not found</div>;

  return (
    <div className="p-5">
      <UserTable user={user} />
    </div>
  );
}
