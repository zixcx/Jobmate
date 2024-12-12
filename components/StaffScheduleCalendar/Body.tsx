// ./components/StaffScheduleCalendar/Body.tsx
"use client";

import dayjs from "dayjs";
import StaffCard from "./StaffCard";
import { Event, Staff } from "./types";
import { useMemo } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface StaffScheduleCalendarBodyProps {
    staffs: Staff[];
    events: Event[];
    currentWeek: number;
    staffCardWidth: number;
}

export default function StaffScheduleCalendarBody({
    staffs,
    events,
    currentWeek,
    staffCardWidth,
}: StaffScheduleCalendarBodyProps) {
    const earliestTime = dayjs().hour(9).minute(0);
    const latestTime = dayjs().hour(21).minute(0);

    const totalHours = latestTime.diff(earliestTime, "hour");

    const totalHeight = 512;
    const eventHeight = totalHeight / totalHours;

    const startOfWeek = dayjs().week(currentWeek).startOf("week"); // 현재 주차의 시작 날짜 (일요일)
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            // 현재 주차의 날짜 범위에 해당하는 이벤트 필터링
            const eventStart = event.start;
            return (
                eventStart.isSameOrAfter(startOfWeek, "day") &&
                eventStart.isSameOrBefore(startOfWeek.add(6, "day"), "day")
            );
        });
    }, [events, currentWeek]);

    return (
        <div className="border border-gray-300 rounded-lg flex overflow-hidden">
            <div className="flex flex-col w-16 h-full border-r border-gray-300">
                <div className="w-16 h-[72px] border-b border-gray-300 box-border" />
                <div className="w-16 h-[80px]" />
                {Array.from({ length: totalHours }, (_, i) => {
                    const currentTime = earliestTime.add(i, "hour");
                    return (
                        <div
                            key={currentTime.toString()}
                            className="box-border flex justify-end items-start px-1 relative"
                            style={{
                                height: `${eventHeight}px`,
                            }}
                        >
                            <span className="absolute -top-[8px] text-xs">
                                {currentTime.format("HH:mm")}
                            </span>
                        </div>
                    );
                })}
                <div
                    className="box-border flex justify-end items-start px-1 relative"
                    style={{
                        height: "1rem",
                    }}
                >
                    <span className="absolute -top-[8px] text-xs">
                        {latestTime.format("HH:mm")}
                    </span>
                </div>
            </div>

            <div className="flex justify-start items-center w-full gap-0.5 overflow-x-scroll">
                {staffs.map((staff) => (
                    <StaffCard
                        key={staff.id}
                        staff={staff}
                        events={filteredEvents.filter(
                            (event) => event.staffId === staff.id
                        )}
                        currentWeek={currentWeek}
                        staffCardWidth={staffCardWidth}
                    />
                ))}
            </div>
        </div>
    );
}
