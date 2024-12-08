// ./components/owner/StaffList.tsx
"use client";

import { useState, useEffect } from "react";
import { getPendingApplications } from "./actions";

interface Staff {
    id: string | null; // id가 null일 가능성 처리
    name: string;
    role: string;
}

export default function StaffList() {
    const [staffList, setStaffList] = useState<Staff[]>([]);

    useEffect(() => {
        fetchStaffList();
    }, []);

    const fetchStaffList = async () => {
        try {
            const data = await getPendingApplications();
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
                            key={staff.id || Math.random()}
                            className="flex justify-between"
                        >
                            <div>
                                <p className="font-medium text-gray-800">
                                    {staff.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {staff.role}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
