// ./components/owner/StaffList.tsx
"use client";

import { useState, useEffect } from "react";
import { getStaffList } from "./actions"; // getStaffList 함수 import
import Image from "next/image";

interface Staff {
    id: string;
    name: string;
    avatar: string | null; // 아바타 타입 추가
    role: string;
}

export default function StaffList() {
    const [staffList, setStaffList] = useState<Staff[]>([]);

    useEffect(() => {
        fetchStaffList();
    }, []);

    const fetchStaffList = async () => {
        try {
            const data = await getStaffList(); // getStaffList 함수 사용
            setStaffList(data);
        } catch (error) {
            console.error("Error fetching staff list:", error);
        }
    };

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Staff List
            </h2>
            {staffList.length === 0 ? (
                <p className="text-gray-600">No staff found</p>
            ) : (
                <ul className="space-y-4">
                    {staffList.map((staff) => (
                        <li
                            key={staff.id}
                            className="flex items-center justify-between px-3 py-1" // items-center 추가
                        >
                            <div className="flex items-center gap-3">
                                {/* 아바타와 이름/역할을 감싸는 div */}
                                {/* 아바타 이미지 */}
                                {staff.avatar ? (
                                    <Image
                                        src={staff.avatar}
                                        alt={`${staff.name}'s avatar`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">
                                            {/* 기본 아바타 아이콘 또는 이니셜 */}
                                            {staff.name[0]}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {staff.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {staff.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
