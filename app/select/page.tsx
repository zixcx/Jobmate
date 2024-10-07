"use client";

import {
    BuildingStorefrontIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    IdentificationIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

declare global {
    interface Window {
        daum: any;
    }
}

export default function Select() {
    const router = useRouter();
    const [ownerOrStaff, setOwnerOrStaff] = useState("");
    const [sectionIndex, setSectionIndex] = useState(0); // 섹션 인덱스 상태 추가
    const [rememberChoice, setRememberChoice] = useState(true); // 선택 항목 기억하기 상태
    const [address, setAddress] = useState(""); // 주소 상태 추가

    // Daum 우편번호 API 스크립트 추가
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 선택 항목 기억하기를 위해 localStorage에서 값 불러오기
    useEffect(() => {
        const savedChoice = localStorage.getItem("ownerOrStaff");
        if (savedChoice) {
            setOwnerOrStaff(savedChoice);
        }
    }, []);

    // 선택 항목 저장
    useEffect(() => {
        if (rememberChoice && ownerOrStaff) {
            localStorage.setItem("ownerOrStaff", ownerOrStaff);
        }
    }, [ownerOrStaff, rememberChoice]);

    const selectStaff = () => {
        setOwnerOrStaff("staff");
    };

    const selectOwner = () => {
        setOwnerOrStaff("owner");
    };

    const handleRememberChoice = () => {
        setRememberChoice(!rememberChoice);
        if (!rememberChoice) {
            localStorage.removeItem("ownerOrStaff"); // 선택 항목 기억하기를 해제할 경우 저장된 항목 삭제
        }
    };

    const goToNextSection = () => {
        if (ownerOrStaff) {
            setSectionIndex(1); // 섹션 인덱스 상태를 1로 변경하여 다음 섹션으로 이동
        }
    };

    const movePrevSection = () => {
        if (sectionIndex === 0) {
            router.push("/");
        } else {
            setSectionIndex(sectionIndex - 1);
        }
    };

    const handlePostcodeSearch = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    const address = data.roadAddress
                        ? data.roadAddress
                        : data.jibunAddress;
                    setAddress(address);
                },
            }).open();
        } else {
            console.error("Daum Postcode API가 로드되지 않았습니다.");
        }
    };

    return (
        <>
            {sectionIndex === 0 && (
                <section
                    className={
                        "flex flex-col gap-5 min-h-screen relative items-center justify-center w-full"
                    }
                >
                    <div
                        className={classNames(
                            "flex flex-col md:flex-row items-center justify-center w-full max-w-md gap-5"
                        )}
                    >
                        <div
                            onClick={selectStaff}
                            className={classNames(
                                "md:w-50 rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-md hover:shadow-xl transition-all duration-300 shadow-md border cursor-pointer w-80",
                                ownerOrStaff === "staff" &&
                                    "ring-4 ring-blue-400 ring-offset-2",
                                "z-10"
                            )}
                        >
                            <CheckCircleIcon
                                width={28}
                                className={classNames(
                                    ownerOrStaff === "staff" && "opacity-100",
                                    "absolute top-0 right-0 opacity-0 fill-blue-500 transition-opacity"
                                )}
                            />

                            <IdentificationIcon width={64} />

                            <div>
                                <h1 className="font-semibold text-black">
                                    알바생이신가요?
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    알바생이라면 선택해 주세요!
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={selectOwner}
                            className={classNames(
                                "md:w-50 rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-md hover:shadow-xl transition-all duration-300 shadow-md border cursor-pointer w-80",
                                ownerOrStaff === "owner" &&
                                    "ring-4 ring-blue-400 ring-offset-2",
                                "z-20"
                            )}
                        >
                            <CheckCircleIcon
                                width={28}
                                className={classNames(
                                    ownerOrStaff === "owner" && "opacity-100",
                                    "absolute top-0 right-0 opacity-0 fill-blue-500 transition-opacity"
                                )}
                            />

                            <BuildingStorefrontIcon width={64} />

                            <div>
                                <h1 className="font-semibold text-black">
                                    사장님이신가요?
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    사장님이라면 선택해 주세요!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-80 md:w-full flex flex-col items-center justify-center max-w-md">
                        <label className="label cursor-pointer flex gap-1 self-start">
                            <input
                                type="checkbox"
                                checked={rememberChoice}
                                onChange={handleRememberChoice}
                                className="checkbox checkbox-sm"
                            />
                            <span className="label-text">
                                선택 항목 기억하기
                            </span>
                        </label>

                        <button
                            onClick={goToNextSection} // 선택 후 다음 섹션으로 이동
                            className={classNames(
                                "w-80 h-12 px-3 py-2 md:w-full rounded-lg flex justify-center items-center shadow select-none transition-colors",
                                ownerOrStaff
                                    ? "bg-teal-500 text-white hover:bg-teal-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            )}
                            disabled={!ownerOrStaff} // 선택이 없으면 비활성화
                        >
                            <span>다음</span>
                            <ChevronRightIcon width={16} className="stroke-2" />
                        </button>
                    </div>
                </section>
            )}

            {sectionIndex === 1 && ownerOrStaff === "staff" && (
                <section className="flex flex-col gap-8 min-h-screen items-start justify-center min-w-52 mx-24">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            멋진 일을 찾으셨나요?
                        </h1>
                        <h1 className="text-xl font-semibold">
                            정보를 입력해 주세요 👨‍💻
                        </h1>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <label className="flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">이름</span>
                            <input
                                type="text"
                                placeholder="이름을 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">상호명</span>
                            <input
                                type="text"
                                placeholder="상호명을 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="relative flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">가게 주소</span>
                            <div className="w-full flex gap-1 justify-between">
                                <input
                                    type="text"
                                    placeholder="가게 주소를 입력해 주세요"
                                    value={address} // 주소 상태와 연결
                                    onChange={(e) => setAddress(e.target.value)} // 입력값을 직접 수정할 수 있도록 처리
                                    className="input input-bordered w-full max-w-xs"
                                />
                                <button
                                    onClick={handlePostcodeSearch}
                                    className="size-12 min-w-12 min-h-12 max-w-12 max-h-12 p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-color shadow border flex items-center justify-center aspect-square"
                                >
                                    <MagnifyingGlassIcon width={24} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="상세주소를 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <button
                            className="btn"
                            onClick={() => {
                                const modal = document.getElementById(
                                    "postcodeSearchModal"
                                ) as HTMLDialogElement;
                                modal.showModal();
                            }}
                        >
                            open modal
                        </button>
                        <dialog id="postcodeSearchModal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">
                                    Press ESC key or click outside to close
                                </p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                                <button className="absolute top-0 right-0 m-1 p-1 cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg">
                                    <XMarkIcon
                                        width={32}
                                        className="fill-neutral-100"
                                    />
                                </button>
                            </form>
                        </dialog>
                    </div>
                </section>
            )}

            {sectionIndex === 1 && ownerOrStaff === "owner" && (
                <section className="flex flex-col gap-8 min-h-screen items-start justify-center min-w-52 mx-24">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            어떤 멋진 일을 하시나요?
                        </h1>
                        <h1 className="text-xl font-semibold">
                            정보를 입력해 주세요 👨‍💻
                        </h1>
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <label className="flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">이름</span>
                            <input
                                type="text"
                                placeholder="이름을 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">상호명</span>
                            <input
                                type="text"
                                placeholder="상호명을 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="relative flex flex-col w-full justify-center items-start gap-1">
                            <span className="label-text">가게 주소</span>
                            <div className="w-full flex gap-1 justify-between">
                                <input
                                    type="text"
                                    placeholder="가게 주소를 입력해 주세요"
                                    value={address} // 주소 상태와 연결
                                    onChange={(e) => setAddress(e.target.value)} // 입력값을 직접 수정할 수 있도록 처리
                                    className="input input-bordered w-full max-w-xs"
                                />
                                <button
                                    onClick={handlePostcodeSearch}
                                    className="size-12 min-w-12 min-h-12 max-w-12 max-h-12 p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-color shadow border flex items-center justify-center aspect-square"
                                >
                                    <MagnifyingGlassIcon width={24} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="상세주소를 입력해 주세요"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <button
                            className="btn"
                            onClick={() => {
                                const modal = document.getElementById(
                                    "postcodeSearchModal"
                                ) as HTMLDialogElement;
                                modal.showModal();
                            }}
                        >
                            open modal
                        </button>
                        <dialog id="postcodeSearchModal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">
                                    Press ESC key or click outside to close
                                </p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                                <button className="absolute top-0 right-0 m-1 p-1 cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg">
                                    <XMarkIcon
                                        width={32}
                                        className="fill-neutral-100"
                                    />
                                </button>
                            </form>
                        </dialog>
                    </div>
                </section>
            )}

            <button
                onClick={movePrevSection}
                className="absolute flex items-center justify-center top-0 left-0 size-10 hover:bg-neutral-200 mt-1 ml-1 rounded-lg cursor-pointer"
            >
                <ChevronLeftIcon width={32} />
            </button>
        </>
    );
}
