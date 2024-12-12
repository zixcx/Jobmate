// ./components/store_card.tsx
"use client";

import { useState } from "react";
import {
    BuildingOfficeIcon,
    UserIcon,
    MapPinIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

interface Store {
    id: string;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
    store_detail_address: string;
}

interface StoreCardProps extends Store {
    onApply: (id: string) => void;
}

export default function StoreCard(store: StoreCardProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        store.onApply(store.id);
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div
            key={store.id}
            className="w-full bg-neutral-50 rounded-xl box relative cursor-pointer group hover:shadow-md transition duration-300 overflow-hidden"
            onClick={!showConfirmation ? handleClick : undefined}
        >
            <div className="flex flex-col gap-2 p-3 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="size-5 text-neutral-500" />
                        <span className="font-semibold text-lg">
                            {store.store_name}
                        </span>
                        <span className="text-sm text-neutral-500">
                            #{store.store_tag}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                    <UserIcon className="w-4 h-4" />
                    <span>{store.owner_name} 사장님</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-neutral-700">
                    <MapPinIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div>
                        <div>{store.store_address}</div>
                        {store.store_detail_address && (
                            <div className="text-neutral-500">
                                {store.store_detail_address}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showConfirmation && (
                <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-4">
                    <p className="text-lg font-semibold mb-4 text-center">
                        {store.store_name}에 지원하시겠습니까?
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleConfirm}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border text-black rounded-md hover:brightness-90 transition duration-300"
                        >
                            <CheckIcon className="size-5" />
                            지원하기
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-300/60 border text-black rounded-md hover:brightness-90 transition duration-300"
                        >
                            <XMarkIcon className="size-5" />
                            아니오
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
