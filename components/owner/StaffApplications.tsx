"use client";

import { useState, useEffect, useRef } from "react";
import { getPendingApplications, handleStaffApplication } from "./actions";
import { LoaderCircleIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StaffApplication {
    id: string;
    name: string;
    avatar: string | null;
    role: string;
    storeId: string;
}

export default function StaffApplications() {
    const [applications, setApplications] = useState<StaffApplication[]>([]);
    const [isReloading, setIsReloading] = useState(false);
    const lastReloadTime = useRef<number>(0);
    const reloadTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchApplications();
        return () => {
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
            reloadTimeout.current = setTimeout(() => {
                setIsReloading(false);
            }, 3000);
        }
    };

    const handleAccept = async (applicationId: string, storeId: string) => {
        try {
            await handleStaffApplication(applicationId, storeId, "ACCEPTED");
            // 수락 후 목록 업데이트
            setApplications(
                applications.filter((app) => app.id !== applicationId)
            );
            // 성공 toast 메시지
            toast.success("Application Accepted");
        } catch (error) {
            console.error("Error accepting application:", error);
            // 실패 toast 메시지
            toast.error("Failed to accept application. Please try again.");
        }
    };

    const handleReject = async (applicationId: string, storeId: string) => {
        try {
            await handleStaffApplication(applicationId, storeId, "REJECTED");
            // 거절 후 목록 업데이트
            setApplications(
                applications.filter((app) => app.id !== applicationId)
            );
            // 성공 toast 메시지
            toast.success("Application Rejected");
        } catch (error) {
            console.error("Error rejecting application:", error);
            // 실패 toast 메시지
            toast.error("Failed to reject application. Please try again.");
        }
    };

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white relative">
            {/* ToastContainer 추가 */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    신청 대기 중인 직원
                </h2>
                <button
                    onClick={handleReload}
                    disabled={isReloading}
                    className={`size-7 p-1.5 flex justify-center items-center rounded ${
                        isReloading
                            ? "bg-neutral-200 text-gray-500 cursor-not-allowed"
                            : "bg-neutral-100 text-gray-800 hover:brightness-95 active:brightness-90 transition-all"
                    }`}
                >
                    {isReloading ? (
                        <LoaderCircleIcon className="size-full animate-spin" />
                    ) : (
                        <RefreshCwIcon className="size-full" />
                    )}
                </button>
            </div>
            {applications.length === 0 ? (
                <p className="text-gray-600">
                    신청 대기 중인 직원이 없습니다 😀
                </p>
            ) : (
                <ul className="space-y-4">
                    {applications.map((app) => (
                        <li
                            key={app.id}
                            className="flex items-center justify-between px-3 py-1"
                        >
                            <div className="flex items-center gap-3 shrink-0">
                                {app.avatar ? (
                                    <Image
                                        src={app.avatar}
                                        alt={`${app.name}'s avatar`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">
                                            {app.name[0]}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {app.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {app.role}
                                    </p>
                                </div>
                            </div>
                            {/* 수락 및 거절 버튼 */}
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() =>
                                        handleAccept(app.id, app.storeId)
                                    }
                                    className="px-3 py-1.5 rounded border bg-white text-neutral-800 hover:brightness-95 transition-all"
                                >
                                    수락
                                </button>
                                <button
                                    onClick={() =>
                                        handleReject(app.id, app.storeId)
                                    }
                                    className="px-3 py-1.5 rounded border bg-neutral-100 text-neutral-800 hover:brightness-95 transition-all"
                                >
                                    거절
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
