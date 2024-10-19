"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { krPhoneValidation } from "@/lib/validation";
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    OWNER_STORE_ADDRESS_MAX_LENGTH,
    OWNER_STORE_ADDRESS_MIN_LENGTH,
    OWNER_STORE_DETAIL_ADDRESS_MAX_LENGTH,
    OWNER_STORE_NAME_MAX_LENGTH,
    OWNER_STORE_NAME_MIN_LENGTH,
} from "@/lib/zod_const";
import { redirect } from "next/navigation";
import { z } from "zod";

// 정규식: 한글만, 공백 허용
const koreanOnlyRegex = /^[가-힣\s]+$/;

// 정규식: 특수문자 제외, 공백 허용
const noSpecialCharRegex = /^[a-zA-Z가-힣0-9\s]+$/;

// 정규식: 공백 불가
const noWhitespaceRegex = /^\S+$/;

// 정규식: 한글, 공백, 숫자만 허용
const addrRegex = /^[가-힣0-9\s]+$/;

// 정규식: 한글, 영어, 공백, 숫자, 콤마, 괄호만 허용
const detailAddrRegex = /^[가-힣a-zA-Z0-9\s,()]+$/;

const checkNameRegex = (name: string) =>
    koreanOnlyRegex.test(name) && noWhitespaceRegex.test(name);

const checkStoreNameRegex = (name: string) => noSpecialCharRegex.test(name);

const checkAddrRegex = (address: string) => addrRegex.test(address);

const checkDetailAddrRegex = (detailAddress: string) =>
    detailAddrRegex.test(detailAddress);

const ownerFormSchema = z.object({
    name: z
        .string({
            required_error: "이름을 입력해 주세요.",
        })
        .min(NAME_MIN_LENGTH, "올바른 이름을 입력해 주세요.")
        .max(NAME_MAX_LENGTH, "올바른 이름을 입력해 주세요.")
        .refine(checkNameRegex, "이름은 한글만 가능합니다."),

    store_name: z
        .string({
            required_error: "상호명을 입력해 주세요.",
        })
        .trim()
        .min(OWNER_STORE_NAME_MIN_LENGTH, "올바른 상호명을 입력해 주세요.")
        .max(OWNER_STORE_NAME_MAX_LENGTH, "올바른 상호명을 입력해 주세요.")
        .refine(checkStoreNameRegex, "특수문자는 사용할 수 없습니다."),

    address: z
        .string({
            required_error: "가게주소를 입력해 주세요.",
        })
        .trim()
        .min(OWNER_STORE_ADDRESS_MIN_LENGTH, "올바른 가게주소를 입력해 주세요.")
        .max(OWNER_STORE_ADDRESS_MAX_LENGTH, "올바른 가게주소를 입력해 주세요.")
        .refine(
            (address) => address.trim().length > 0,
            "가게주소는 공백만 입력될 수 없습니다."
        )
        .refine(checkAddrRegex, "한글만 입력 가능합니다."),

    detail_address: z
        .string({
            required_error: "상세주소를 입력해 주세요.",
        })
        .trim()
        .max(
            OWNER_STORE_DETAIL_ADDRESS_MAX_LENGTH,
            "올바른 상세주소를 입력해 주세요."
        )
        .refine(
            (detail_address) => detail_address.trim().length > 0,
            "상세주소는 공백만 입력될 수 없습니다."
        )
        .refine(checkDetailAddrRegex, "특수문자는 사용할 수 없습니다."),

    phone: z
        .string({
            required_error: "전화번호를 입력해 주세요.",
        })
        .trim()
        .refine(krPhoneValidation, "잘못된 전화번호 형식입니다."),
});

export async function ownerFormAction(_: unknown, formData: FormData) {
    const data = {
        name: formData.get("name"),
        store_name: formData.get("store_name"),
        address: formData.get("address"),
        detail_address: formData.get("detail_address"),
        phone: formData.get("phone"),
    };

    // 1. 스키마 검증
    const result = await ownerFormSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        // 2. 세션에서 현재 사용자의 ID 가져오기
        const session = await getSession();
        const userId = session.id;

        if (!userId) {
            throw new Error("사용자 ID를 찾을 수 없습니다.");
        }

        const store_tag = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");

        const password = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");

        // 3. owner 생성
        const user = await db.owner.create({
            data: {
                name: result.data.name,
                store_name: result.data.store_name,
                address: result.data.address,
                detail_address: result.data.detail_address,
                phone: result.data.phone,
                store_tag,
                password,
                user: {
                    connect: { id: userId },
                },
            },
            select: {
                id: true,
            },
        });

        // 4. 리디렉션
        redirect("/owner/home");
    }
}
