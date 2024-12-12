// ./components/Profile/owner/OwnerInteractiveProfile.tsx

"use client";

import { logout } from "@/components/navbar/actions";
import {
    PhoneIcon,
    UserGroupIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProfileData {
    avatar: string | null;
    owner: {
        name: string;
        store: {
            store_name: string;
            phone: string;
        } | null;
    } | null;
}

export default function OwnerInteractiveProfile({
    user,
}: {
    user: ProfileData;
}) {
    return (
        <>
            <div className="md:flex-shrink-0 bg-neutral-800 text-white p-8 flex flex-col items-center justify-center">
                <div className="relative">
                    <Image
                        src={user?.avatar ?? "/assets/default_profile.jpg"}
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-white shadow-lg"
                        alt={user?.owner?.name || "Owner Avatar"}
                    />
                </div>
                <div className="flex justify-center items-center mt-6 relative">
                    <h1 className="text-3xl font-bold text-center">
                        {user?.owner?.name}
                    </h1>
                </div>
            </div>
            <div className="p-8 md:flex-grow">
                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-800">
                        정보
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center text-neutral-600 gap-4">
                            <UserGroupIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">가게 이름</p>
                                <p>
                                    {user?.owner?.store?.store_name ??
                                        "가게 정보 없음"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center text-neutral-600 gap-4">
                            <PhoneIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">전화번호</p>
                                <p>
                                    {user?.owner?.store?.phone ??
                                        "전화번호 정보 없음"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="mt-8 flex items-center justify-center w-full px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition duration-300"
                >
                    <ArrowRightOnRectangleIcon className="size-5 mr-2" />
                    로그아웃
                </button>
            </div>
        </>
    );
}
