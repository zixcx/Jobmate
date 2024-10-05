"use client";

import {
    BuildingStorefrontIcon,
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    IdentificationIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState, useEffect } from "react";

export default function Home() {
    const [ownerOrStaff, setOwnerOrStaff] = useState("");
    const [sectionIndex, setSectionIndex] = useState(0);
    const [rememberChoice, setRememberChoice] = useState(true); // 선택 항목 기억하기 상태

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

    const goToNextSection = () => {
        if (ownerOrStaff) {
            setSectionIndex(sectionIndex + 1);
        }
    };

    const handleRememberChoice = () => {
        setRememberChoice(!rememberChoice);
        if (!rememberChoice) {
            localStorage.removeItem("ownerOrStaff"); // 선택 항목 기억하기를 해제할 경우 저장된 항목 삭제
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
                            onClick={goToNextSection}
                            className={classNames(
                                "w-80 h-12 px-3 py-2 md:w-full rounded-lg flex justify-center items-center shadow select-none transition-colors",
                                ownerOrStaff
                                    ? "bg-teal-500 text-white hover:bg-teal-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            <span>다음</span>
                            <ChevronRightIcon width={16} className="stroke-2" />
                        </button>
                    </div>
                </section>
            )}

            {sectionIndex === 1 && (
                <section className="flex flex-col gap-5 min-h-screen items-center justify-center w-full">
                    {/* 다음 섹션의 내용 */}
                    <h1 className="text-2xl font-semibold">다음 섹션</h1>
                    <p>여기에 다음 섹션의 내용 추가하기</p>
                </section>
            )}

            <button
                onClick={() => setSectionIndex(0)}
                className="absolute flex items-center justify-center top-0 left-0 size-10 hover:bg-neutral-200 mt-1 ml-1 rounded-lg cursor-pointer"
            >
                <ChevronLeftIcon width={32} />
            </button>
        </>
    );
}
