// ./app/staff/profile/action.ts
"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 메모리 캐시 설정
const profileCache = new Map<string, { data: any; timestamp: number }>();

// 캐시 유효 시간 (예: 10분)
const CACHE_DURATION = 10 * 60 * 1000; // 10분

export async function logout() {
    const session = await getSession();
    if (session?.destroy) {
        await session.destroy(); // 세션 삭제
    }
    redirect("/"); // 메인 페이지로 리다이렉트
}

export async function getProfileData() {
    try {
        const session = await getSession();

        if (!session.id) {
            throw new Error("Not authenticated");
        }

        // 캐시 확인
        const cached = profileCache.get(session.id);
        const now = Date.now();

        if (cached && now - cached.timestamp < CACHE_DURATION) {
            console.log("Returning cached profile data");
            return cached.data; // 캐시 데이터 반환
        }

        // DB에서 사용자 데이터 가져오기
        const user = await db.user.findUnique({
            where: { id: session.id },
            select: {
                avatar: true,
                staff: {
                    select: {
                        name: true,
                        birth_year: true,
                        phone: true,
                        gender: true,
                        assignments: { select: { id: true } },
                    },
                },
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // 캐시에 저장
        profileCache.set(session.id, { data: user, timestamp: now });

        return user;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
    }
}
