"use server";

import { krPhoneValidation } from "@/lib/validation";
import {
    STAFF_BIRTH_YEAR_MAX_VALUE,
    STAFF_BIRTH_YEAR_MIN_VALUE,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
} from "@/lib/zod_const";
import { z } from "zod";

// 정규식: 한글만, 공백 허용
const koreanOnlyRegex = /^[가-힣\s]+$/;

// 정규식: 공백 불가
const noWhitespaceRegex = /^\S+$/;

const checkNameRegex = (name: string) =>
    koreanOnlyRegex.test(name) && noWhitespaceRegex.test(name);

const staffFormSchema = z.object({
    name: z
        .string({
            required_error: "이름을 입력해 주세요.",
        })
        .min(NAME_MIN_LENGTH, "올바른 이름을 입력해 주세요.")
        .max(NAME_MAX_LENGTH, "올바른 이름을 입력해 주세요.")
        .refine(checkNameRegex, "올바른 이름을 입력해 주세요."),
    birth_year: z.coerce
        .number({
            required_error: "태어난 연도를 입력해 주세요.",
        })
        .min(STAFF_BIRTH_YEAR_MIN_VALUE, "정확한 연도를 입력해 주세요.")
        .max(STAFF_BIRTH_YEAR_MAX_VALUE, "정확한 연도를 입력해 주세요."),
    phone: z
        .string({
            required_error: "전화번호를 입력해 주세요.",
        })
        .trim()
        .refine(krPhoneValidation, "잘못된 전화번호 형식입니다."),
});

export async function staffFormAction(_: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        birth_year: formData.get("birth_year"),
        phone: formData.get("phone"),
        gender: formData.get("gender") ? "M" : "F",
    };
    // console.log(data);
    const result = await staffFormSchema.safeParseAsync(data);
    if (!result.success) {
        return result.error.flatten();
    }
}
