// 
import { NextRequest, NextResponse } from "next/server";
import getSession, { getRoleSession } from "./lib/session";

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
    const roleSession = await getRoleSession();
    const exists = publicUrls.has(request.nextUrl.pathname);

    // 로그인되지 않은 경우 메인 페이지로 리디렉트
    if (!session.id && !exists) {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.next(); // 무한 루프 방지
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 로그인했지만 역할이 없는 경우 `/selection`으로 리디렉트
    if (
        session.id &&
        request.nextUrl.pathname === "/join" &&
        !roleSession.role
    ) {
        if (request.nextUrl.pathname === ("/selection" as string)) {
            return NextResponse.next(); // 무한 루프 방지
        }
        return NextResponse.redirect(new URL("/selection", request.url));
    }

    // 로그인한 사용자가 role이 있는 경우
    if (session.id && roleSession.role) {
        const rolePathPrefix = `/${roleSession.role}`;
        const currentPath = request.nextUrl.pathname;

        // 존재하지 않는 하위 경로 확인
        const validPaths = new Set([
            `${rolePathPrefix}/home`,
            `${rolePathPrefix}/schedule`,
            `${rolePathPrefix}/work`,
            `${rolePathPrefix}/profile`,
        ]);

        if (!currentPath.startsWith(rolePathPrefix)) {
            // 현재 경로가 역할 경로로 시작하지 않는 경우
            return NextResponse.redirect(
                new URL(`${rolePathPrefix}/home`, request.url)
            );
        }

        if (!validPaths.has(currentPath)) {
            // 존재하지 않는 하위 경로 요청 시 기본 경로로 리디렉트
            return NextResponse.redirect(
                new URL(`${rolePathPrefix}/home`, request.url)
            );
        }

        return NextResponse.next(); // 요청 계속 진행
    }

    // 요청을 계속 진행
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
