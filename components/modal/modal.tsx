// ./components/modal/modal.tsx
"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

interface ModalProps {
    onClose: () => void;
    closeButtonVisible?: boolean;
    children?: React.ReactNode;
    width?: string;
    height?: string;
}

export default function Modal({
    onClose,
    closeButtonVisible = false,
    children,
    width,
    height,
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // 애니메이션 설정
    const transitions = useTransition(isVisible && !isClosing, {
        from: { opacity: 0, transform: "scale(0.95)" },
        enter: { opacity: 1, transform: "scale(1)" },
        leave: { opacity: 0, transform: "scale(0.95)" },
        config: { duration: 250 },
        onRest: () => {
            if (isClosing) {
                setIsVisible(false);
                onClose();
            }
        },
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useLockBodyScroll();

    // 모달 닫기 함수
    const handleClose = () => {
        setIsClosing(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
            {/* Backdrop */}
            <div
                id="backdrop"
                onClick={handleClose} // 닫기 함수를 호출
                className="w-full h-full absolute top-0 left-0 z-[999] bg-black/30 backdrop-blur-md"
            />

            {/* Modal Content */}
            {transitions((style, item) =>
                item ? (
                    <animated.div
                        className="relative z-[1000] p-6 bg-white rounded-lg"
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                    >
                        {children}
                    </animated.div>
                ) : null
            )}

            {closeButtonVisible && (
                <button
                    onClick={handleClose} // 닫기 함수를 호출
                    className="absolute z-[1000] top-0 right-0 p-1 m-1 bg-black bg-opacity-0 rounded-lg cursor-pointer hover:bg-opacity-10"
                >
                    <XMarkIcon width={32} className="fill-neutral-100" />
                </button>
            )}
        </div>
    );
}
