import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/student/:path*",
    "/approver/:path*",
    "/api/secure/:path*",
  ],
};
