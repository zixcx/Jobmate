// ./lib/session.ts
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// 세션에서 사용할 데이터 구조
interface SessionContent {
    id?: string; // 사용자 ID (로그인 세션에서 사용)
}

interface RoleSessionContent {
    role?: "owner" | "staff"; // 사용자 역할 (역할 세션에서 사용)
}

// 로그인 세션 가져오기 함수
export default function getSession() {
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "loginSession",
        password: process.env.COOKIE_PASSWORD!,
    });
}

// 역할 세션 가져오기 함수
export function getRoleSession() {
    return getIronSession<RoleSessionContent>(cookies(), {
        cookieName: "userRole",
        password: process.env.COOKIE_PASSWORD!,
    });
}

// 사용자 ID를 세션에 저장 (로그인 시 호출)
export async function loginSession(id: string) {
    const session = await getSession();
    session.id = id;
    await session.save();
}

// 사용자 역할을 세션에 저장
export async function setUserRole(role: "owner" | "staff") {
    const roleSession = await getRoleSession();
    roleSession.role = role;
    await roleSession.save();
}
