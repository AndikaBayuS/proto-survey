import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export function middleware(req) {
  let session;

  if (process.env.NODE_ENV === "production") {
    session = req.cookies.has("__Secure-next-auth.session-token");
  } else {
    session = req.cookies.has("next-auth.session-token");
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/survey/:path*", "/profile"],
};
