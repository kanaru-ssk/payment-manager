export type Status = {
	code: number;
	message: string;
};

export const STATUS = {
	// common status
	OK: { code: 0, message: "ok" },
	ERR_UNKNOWN: { code: 1, message: "unknown error" },

	// auth domain status
	ERR_AUTH_INVALID_VERIFICATION_TOKEN: {
		code: 1000,
		message: "invalid verification token",
	},

	// email address domain status
	ERR_EMAIL_ADDRESS_INVALID_EMAIL_FORMAT: {
		code: 2000,
		message: "invalid email format",
	},

	// payment category domain status
	ERR_PAYMENT_CATEGORY_INVALID_COLOR_NAME: {
		code: 3000,
		message: "invalid color name",
	},
	ERR_PAYMENT_CATEGORY_INVALID_COLOR_TOME: {
		code: 3001,
		message: "invalid color tone",
	},
} as const satisfies Record<string, Status>;

export function getStatusByCode(code: number | undefined): Status {
	const status = Object.values(STATUS).find((status) => status.code === code);
	if (!status) {
		return STATUS.ERR_UNKNOWN;
	}
	return status;
}
