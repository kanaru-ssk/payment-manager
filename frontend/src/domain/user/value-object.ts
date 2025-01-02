import { z } from "zod";

export type Email = string;

export const emailSchema: z.ZodType<Email> = z
  .string()
  .regex(/^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/);
