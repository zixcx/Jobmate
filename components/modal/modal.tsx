"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface ModalProps {
    onClose: () => void;
    closeButtonVisible?: boolean;
    children?: React.ReactNode;
}

export default function Modal({
    onClose,
    closeButtonVisible = false,
    children,
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
            {/* Backdrop */}
            <div
                id="backdrop"
                onClick={onClose}
                className="w-full h-full absolute top-0 left-0 z-[999] bg-black opacity-30"
            />

            {/* Modal Content */}
            <div
                className={`relative z-[1000] p-6 bg-white rounded-lg transition-opacity duration-400 ${
                    isVisible ? "opacity-100" : "opacity-20"
                }`}
            >
                {children}
            </div>
            {closeButtonVisible && (
                <button
                    onClick={onClose}
                    className="absolute z-[1000] top-0 right-0 p-1 m-1 bg-black bg-opacity-0 rounded-lg cursor-pointer hover:bg-opacity-10"
                >
                    <XMarkIcon width={32} className="fill-neutral-100" />
                </button>
            )}
        </div>
    );
}
