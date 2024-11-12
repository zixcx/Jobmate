import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?: string; // 사용자 ID
    roles?: string[]; // 사용자 역할 목록
}

export default function getSession() {
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "loginSession",
        password: process.env.COOKIE_PASSWORD!,
    });
}

// 로그인 시 사용자 ID를 세션에 저장
export async function loginSession(id: string) {
    const session = await getSession();
    session.id = id;
    await session.save();
}

// 사용자 역할 목록을 세션에 추가
export async function setUserRoles(roles: string[]) {
    const session = await getSession();
    session.roles = roles;
    await session.save();
}
