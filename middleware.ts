import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

const publicUrls = new Set([
    "/",
    "/join",
    "/join/kakao",
    "/join/kakao/complete",
    "/join/naver",
    "/join/naver/complete",
    "/notice",
]);

export async function middleware(request: NextRequest) {
    const session = await getSession();

    const exists = publicUrls.has(request.nextUrl.pathname);
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (request.nextUrl.pathname === "/join") {
            return NextResponse.redirect(new URL("/select", request.url));
        }
    }
    // ???
    // else {
    //     if (exists) {
    //         return NextResponse.redirect(new URL("/select", request.url));
    //     }
    // }
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
