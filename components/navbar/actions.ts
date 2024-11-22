// ./components/navbar/actions.ts
"use server";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function isLogin() {
    const session = await getSession();
    if (!session.id) {
        return false;
    } else {
        return true;
    }
}

export async function logout() {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}
