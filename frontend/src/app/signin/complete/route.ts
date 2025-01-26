import { getEmail } from "@/infrastructure/persistence/auth-store";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const oobCode = searchParams.get("oobCode");
	const email = await getEmail();

	if (!email) {
		return Response.redirect("/signin?error=EMAIL_NOTFOUND");
	}

	// const res = await signIn

	return Response.redirect("/category");
}
