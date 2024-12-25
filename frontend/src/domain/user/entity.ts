import { z } from "zod";

export type User = {
  userId: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const userSchema: z.ZodType<User> = z.object({
  userId: z.string().uuid(),
  userName: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
