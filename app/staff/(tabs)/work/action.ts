"use server";

import db from "@/lib/db";

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
                }, // 사장님 이름 검색 조건 추가
                { phone: { contains: query, mode: "insensitive" } }, // 전화번호 검색 조건 추가
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
        id: parseInt(store.id, 10),
        store_name: store.store_name,
        store_tag: store.store_tag,
        owner_name: store.owner.user.username,
        store_address: store.address,
        store_detail_address: store.detail_address || "",
        bg_color: "#B7E0FF",
    }));
}
