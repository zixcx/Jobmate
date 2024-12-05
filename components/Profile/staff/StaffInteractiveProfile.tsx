// ./app/staff/profile/InteractiveProfile.tsx
"use client";

import { logout } from "@/components/navbar/actions";
import { calculateAge } from "@/lib/etc";
import {
    PencilSquareIcon,
    PhoneIcon,
    CalendarIcon,
    UserGroupIcon,
    UserIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface ProfileData {
    avatar: string | null;
    staff: {
        name: string;
        birth_year: number;
        phone: string;
        gender: string;
        assignments: { id: string }[];
    } | null;
}

export default function StaffInteractiveProfile({
    user,
}: {
    user: ProfileData | null;
}) {
    if (!user) {
        // Handle the null case (e.g., display a message or redirect)
        return <div>User data is not available.</div>;
    }
    return (
        <>
            <div className="md:flex-shrink-0 bg-neutral-800 text-white p-8 flex flex-col items-center justify-center">
                <div className="relative">
                    <Image
                        src={user?.avatar ?? "/assets/default_profile.jpg"}
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-white shadow-lg"
                        alt={user?.staff?.name || "User Avatar"}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center mt-6 relative">
                        <h1 className="text-3xl font-bold text-center">
                            {user?.staff?.name}
                        </h1>
                        <button
                            onClick={() => {
                                alert("username edit");
                            }}
                            className="absolute -right-9 bottom-0 flex justify-center items-center p-1.5 rounded-lg cursor-pointer hover:bg-neutral-700 transition duration-300"
                        >
                            <PencilSquareIcon className="size-5 text-neutral-100" />
                        </button>
                    </div>
                </div>
                <p className="mt-2 text-neutral-400">
                    {user?.staff?.gender === "M" ? "Male" : "Female"}
                </p>
            </div>
            <div className="p-8 md:flex-grow">
                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-800">
                        정보
                    </h2>
                    <button className="flex justify-center items-center p-1.5 rounded-lg cursor-pointer hover:bg-neutral-200 transition duration-300">
                        <PencilSquareIcon className="size-5 text-neutral-600" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center text-neutral-600 gap-4">
                            <CalendarIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">태어난 연도</p>
                                <p>{user?.staff?.birth_year}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-neutral-600 gap-4">
                            <UserIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">나이</p>
                                <p>
                                    {calculateAge(
                                        Number(user?.staff?.birth_year)
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center text-neutral-600 gap-4">
                            <PhoneIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">전화번호</p>
                                <p>{user?.staff?.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-neutral-600 gap-4">
                            <UserGroupIcon className="size-5 text-neutral-500" />
                            <div>
                                <p className="font-bold">
                                    현재 근무중인 알바 수
                                </p>
                                <p>{user?.staff?.assignments?.length ?? 0}</p>
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
