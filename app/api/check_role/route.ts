import { NextResponse } from "next/server";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function GET() {
    const session = await getSession();

    if (!session.id) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    }

    const user = await db.user.findUnique({
        where: { id: session.id },
        include: { owner: true, staff: true },
    });

    const roles: string[] = [];
    if (user?.owner) roles.push("OWNER");
    if (user?.staff) roles.push("STAFF");

    return NextResponse.json({ roles });
}
