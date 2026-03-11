import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Role-based route protection for dashboards
        if (pathname.startsWith("/admin") && token?.role !== "SUPERADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (pathname.startsWith("/vendor") && token?.role !== "VENDOR" && token?.role !== "SUPERADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                // Require auth only for protected routes
                if (pathname.startsWith("/admin") || pathname.startsWith("/vendor") || pathname.startsWith("/settings")) {
                    return !!token;
                }
                return true;
            },
        },
    }
);

export const config = {
    // Only run middleware on protected routes — NOT on login/register/api
    matcher: ["/admin/:path*", "/vendor/:path*", "/settings/:path*"],
};
