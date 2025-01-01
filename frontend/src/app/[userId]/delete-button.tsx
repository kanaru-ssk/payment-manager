"use client";

import { deleteUserAction } from "./delete-user-action";

type DeleteButtonProps = {
  userId: string;
};

export function DeleteButton({ userId }: DeleteButtonProps) {
  return (
    <button type="button" onClick={() => deleteUserAction(userId)}>
      削除
    </button>
  );
}
