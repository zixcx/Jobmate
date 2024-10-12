"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { staffFormAction } from "./action";
import Input from "@/components/input";

export default function StaffForm() {
    const [gender, setGender] = useState<"M" | "F">("M"); // "M" 또는 "F"로 설정
    const [formData, setFormData] = useState({
        name: "",
        birth_year: "",
        phone: "",
        gender: "M",
    });
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const toggleGender = (selectedGender: "M" | "F") => {
        // 성별을 선택했을 때, gender 상태를 업데이트
        setGender(selectedGender);

        // formData를 업데이트
        setFormData((prevData) => ({
            ...prevData,
            gender: selectedGender, // 성별 값을 "M" 또는 "F"로 설정
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "birth_year" || name === "phone") {
            const numericValue = value.replace(/\D/g, "");
            setFormData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        const allFieldsFilled =
            formData.name !== "" &&
            formData.birth_year.length === 4 &&
            formData.phone.length >= 9;

        setIsButtonVisible(allFieldsFilled);
    }, [formData]);

    const [state, action] = useFormState(staffFormAction, null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("gender", gender);

        action(formData);
    };

    return (
        <form
            action={action}
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-center max-w-xs min-h-screen gap-8 mx-auto min-w-52"
        >
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
                    <Input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="이름을 입력해 주세요"
                        required
                        className="w-full max-w-xs input input-bordered"
                        autoComplete="off"
                        errors={state?.fieldErrors.name}
                    />
                </label>
                <label className="flex flex-col items-start justify-center w-full gap-1">
                    <span className="label-text">태어난 연도</span>
                    <Input
                        type="text"
                        name="birth_year"
                        onChange={handleChange}
                        placeholder="태어난 연도를 입력해 주세요"
                        required
                        className="w-full max-w-xs input input-bordered"
                        maxLength={4}
                        minLength={4}
                        value={formData.birth_year} // To show updated numeric value
                        autoComplete="off"
                        errors={state?.fieldErrors.birth_year}
                    />
                </label>
                <label className="flex flex-col items-start justify-center w-full gap-1">
                    <span className="label-text">전화번호</span>
                    <Input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        placeholder="전화번호를 입력해 주세요 (010xxxxxxxxx)"
                        required
                        className="w-full max-w-xs input input-bordered"
                        minLength={9}
                        maxLength={11}
                        value={formData.phone} // To show updated numeric value
                        autoComplete="off"
                        errors={state?.fieldErrors.phone}
                    />
                </label>
            </div>
            <div className="flex justify-between w-full h-12 gap-1 rounded-xl bg-neutral-200">
                <div
                    onClick={() => toggleGender("M")}
                    className={classNames(
                        "flex items-center justify-center w-48 my-1 ml-1 transition-colors cursor-pointer select-none rounded-xl",
                        gender === "M"
                            ? "shadow bg-neutral-50 text-neutral-600"
                            : "bg-transparent text-neutral-500"
                    )}
                >
                    남자
                </div>
                <div
                    onClick={() => toggleGender("F")}
                    className={classNames(
                        "flex items-center justify-center w-48 my-1 mr-1 transition-colors cursor-pointer select-none rounded-xl",
                        gender === "F"
                            ? "bg-neutral-50 shadow text-neutral-600"
                            : "text-neutral-500 bg-transparent "
                    )}
                >
                    여자
                </div>
            </div>

            {isButtonVisible && (
                <button
                    type="submit"
                    className={
                        "flex items-center justify-center h-12 px-3 py-2 mt-3 text-white transition-all bg-teal-500 rounded-lg shadow select-none w-80 md:w-full animate-slide-up"
                    }
                >
                    <span>다음</span>
                    <ChevronRightIcon width={16} className="stroke-2" />
                </button>
            )}
        </form>
    );
}
