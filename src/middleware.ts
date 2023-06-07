import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(
    "next-auth.session-token" || "__Secure-next-auth.session-token"
  );
  if (!session) {
    return NextResponse.rewrite(new URL("/auth/signin", req.nextUrl));
  } else {
    return NextResponse.rewrite(new URL(req.nextUrl));
  }
}

export const config = {
  matcher: ["/survey/:path*", "/profile"],
};
