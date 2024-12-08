// ./components/owner/StaffApplications.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getPendingApplications, handleStaffApplication } from "./actions";

interface StaffApplication {
    id: string;
    name: string;
    role: string;
}

export default function StaffApplications() {
    const [applications, setApplications] = useState<StaffApplication[]>([]);
    const [isReloading, setIsReloading] = useState(false); // Reload 상태
    const lastReloadTime = useRef<number>(0); // 마지막 리로드 시간 저장
    const reloadTimeout = useRef<NodeJS.Timeout | null>(null); // 타임아웃 참조

    useEffect(() => {
        fetchApplications();
        return () => {
            // 컴포넌트 언마운트 시 타임아웃 정리
            if (reloadTimeout.current) clearTimeout(reloadTimeout.current);
        };
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getPendingApplications();
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const handleReload = async () => {
        const now = Date.now();
        if (now - lastReloadTime.current < 3000) {
            console.warn("Reload is debounced");
            return;
        }

        lastReloadTime.current = now;
        setIsReloading(true);

        try {
            await fetchApplications();
        } catch (error) {
            console.error("Error reloading applications:", error);
        } finally {
            // 3초 후에 비활성화 해제
            reloadTimeout.current = setTimeout(() => {
                setIsReloading(false);
            }, 3000);
        }
    };

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Staff Applications
                </h2>
                <button
                    onClick={handleReload}
                    disabled={isReloading} // Reload 상태에 따라 비활성화
                    className={`px-3 py-1 rounded ${
                        isReloading
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                >
                    {isReloading ? "Reloading..." : "Reload"}
                </button>
            </div>
            {applications.length === 0 ? (
                <p className="text-gray-600">No pending applications</p>
            ) : (
                <ul className="space-y-4">
                    {applications.map((app) => (
                        <li
                            key={app.id}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium text-gray-800">
                                    {app.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {app.role}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
