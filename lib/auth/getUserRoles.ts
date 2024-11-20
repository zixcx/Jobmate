import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getUserRoles() {
    const session = await getSession();

    if (!session.id) {
        throw new Error("Not authenticated");
    }

    const user = await db.user.findUnique({
        where: { id: session.id },
        include: { owner: true, staff: true },
    });

    const roles: string[] = [];
    if (user?.owner) roles.push("OWNER");
    if (user?.staff) roles.push("STAFF");

    return roles;
}
