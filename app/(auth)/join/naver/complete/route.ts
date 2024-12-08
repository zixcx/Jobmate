// ./app/(auth)/join/naver/complete/route.ts
import socialAuth from "@/lib/auth/socialAuth";
import { NextRequest, NextResponse } from "next/server";
import { loginSession, setUserRole } from "@/lib/session";
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
        const token = await socialAuth.getNaverToken(code, state);

        if (!token) {
            console.error("Failed to obtain access token from Naver");
            return new Response("Authentication failed", { status: 401 });
        }

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
        const username = userInfo.nickname || "unknown";
        const avatar = userInfo.profile_image || "";

        if (!naverId) {
            console.error("Naver ID is undefined or null");
            return new Response("Failed to retrieve user information", {
                status: 500,
            });
        }

        let user = await db.user.findUnique({
            where: {
                naver_id: naverId.toString(),
            },
        });

        if (!user) {
            let finalUsername = `${username}_naver`;
            const existingUser = await db.user.findUnique({
                where: {
                    username: finalUsername,
                },
            });

            if (existingUser) {
                finalUsername = `${username}${crypto
                    .randomBytes(4)
                    .toString("hex")}_naver`;
            }

            user = await db.user.create({
                data: {
                    naver_id: naverId.toString(),
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
        console.error("Error during Naver login process:", error);
        return new Response("Internal server error", {
            status: 500,
        });
    }
}
