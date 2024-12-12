// ./components/StaffScheduleCalendar/index.tsx
"use client";
import { useState } from "react";
import StaffScheduleCalendarBody from "./Body";
import StaffScheduleCalendarHeader from "./Header";
import { Event, Staff } from "./types";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

// 임시 샘플 데이터
const sampleStaffs: Staff[] = [
    {
        id: "s1",
        name: "직원A",
        role: "매니저",
        avatarUrl: "/placeholder.svg",
    },
    {
        id: "s2",
        name: "직원B",
        role: "알바",
        avatarUrl: "/placeholder.svg",
    },
    {
        id: "s3",
        name: "직원C",
        role: "알바",
        avatarUrl: "/placeholder.svg",
    },
];

const sampleEvents: Event[] = [
    {
        id: "e1",
        staffId: "s1",
        title: "event1",
        weekday: "SUN",
        start: dayjs().hour(10).minute(0),
        end: dayjs().hour(13).minute(0),
        subtitle: "store1",
    },
    {
        id: "e2",
        staffId: "s1",
        title: "event2",
        weekday: "THU",
        start: dayjs().hour(9).minute(0),
        end: dayjs().hour(12).minute(0),
        subtitle: "store2",
    },
    {
        id: "e3",
        staffId: "s2",
        title: "event3",
        weekday: "FRI",
        start: dayjs().hour(17).minute(0),
        end: dayjs().hour(21).minute(0),
        subtitle: "store3",
    },
    {
        id: "e4",
        staffId: "s2",
        title: "event4",
        weekday: "TUE",
        start: dayjs().hour(13).minute(0),
        end: dayjs().hour(17).minute(0),
        subtitle: "store4",
    },
    {
        id: "e5",
        staffId: "s2",
        title: "event5",
        weekday: "WED",
        start: dayjs().hour(12).minute(0),
        end: dayjs().hour(13).minute(0),
        subtitle: "store",
    },
    {
        id: "e6",
        staffId: "s3",
        title: "event5",
        weekday: "WED",
        start: dayjs().hour(12).minute(0),
        end: dayjs().hour(13).minute(0),
        subtitle: "store",
    },
];

export default function StaffScheduleCalendar() {
    const [currentWeek, setCurrentWeek] = useState(dayjs().week()); // 현재 주차
    const minWidth = 200; // 최소 너비
    const maxWidth = 500; // 최대 너비
    const initialWidth = minWidth + (maxWidth - minWidth) * 0.3; // 초기 너비를 30% 지점으로 설정
    const [staffCardWidth, setStaffCardWidth] = useState(initialWidth);

    return (
        <div className="flex flex-col gap-4 overflow-hidden">
            <StaffScheduleCalendarHeader
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
                staffCardWidth={staffCardWidth}
                setStaffCardWidth={setStaffCardWidth}
            />
            <StaffScheduleCalendarBody
                staffs={sampleStaffs}
                events={sampleEvents}
                currentWeek={currentWeek}
                staffCardWidth={staffCardWidth}
            />
        </div>
    );
}
