// ./app/owner/profile/actions.ts
// ./app/owner/profile/action.ts
"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 프로필 데이터 타입을 정의합니다.
interface ProfileData {
    avatar: string | null;
    owner: {
        name: string;
        store: {
            store_name: string;
            phone: string;
        } | null;
    } | null;
}

// 캐시 데이터 타입을 정의합니다.
interface CachedProfileData {
    data: ProfileData;
    timestamp: number;
}

// 메모리 캐시 설정
const profileCache = new Map<string, CachedProfileData>();

// 캐시 유효 시간 (예: 10분)
const CACHE_DURATION = 10 * 60 * 1000;

export async function logout() {
    const session = await getSession();
    if (session?.destroy) {
        await session.destroy();
    }
    redirect("/");
}

export async function getProfileData(): Promise<ProfileData | null> {
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
            return cached.data;
        }

        // DB에서 사용자 데이터 가져오기
        const user = await db.user.findUnique({
            where: { id: session.id },
            select: {
                avatar: true,
                owner: {
                    select: {
                        name: true,
                        store: {
                            select: {
                                store_name: true,
                                phone: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // TypeScript에게 user 객체의 구조를 명시합니다.
        const profileData: ProfileData = {
            avatar: user.avatar,
            owner: user.owner
                ? {
                      name: user.owner.name,
                      store: user.owner.store
                          ? {
                                store_name: user.owner.store.store_name,
                                phone: user.owner.store.phone,
                            }
                          : null,
                  }
                : null,
        };

        // 캐시에 저장
        profileCache.set(session.id, { data: profileData, timestamp: now });

        return profileData;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
    }
}
