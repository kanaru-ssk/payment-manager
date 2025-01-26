import { env } from "@/env";
import type { Email } from "./value-object";

export const EMAIL_KEY = `${env.PROJECT_ID}_EMAIL`;
export const ID_TOKEN_KEY = `${env.PROJECT_ID}_ID_TOKEN`;
export const REFRESH_TOKEN_KEY = `${env.PROJECT_ID}_REFRESH_TOKEN`;

export type SetEmail = (email: Email) => void;
export type GetEmail = () => Promise<Email | undefined>;
