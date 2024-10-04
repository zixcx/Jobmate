import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function isLogin() {
    const session = await getSession();
    return Boolean(session.id);
}

export async function logout() {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}
