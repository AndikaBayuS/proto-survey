import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log("nectauth", req.cookies.has('next-auth.session-token'));
      console.log("secure", req.cookies.has('__Secure-next-auth.session-token'));
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/survey/:path*", "/profile"],
};
