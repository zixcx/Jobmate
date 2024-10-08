"use client";

import classNames from "classnames";
import { useState } from "react";

export default function StaffForm() {
    const [gender, setGender] = useState(true);

    const toggleGender = (selectedGender: boolean) => {
        if (gender !== selectedGender) {
            setGender(selectedGender);
        }
    };

    return (
        <form className="flex flex-col items-start justify-center max-w-xs min-h-screen gap-8 mx-24 mx-auto min-w-52">
            <div>
                <h1 className="text-2xl font-semibold">
                    멋진 일을 찾으셨나요?
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
                    <span className="label-text">나이</span>
                    <input
                        type="number"
                        placeholder="나이를 입력해 주세요"
                        className="w-full max-w-xs input input-bordered"
                        min={10}
                        max={200}
                        maxLength={3}
                    />
                </label>
            </div>
            <div className="flex justify-between w-full h-12 gap-1 rounded-xl bg-neutral-200">
                <div
                    onClick={() => toggleGender(true)}
                    className={classNames(
                        "flex items-center justify-center w-48 my-1 ml-1 transition-colors cursor-pointer select-none rounded-xl",
                        gender
                            ? "shadow bg-neutral-50 text-neutral-600"
                            : "bg-transparent text-neutral-500"
                    )}
                >
                    남자
                </div>
                <div
                    onClick={() => toggleGender(false)}
                    className={classNames(
                        "flex items-center justify-center w-48 my-1 mr-1 transition-colors cursor-pointer select-none rounded-xl",
                        !gender
                            ? "bg-neutral-50 shadow text-neutral-600"
                            : "text-neutral-500 bg-transparent "
                    )}
                >
                    여자
                </div>
            </div>
        </form>
    );
}
