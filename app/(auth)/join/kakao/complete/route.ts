import socialAuth from "@/lib/auth/socialAuth";
import { NextRequest, NextResponse } from "next/server";
import { loginSession } from "@/lib/session";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import crypto from "crypto";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
        return new Response("Invalid request: missing code", {
            status: 400,
        });
    }

    try {
        // 1. 카카오로부터 토큰 받기
        const token = await socialAuth.getKakaoToken(code);

        // 2. 토큰을 사용해 카카오 API에서 사용자 정보 가져오기
        const userInfoResponse = await fetch(
            "https://kapi.kakao.com/v2/user/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userInfo = await userInfoResponse.json();

        if (userInfo.error) {
            console.error(
                "Failed to fetch user info from Kakao:",
                userInfo.error
            );
            return redirect("/");
        }

        const kakaoId = userInfo.id.toString();
        const username = userInfo.kakao_account.profile.nickname || "unknown"; // 기본 사용자 이름 설정
        const avatar = userInfo.kakao_account.profile.profile_image_url || "";

        if (!kakaoId) {
            console.error("Kakao ID is undefined or null");
            return new Response("Failed to retrieve user information", {
                status: 500,
            });
        }

        // 3. DB에서 사용자를 확인
        let user = await db.user.findUnique({
            where: {
                kakao_id: kakaoId,
            },
        });

        if (!user) {
            // username이 이미 존재하는지 확인
            let finalUsername = `${username}_kakao`;
            const existingUser = await db.user.findUnique({
                where: {
                    username: finalUsername,
                },
            });

            // 동일한 이름이 있는 경우 이름을 고유하게 수정
            if (existingUser) {
                finalUsername = `${username}${crypto
                    .randomBytes(4)
                    .toString("hex")}_kakao`;
            }

            // 새로운 사용자 생성
            user = await db.user.create({
                data: {
                    kakao_id: kakaoId,
                    username: finalUsername,
                    avatar,
                },
            });
        }

        // 4. 세션에 사용자 ID 저장
        await loginSession(user.id);

        return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
        console.error("Error during Kakao login process:", error);
        return new Response("Internal server error", {
            status: 500,
        });
    }
}
