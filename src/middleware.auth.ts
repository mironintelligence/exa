import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/admin/:path*", "/wallet/:path*", "/profile/:path*"],
};
