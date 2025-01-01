"use client";

import { useRef } from "react";
import { updateUserAction } from "./update-user-action";

type UpdateUserFormProps = {
  userId: string;
  userName: string;
  email: string;
};

export function UpdateUserForm({
  userId,
  userName,
  email,
}: UpdateUserFormProps) {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={updateUserAction} className="flex flex-col items-start">
      <input type="hidden" name="user-id" value={userId} />
      <input
        ref={userNameInputRef}
        type="text"
        name="user-name"
        defaultValue={userName}
        placeholder="ユーザー名"
      />
      <input
        ref={emailInputRef}
        type="email"
        name="email"
        defaultValue={email}
        placeholder="メールアドレス"
      />
      <button type="submit">保存</button>
    </form>
  );
}
