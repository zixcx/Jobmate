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

    const handleOpenModal = () => {
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <button onClick={handleOpenModal} className={className}>
                {buttonChildren}
            </button>

            <Modal
                show={isShowModal} // show prop 추가
                onClose={handleCloseModal}
                closeButtonVisible={modalCloseBtnVisible}
                width={modalWidth}
                height={modalHeight}
            >
                {modalChildren}
            </Modal>
        </>
    );
}
