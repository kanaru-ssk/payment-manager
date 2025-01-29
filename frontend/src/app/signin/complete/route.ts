import { signInWithLink } from "@/infrastructure/persistence/auth-operation";
import { getEmail, setAuth } from "@/infrastructure/persistence/auth-store";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const oobCode = searchParams.get("oobCode");
	if (typeof oobCode !== "string") {
		return redirect("/signin?error=INVALID_LINK");
	}

	const email = await getEmail();
	if (!email || !oobCode) {
		return redirect("/signin?error=EMAIL_NOTFOUND");
	}

	const response = await signInWithLink(email, oobCode);

	if (!response.success) {
		return redirect("/signin?error=SIGNIN_FAILED");
	}

	// 認証状態を保存
	setAuth(response.data);

	// TODO: redirect correct page
	return redirect("/category");
}
