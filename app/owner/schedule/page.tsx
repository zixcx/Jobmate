// ./app/owner/schedule/page.tsx

import StaffScheduleCalendar from "@/components/StaffScheduleCalendar";
import dayjs from "dayjs";
import { Metadata } from "next";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);
dayjs.locale("ko"); // 전역으로 한국어 로케일 설정

export const metadata: Metadata = {
    title: "잡메이트 | 사장님 페이지",
    description: "직원들의 스케줄을 확인 및 관리하는 페이지",
};

export default async function OwnerSchedule() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">주간 일정</h1>
            <div className="box bg-white">
                <StaffScheduleCalendar />
            </div>
        </div>
    );
}
