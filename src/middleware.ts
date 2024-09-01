import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pet/:path*",
    "/userDashboard/:path*",
    "/vet/:path*",
    "/adminDasboardh/:path*",
    "/appointment/:path*",
  ],
};
