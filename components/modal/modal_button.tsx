"use client";

import { useState } from "react";
import Modal from "./modal";

interface ModalButtonProps {
    className?: string;
    buttonChildren?: React.ReactNode;
    modalChildren?: React.ReactNode;
    modalCloseBtnVisible?: boolean;
    modalWidth?: string;
    modalHeight?: string;
}

export default function ModalButton({
    className,
    buttonChildren,
    modalChildren,
    modalCloseBtnVisible,
    modalWidth,
    modalHeight,
}: ModalButtonProps) {
    const [isShowModal, setIsShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setIsShowModal(true)} className={className}>
                {buttonChildren}
            </button>

            {isShowModal && (
                <Modal
                    onClose={() => setIsShowModal(false)}
                    closeButtonVisible={modalCloseBtnVisible}
                    width={modalWidth}
                    height={modalHeight}
                >
                    {modalChildren}
                </Modal>
            )}
        </>
    );
}
