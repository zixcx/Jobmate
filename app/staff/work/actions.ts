// ./app/staff/work/actions.ts
// ./app/staff/work/action.ts
"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { ObjectId } from "mongodb";

export async function getStores(query: string) {
    const stores = await db.store.findMany({
        where: {
            OR: [
                { store_name: { contains: query, mode: "insensitive" } },
                { store_tag: { contains: query, mode: "insensitive" } },
                {
                    owner: {
                        user: {
                            username: { contains: query, mode: "insensitive" },
                        },
                    },
                },
                { phone: { contains: query, mode: "insensitive" } },
            ],
        },
        select: {
            id: true,
            store_name: true,
            store_tag: true,
            owner: { select: { user: { select: { username: true } } } },
            address: true,
            detail_address: true,
            phone: true,
        },
    });

    return stores.map((store) => ({
        id: store.id, // ObjectId 그대로 반환
        store_name: store.store_name,
        store_tag: store.store_tag,
        owner_name: store.owner.user.username,
        store_address: store.address,
        store_detail_address: store.detail_address || "",
        bg_color: "#B7E0FF",
    }));
}

export async function applyForStore(storeId: string) {
    try {
        const session = await getSession();
        if (!session || !session.id) {
            throw new Error("로그인된 세션이 유효하지 않습니다.");
        }

        // User ID로 Staff를 조회합니다.
        const staff = await db.staff.findUnique({
            where: { userId: session.id },
        });

        if (!staff) {
            throw new Error("Staff 정보를 찾을 수 없습니다.");
        }

        const staffId = staff.id;

        if (!ObjectId.isValid(storeId) || !ObjectId.isValid(staffId)) {
            throw new Error("유효하지 않은 ID 형식입니다.");
        }

        const existingApplication = await db.staffAssignment.findFirst({
            where: {
                staffId: staffId,
                storeId: storeId,
                status: "PENDING",
            },
        });

        if (existingApplication) {
            throw new Error("이미 해당 가게에 신청을 보냈습니다.");
        }

        await db.staffAssignment.create({
            data: {
                staffId: staffId,
                storeId: storeId,
                status: "PENDING",
                hourly_wage: 0,
                role: "알바",
            },
        });

        return { success: true, message: "가입 신청이 완료되었습니다." };
    } catch (error) {
        console.error("Error applying for store:", error);
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "오류가 발생했습니다.",
        };
    }
}
