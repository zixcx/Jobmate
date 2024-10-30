"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import {
    STAFF_BIRTH_YEAR_MAX_VALUE,
    STAFF_BIRTH_YEAR_MIN_VALUE,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
} from "@/lib/zod_const";
import { redirect } from "next/navigation";
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
    phone: z.string({
        required_error: "전화번호를 입력해 주세요.",
    }),
    gender: z.enum(["M", "F"]),
});

export async function staffFormAction(_: unknown, formData: FormData) {
    const data = {
        name: formData.get("name"),
        birth_year: parseInt(formData.get("birth_year") as string, 10),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
    };

    const result = await staffFormSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        const userId = session.id;

        if (!userId) {
            throw new Error("사용자 ID를 찾을 수 없습니다.");
        }

        // 이미 Staff가 존재하는지 확인
        const existingStaff = await db.staff.findUnique({
            where: { userId },
        });

        if (existingStaff) {
            throw new Error("이미 알바생 정보가 존재합니다.");
        }

        // 새로운 Staff 생성
        const staff = await db.staff.create({
            data: {
                name: result.data.name,
                birth_year: result.data.birth_year,
                phone: result.data.phone,
                gender: result.data.gender,
                user: {
                    connect: { id: userId },
                },
            },
        });

        // 리디렉션 또는 성공 응답
        redirect("/staff/home");
    }
}
