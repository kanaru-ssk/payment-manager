"use client";

import { type User } from "@/domain/user/entity";
import { useHydratedValue } from "@/hooks/use-hydrated-value";
import { formatDatetime } from "@/lib/dayjs";
import { toMilliseconds } from "@/lib/timestamp";

export type UserTableProps = {
  user: User;
};

export function UserTable({ user }: UserTableProps) {
  const createdAt = useHydratedValue(formatDatetime, user.createdAt);
  const updatedAt = useHydratedValue(formatDatetime, user.updatedAt);

  return (
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
          <td className="border p-2">{createdAt}</td>
        </tr>
        <tr>
          <th className="border p-2">updatedAt</th>
          <td className="border p-2">{updatedAt}</td>
        </tr>
      </tbody>
    </table>
  );
}
