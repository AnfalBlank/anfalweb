import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the route belongs to admin section
    if (path.startsWith("/admin")) {
        // Allow access to login explicitly
        if (path === "/admin/login") {
            return NextResponse.next();
        }

        // Extremely lightweight edge validation (checking if auth token exists implicitly)
        const sessionToken = request.cookies.get("better-auth.session_token");
        if (!sessionToken) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
