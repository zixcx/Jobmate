// middleware.ts
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

    // 로그인 여부만 확인
    if (!session.id && !exists) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 로그인한 사용자는 selection으로 리디렉션
    if (session.id && request.nextUrl.pathname === "/join") {
        return NextResponse.redirect(new URL("/selection", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
