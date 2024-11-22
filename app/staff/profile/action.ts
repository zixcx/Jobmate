// ./app/staff/profile/action.ts
"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
}

export async function getProfileData() {
    try {
        const session = await getSession();

        if (!session.id) {
            throw new Error("Not authenticated");
        }

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

        return user;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
    }
}
