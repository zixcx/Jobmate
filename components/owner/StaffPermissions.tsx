// ./components/owner/StaffPermissions.tsx
"use client";

import { useState, useEffect } from "react";
import { getStaffPermissions } from "@/components/owner/actions";

interface StaffPermission {
    id: string | null; // null 가능하도록 수정
    name: string;
    role: string;
}

export default function StaffPermissions() {
    const [permissions, setPermissions] = useState<StaffPermission[]>([]);

    useEffect(() => {
        fetchStaffPermissions();
    }, []);

    const fetchStaffPermissions = async () => {
        try {
            const data = await getStaffPermissions();
            setPermissions(data); // 타입 충돌 해결
        } catch (error) {
            console.error("Error fetching staff permissions:", error);
        }
    };

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Staff Permissions
            </h2>
            {permissions.length === 0 ? (
                <p className="text-gray-600">No staff found</p>
            ) : (
                <ul className="space-y-4">
                    {permissions.map((permission) => (
                        <li
                            key={permission.id || Math.random()}
                            className="flex justify-between"
                        >
                            <div>
                                <p className="font-medium text-gray-800">
                                    {permission.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {permission.role}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
