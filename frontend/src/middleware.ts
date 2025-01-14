import { type NextRequest, NextResponse } from "next/server";
import { getAuth } from "./infrastructure/persistence/auth-repository";

const protectedRoutes = ["/category"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);

	const auth = await getAuth();

	if (isProtectedRoute && !auth?.userId) {
		return NextResponse.redirect(new URL("/signin", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
