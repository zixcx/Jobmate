import socialAuth from "@/lib/auth/socialAuth";
import { NextRequest, NextResponse } from "next/server";
import { loginSession, setUserRole } from "@/lib/session";
import db from "@/lib/db";
import crypto from "crypto";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
        return new Response("Invalid request: missing code", {
            status: 400,
        });
    }

    try {
        const tokenResponse = await socialAuth.getKakaoToken(code);

        // 토큰 요청 실패 시 에러 처리
        if (tokenResponse.error) {
            console.error("Failed to get Kakao token:", tokenResponse.error);
            return new Response("Failed to get Kakao token", {
                status: 500,
            });
        }

        const token = tokenResponse.access_token;

        const userInfoResponse = await fetch(
            "https://kapi.kakao.com/v2/user/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // 사용자 정보 요청 실패 시 에러 처리
        if (!userInfoResponse.ok) {
            const errorData = await userInfoResponse.json();
            console.error(
                "Failed to fetch user info from Kakao:",
                userInfoResponse.status,
                errorData
            );
            return new Response("Failed to fetch user info from Kakao", {
                status: userInfoResponse.status,
            });
        }

        const userInfo = await userInfoResponse.json();

        const kakaoId = userInfo.id?.toString();
        const username = userInfo.kakao_account?.profile?.nickname || "unknown";
        const avatar = userInfo.kakao_account?.profile?.profile_image_url || "";

        if (!kakaoId) {
            console.error("Kakao ID is undefined or null", userInfo);
            return new Response("Failed to retrieve Kakao ID", {
                status: 500,
            });
        }

        // 사용자 생성 전 kakao_id 중복 체크
        let user = await db.user.findUnique({
            where: {
                kakao_id: kakaoId,
            },
        });

        if (!user) {
            let finalUsername = `${username}_kakao`;
            const existingUser = await db.user.findUnique({
                where: {
                    username: finalUsername,
                },
            });

            if (existingUser) {
                finalUsername = `${username}${crypto
                    .randomBytes(4)
                    .toString("hex")}_kakao`;
            }

            user = await db.user.create({
                data: {
                    kakao_id: kakaoId,
                    username: finalUsername,
                    avatar,
                },
            });
        }

        // 로그인 세션 설정
        await loginSession(user.id);

        // 역할 확인 및 설정
        const owner = await db.owner.findUnique({
            where: { userId: user.id },
        });

        const staff = await db.staff.findUnique({
            where: { userId: user.id },
        });

        if (owner) {
            await setUserRole("owner");
            return NextResponse.redirect(new URL("/owner/home", request.url));
        } else if (staff) {
            await setUserRole("staff");
            return NextResponse.redirect(new URL("/staff/home", request.url));
        }

        // 역할이 없는 경우 기본 페이지로 리다이렉트
        return NextResponse.redirect(new URL("/selection", request.url));
    } catch (error) {
        console.error("Error during Kakao login process:", error);
        return new Response("Internal server error", {
            status: 500,
        });
    }
}
