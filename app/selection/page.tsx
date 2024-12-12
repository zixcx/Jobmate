// ./app/selection/page.tsx
"use client";

import OwnerForm from "@/components/selectForm/owner/owner_form";
import StaffForm from "@/components/selectForm/staff/staff_form";
import {
    BuildingStorefrontIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    IdentificationIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Selection() {
    const router = useRouter();

    const [ownerOrStaff, setOwnerOrStaff] = useState("");
    const [sectionIndex, setSectionIndex] = useState(0);

    const selectStaff = () => {
        setOwnerOrStaff("staff");
    };

    const selectOwner = () => {
        setOwnerOrStaff("owner");
    };

    const goToNextSection = () => {
        if (ownerOrStaff) {
            setSectionIndex(1);
        }
    };

    const movePrevSection = () => {
        if (sectionIndex === 0) {
            router.push("/");
        } else {
            setSectionIndex(sectionIndex - 1);
        }
    };

    return (
        <>
            {sectionIndex === 0 && (
                <section
                    className={
                        "relative flex flex-col items-center justify-center w-full min-h-screen gap-5"
                    }
                >
                    <div
                        className={
                            "flex flex-col items-center justify-center w-full max-w-md gap-5 md:flex-row"
                        }
                    >
                        <div
                            onClick={selectStaff}
                            className={classNames(
                                "relative flex flex-col items-center max-w-md p-4 overflow-hidden text-center transition-all duration-300 border shadow-md cursor-pointer md:w-50 group w-80 rounded-xl hover:shadow-xl",
                                ownerOrStaff === "staff" &&
                                    "ring-4 ring-blue-400 ring-offset-2",
                                "z-10"
                            )}
                        >
                            <CheckCircleIcon
                                width={28}
                                className={classNames(
                                    "absolute top-0 right-0 transition-opacity opacity-0 fill-blue-500",
                                    ownerOrStaff === "staff" && "opacity-100"
                                )}
                            />

                            <IdentificationIcon width={64} />

                            <div>
                                <h1 className="font-semibold text-black">
                                    알바생이신가요?
                                </h1>
                                <p className="text-sm text-gray-600">
                                    알바생이라면 선택해 주세요!
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={selectOwner}
                            className={classNames(
                                "relative flex flex-col items-center max-w-md p-4 overflow-hidden text-center transition-all duration-300 border shadow-md cursor-pointer md:w-50 group w-80 rounded-xl hover:shadow-xl",
                                ownerOrStaff === "owner" &&
                                    "ring-4 ring-blue-400 ring-offset-2",
                                "z-20"
                            )}
                        >
                            <CheckCircleIcon
                                width={28}
                                className={classNames(
                                    "absolute top-0 right-0 transition-opacity opacity-0 fill-blue-500",
                                    ownerOrStaff === "owner" && "opacity-100"
                                )}
                            />

                            <BuildingStorefrontIcon width={64} />

                            <div>
                                <h1 className="font-semibold text-black">
                                    사장님이신가요?
                                </h1>
                                <p className="text-sm text-gray-600">
                                    사장님이라면 선택해 주세요!
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={goToNextSection}
                        className={classNames(
                            "flex items-center mt-5 justify-center h-12 px-3 py-2 transition-colors rounded-lg shadow select-none w-80",
                            ownerOrStaff
                                ? "bg-teal-500 text-white hover:bg-teal-600"
                                : "cursor-not-allowed bg-gray-300 text-gray-500"
                        )}
                        disabled={!ownerOrStaff}
                    >
                        <span>다음</span>
                        <ChevronRightIcon width={16} className="stroke-2" />
                    </button>
                </section>
            )}
            {sectionIndex === 1 && ownerOrStaff === "staff" && <StaffForm />}
            {sectionIndex === 1 && ownerOrStaff === "owner" && <OwnerForm />}

            <button
                onClick={movePrevSection}
                className="absolute top-0 left-0 flex items-center justify-center mt-1 ml-1 rounded-lg cursor-pointer size-10 hover:bg-neutral-200"
            >
                <ChevronLeftIcon width={32} />
            </button>
        </>
    );
}
