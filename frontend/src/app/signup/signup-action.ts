"use server";

import { emailSchema } from "@/domain/user";
import { createUser } from "@/infrastructure/persistence/user-repository";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupFormSchema = z.object({
  userName: z.string(),
  email: emailSchema,
});

export async function signupAction(formData: FormData) {
  const parsed = signupFormSchema.safeParse({
    userName: formData.get("user-name"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    console.log(parsed.error);
    return;
  }

  const user = await createUser(parsed.data.userName, parsed.data.email);
  console.log(user);
  if (user) {
    redirect(`/${user.userId}`);
  }
}
