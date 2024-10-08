"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Modal from "../modal/modal";
import DaumPostcode, { Address } from "react-daum-postcode";

export default function OwnerForm() {
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);

    const openModal = () => setIsShowModal(true);
    const closeModal = () => setIsShowModal(false);

    const handleComplete = (data: Address) => {
        setAddress(data.address);
        setDetailAddress(data.buildingName);
        closeModal();
    };

    return (
        <>
            <form className="flex flex-col items-start justify-center max-w-xs min-h-screen gap-8 mx-auto min-w-52">
                <div>
                    <h1 className="text-2xl font-semibold">
                        어떤 멋진 일을 하시나요?
                    </h1>
                    <h1 className="text-xl font-semibold">
                        정보를 입력해 주세요 👨‍💻
                    </h1>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <label className="flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">이름</span>
                        <input
                            type="text"
                            placeholder="이름을 입력해 주세요"
                            className="w-full max-w-xs input input-bordered"
                        />
                    </label>
                    <label className="flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">상호명</span>
                        <input
                            type="text"
                            placeholder="상호명을 입력해 주세요"
                            className="w-full max-w-xs input input-bordered"
                        />
                    </label>
                    <label className="relative flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">가게 주소</span>
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between max-w-xs gap-2">
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="가게주소를 입력해 주세요"
                                    value={address} // 주소 상태와 연결
                                    onChange={(e) => setAddress(e.target.value)} // 입력값을 직접 수정할 수 있도록 처리
                                    className="w-full input input-bordered"
                                />
                                <button
                                    className="flex items-center justify-center gap-1 btn"
                                    onClick={openModal}
                                >
                                    <MagnifyingGlassIcon width={18} />
                                    <span>검색하기</span>
                                </button>
                            </div>
                            <input
                                type="text"
                                id="detailAddress"
                                placeholder="상세주소 (건물, 동, 호, 층 ...)"
                                value={detailAddress} // 주소 상태와 연결
                                onChange={(e) =>
                                    setDetailAddress(e.target.value)
                                } // 입력값을 직접 수정할 수 있도록 처리
                                className="w-full input input-bordered"
                            />
                        </div>
                    </label>
                </div>
            </form>
            {isShowModal && (
                <Modal onClose={closeModal} closeButtonVisible>
                    <div className="w-full h-full border">
                        {/* @ts-expect-error: DaumPostcode component does not have defined props in TypeScript */}
                        <DaumPostcode onComplete={handleComplete} />
                    </div>
                </Modal>
            )}
        </>
    );
}
