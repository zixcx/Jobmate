import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface Store {
    id: number;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
    store_detail_address: string;
}
export default function StoreCard(store: Store) {
    return (
        <div
            key={store.id}
            className="w-full bg-neutral-50 rounded-xl box relative cursor-pointer group hover:scale-102 transition duration-300"
        >
            <div className="flex flex-col gap-1 justify-center">
                <div className="flex *:title">
                    <span>{store.store_name}</span>
                    <span>#</span>
                    <span>{store.store_tag}</span>
                </div>
                <div className="flex gap-2 items-center *:text-neutral-700">
                    <span className="text-sm">
                        {store.owner_name}
                        {" 사장님"}
                    </span>
                </div>
                <div className="flex items-center gap-1 *:text-sm *:text-neutral-700">
                    <span>{store.store_address}</span>
                    <span className="text-xs font-light select-none">
                        &#124;
                    </span>
                    <span>{store.store_detail_address}</span>
                </div>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 h-full w-16 flex justify-end items-center p-4 group-hover:from-neutral-100 group-hover:bg-gradient-to-l">
                <ChevronRightIcon width={20} />
            </div>
        </div>
    );
}
