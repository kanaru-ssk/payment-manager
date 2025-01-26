import type { Auth } from "./entity";
import type { Email } from "./value-object";

export const USER_ID_KEY = "PAYMENT_MANAGER_USER_ID";
export const USER_NAME_KEY = "PAYMENT_MANAGER_USER_NAME";
export const EMAIL_KEY = "PAYMENT_MANAGER_EMAIL";
export const ID_TOKEN_KEY = "PAYMENT_MANAGER_ID_TOKEN";
export const REFRESH_TOKEN_KEY = "PAYMENT_MANAGER_REFRESH_TOKEN";

export type SetEmail = (email: Email) => void;
export type GetEmail = () => Promise<Email | undefined>;

export type SetAuth = (auth: Auth) => void;
export type GetAuth = () => Promise<Auth | undefined>;
