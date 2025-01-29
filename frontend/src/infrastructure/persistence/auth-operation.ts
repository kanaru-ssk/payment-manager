import "server-only";
import type { SendSigninLink, SignInWithLink } from "@/domain/auth";
import { STATUS, getStatusByCode } from "@/domain/status";
import { authServiceClient } from "@/infrastructure/appgrpc/client";

export const sendSigninLink: SendSigninLink = async (email) => {
	try {
		const response = await authServiceClient.sendSignInLink({ email });
		console.log(response);
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
		console.log(err);
		// unknown error
		return {
			success: false,
			errors: STATUS.ERR_UNKNOWN,
		};
	}
};

export const signInWithLink: SignInWithLink = async (
	email,
	verificationToken,
) => {
	try {
		const response = await authServiceClient.signInWithLink({
			email,
			verificationToken,
		});
		console.log(response);
		const status = getStatusByCode(response.status?.code);

		// status ok
		if (status.code === 0 && response.auth) {
			return {
				success: true,
				data: {
					userId: response.auth.userId,
					userName: response.auth.userName,
					email: response.auth.email,
					idToken: response.auth.idToken,
					refreshToken: response.auth.refreshToken,
				},
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
