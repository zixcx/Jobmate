import socialAuth from "@/lib/auth/socialAuth";
import { NextRequest, NextResponse } from "next/server";
import { loginSession } from "@/lib/session";
import db from "@/lib/db";
import crypto from "crypto";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");

    if (!code || !state) {
        return new Response("Invalid request: missing code or state", {
            status: 400,
        });
    }

    try {
        // 1. 네이버로부터 토큰 받기
        const token = await socialAuth.getNaverToken(code, state);

        if (!token) {
            console.error("Failed to obtain access token from Naver");
            return new Response("Authentication failed", { status: 401 });
        }

        // 2. 토큰을 사용해 네이버 API에서 사용자 정보 가져오기
        const userInfoResponse = await fetch(
            "https://openapi.naver.com/v1/nid/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const userInfoData = await userInfoResponse.json();

        if (userInfoData.resultcode !== "00") {
            console.error(
                "Failed to fetch user info from Naver:",
                userInfoData.message
            );
            return new Response("Failed to fetch user information", {
                status: 401,
            });
        }

        const userInfo = userInfoData.response;
        const naverId = userInfo.id;
        const username = userInfo.nickname || "unknown"; // 기본 사용자 이름 설정
        const avatar = userInfo.profile_image || "";

        if (!naverId) {
            console.error("Naver ID is undefined or null");
            return new Response("Failed to retrieve user information", {
                status: 500,
            });
        }

        // 3. DB에서 사용자를 확인
        let user = await db.user.findUnique({
            where: {
                naver_id: naverId.toString(),
            },
        });

        if (!user) {
            // username이 이미 존재하는지 확인
            let finalUsername = `${username}_naver`;
            const existingUser = await db.user.findUnique({
                where: {
                    username: finalUsername,
                },
            });

            // 동일한 이름이 있는 경우 이름을 고유하게 수정
            if (existingUser) {
                finalUsername = `${username}${crypto
                    .randomBytes(4)
                    .toString("hex")}_naver`;
            }

            // 새로운 사용자 생성
            user = await db.user.create({
                data: {
                    naver_id: naverId.toString(),
                    username: finalUsername,
                    avatar,
                },
            });
        }

        // 4. 세션에 사용자 ID 저장
        await loginSession(user.id);

        return NextResponse.redirect(new URL("/selection", request.url));
    } catch (error) {
        console.error("Error during Naver login process:", error);
        return new Response("Internal server error", {
            status: 500,
        });
    }
}
