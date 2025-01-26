// see: https://nextjs.org/docs/app/building-your-application/authentication

import "server-only";
import type { SendSigninLink } from "@/domain/auth";
import { STATUS, getStatusByCode } from "@/domain/status";
import { authServiceClient } from "@/infrastructure/appgrpc/client";

export const sendSigninLink: SendSigninLink = async (email) => {
	try {
		const response = await authServiceClient.sendSignInLink({ email });
		const status = getStatusByCode(response.status?.code);

		// status ok
		if (status.code === 0) {
			return {
				success: true,
				data: status,
			};
		}

		// status error
		return {
			success: false,
			errors: status,
		};
	} catch (err) {
		// unknown error
		return {
			success: false,
			errors: STATUS.ERR_UNKNOWN,
		};
	}
};
