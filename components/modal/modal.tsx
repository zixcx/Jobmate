"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    closeButtonVisible?: boolean;
    width?: string;
    height?: string;
    show: boolean; // show prop 추가
}

export default function Modal({
    children,
    onClose,
    closeButtonVisible = false,
    width = "400px",
    height = "400px",
    show, // show prop 추가
}: ModalProps) {
    return (
        <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity flex justify-center items-center overflow-hidden ${
                show ? "" : "hidden" // show prop 사용
            }`}
        >
            <div
                className="bg-white rounded-2xl p-4 overflow-y-scroll"
                style={{ width: width, height: height }}
            >
                {closeButtonVisible && (
                    <div className="flex justify-end">
                        <button onClick={onClose}>
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
