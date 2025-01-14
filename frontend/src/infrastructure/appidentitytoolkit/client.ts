import { env } from "@/env";
import { auth, identitytoolkit } from "@googleapis/identitytoolkit";

export const authClient = identitytoolkit({
	version: "v3",
	auth: new auth.GoogleAuth({ projectId: env.PROJECT_ID }),
});
