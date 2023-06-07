import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
  let session;

  if (process.env.NODE_ENV === 'production') {
    session = req.cookies.has("__Secure-next-auth.session-token");
  } else {
    session = req.cookies.has("next-auth.session-token");
  }

  if (!session) {
    return NextResponse.rewrite(new URL("/auth/signin", req.nextUrl));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/survey/:path*", "/profile"],
};
