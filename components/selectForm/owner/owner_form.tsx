"use client";
import {
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Modal from "../../modal/modal";
import DaumPostcode, { Address, State } from "react-daum-postcode";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { ownerFormAction } from "./action";

export default function OwnerForm() {
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        store_name: "",
        address: "",
        detail_address: "",
        phone: "",
    });
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const openModal = () => setIsShowModal(true);
    const closeModal = () => setIsShowModal(false);

    const handleComplete = (data: Address) => {
        setAddress(data.address);
        setDetailAddress(data.buildingName);

        setFormData((prevFormData) => ({
            ...prevFormData,
            address: data.address,
            detail_address: data.buildingName,
        }));

        closeModal();
    };

    const handleClose = (state: State) => {
        if (state === "FORCE_CLOSE") {
            closeModal();
        } else if (state === "COMPLETE_CLOSE") {
            closeModal();
        }
    };

    useEffect(() => {
        const allFieldsFilled =
            formData.name !== "" &&
            formData.store_name !== "" &&
            formData.address !== "" &&
            formData.detail_address !== "" &&
            formData.phone.length >= 10;

        setIsButtonVisible(allFieldsFilled);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "");
            setFormData({
                ...formData,
                [name]: numericValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const [state, action] = useFormState(ownerFormAction, null);

    return (
        <>
            <form
                action={action}
                className="flex flex-col items-start justify-center max-w-xs min-h-screen gap-8 mx-auto min-w-52"
            >
                <div>
                    <h1 className="text-2xl font-semibold">
                        어떤 멋진 가게를 운영하시나요?
                    </h1>
                    <h1 className="text-xl font-semibold">
                        정보를 입력해 주세요 👨‍💻
                    </h1>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <label className="flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">이름</span>
                        <Input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="이름을 입력해 주세요"
                            className="w-full max-w-xs input input-bordered"
                            autoComplete="off"
                            errors={state?.fieldErrors.name}
                        />
                    </label>
                    <label className="flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">상호명</span>
                        <Input
                            type="text"
                            name="store_name"
                            onChange={handleChange}
                            placeholder="상호명을 입력해 주세요"
                            className="w-full max-w-xs input input-bordered"
                            autoComplete="off"
                            errors={state?.fieldErrors.store_name}
                        />
                    </label>
                    <label className="relative flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">가게 주소</span>
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex justify-between max-w-xs gap-2">
                                <Input
                                    type="text"
                                    name="address"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        handleChange(e);
                                    }} // 입력값을 직접 수정할 수 있도록 처리
                                    placeholder="가게주소를 입력해 주세요"
                                    value={address} // 주소 상태와 연결
                                    className="w-full input input-bordered"
                                    autoComplete="off"
                                    errors={state?.fieldErrors.address}
                                />
                                <span
                                    className="flex items-center justify-center gap-1 btn"
                                    onClick={openModal}
                                >
                                    <MagnifyingGlassIcon width={18} />
                                    <span>검색하기</span>
                                </span>
                            </div>
                            <Input
                                type="text"
                                name="detail_address"
                                onChange={(e) => {
                                    setDetailAddress(e.target.value);
                                    handleChange(e);
                                }} // 입력값을 직접 수정할 수 있도록 처리
                                placeholder="상세주소 (건물, 동, 호, 층 ...)"
                                value={detailAddress} // 주소 상태와 연결
                                className="w-full input input-bordered"
                                autoComplete="off"
                                errors={state?.fieldErrors.detail_address}
                            />
                        </div>
                    </label>
                    <label className="flex flex-col items-start justify-center w-full gap-1">
                        <span className="label-text">전화번호</span>
                        <Input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            value={formData.phone}
                            placeholder="전화번호를 입력해 주세요 (010xxxxxxxxx)"
                            className="w-full max-w-xs input input-bordered"
                            autoComplete="off"
                            minLength={9}
                            maxLength={11}
                            errors={state?.fieldErrors.phone}
                        />
                    </label>
                </div>
                {isButtonVisible && (
                    <button
                        className={
                            "flex items-center justify-center h-12 px-3 py-2 mt-3 text-white transition-all bg-teal-500 rounded-lg shadow select-none w-80 md:w-full animate-slide-up"
                        }
                    >
                        <span>다음</span>
                        <ChevronRightIcon width={16} className="stroke-2" />
                    </button>
                )}
            </form>
            <Modal
                show={isShowModal} // show prop 추가
                onClose={closeModal}
                closeButtonVisible
            >
                <div className="w-full h-full">
                    <DaumPostcode
                        onComplete={handleComplete}
                        onClose={handleClose}
                    />
                </div>
            </Modal>
        </>
    );
}
