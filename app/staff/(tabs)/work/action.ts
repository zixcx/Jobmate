// action.ts
"use server";

import db from "@/lib/db";

export async function getStores() {
    const stores = await db.store.findMany({
        select: {
            id: true,
            store_name: true,
            store_tag: true,
            owner: {
                select: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            address: true,
            theme_color: true,
        },
    });

    return stores.map((store) => ({
        id: parseInt(store.id, 10),
        store_name: store.store_name,
        store_tag: store.store_tag,
        owner_name: store.owner?.user.username || "",
        store_address: store.address,
        bg_color: store.theme_color || "#FFFFFF",
    }));
}
