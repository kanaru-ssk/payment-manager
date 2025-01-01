"use server";

import { emailSchema } from "@/domain/user";
import { updateUser } from "@/infrastructure/persistence/user-repository";
import { z } from "zod";

const signupFormSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string(),
  email: emailSchema,
});

export async function updateUserAction(formData: FormData) {
  const parsed = signupFormSchema.safeParse({
    userId: formData.get("user-id"),
    userName: formData.get("user-name"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    console.log(parsed.error);
    return;
  }

  const user = await updateUser(
    parsed.data.userId,
    parsed.data.userName,
    parsed.data.email
  );
  console.log(user);
}
