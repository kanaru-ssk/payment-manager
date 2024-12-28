import { findUserByUserId } from "@/infrastructure/user/repository";

export default async function Home() {
  const user = await findUserByUserId("ad1b2ae0-30ac-818f-c44b-d041440369d5");
  if (!user) return <div className="p-5">user not found</div>;

  return (
    <div className="p-5">
      <table className="border text-left">
        <tbody>
          <tr>
            <th className="border p-2">userId</th>
            <td className="border p-2">{user.userId}</td>
          </tr>
          <tr>
            <th className="border p-2">userName</th>
            <td className="border p-2">{user.userName}</td>
          </tr>
          <tr>
            <th className="border p-2">email</th>
            <td className="border p-2">{user.email}</td>
          </tr>
          <tr>
            <th className="border p-2">createdAt</th>
            <td className="border p-2">{user.createdAt.toLocaleString()}</td>
          </tr>
          <tr>
            <th className="border p-2">updatedAt</th>
            <td className="border p-2">{user.updatedAt.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
