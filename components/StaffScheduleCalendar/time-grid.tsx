// components/StaffScheduleCalendar/time-grid.tsx
"use client";

import * as React from "react";

import { type TimeGridProps } from "./types";
import { StaffColumn } from "./staff-column";

export function TimeGrid({
    staff,
    events,
    currentDate,
    resourceWidth,
}: TimeGridProps) {
    // 9AM(9) ~ 11PM(23): 총 15시간
    const timeSlots = Array.from({ length: 15 }, (_, i) => i + 9);
    // 총 높이: 상단 staff 헤더(5rem) + 15시간 * 5rem = 80rem
    const totalHeight = 80; // rem 단위

    return (
        <div
            className="w-full"
            style={{
                height: `${totalHeight}rem`,
                overflow: "hidden",
            }}
        >
            <div className="flex">
                <div className="flex-none border-r">
                    <div className="h-20 border-b w-full" />
                    <div className="w-16">
                        {timeSlots.map((hour) => (
                            <div
                                key={hour}
                                className="flex h-20 items-center justify-end border-b px-2 text-sm text-gray-500"
                            >
                                {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 모바일 뷰: 첫번째 staff만 */}
                <div className="block md:hidden flex-1">
                    <StaffColumn
                        staff={staff[0]}
                        events={events.filter((e) => e.staffId === staff[0].id)}
                        date={currentDate}
                        width={0}
                    />
                </div>

                {/* 데스크톱 뷰: 모든 staff 가로배치 + overflow-x-auto */}
                <div className="hidden md:flex md:flex-row md:flex-nowrap flex-1 overflow-x-auto">
                    {staff.map((person) => (
                        <div
                            key={person.id}
                            style={{ width: `${resourceWidth}px` }}
                            className="flex-none"
                        >
                            <StaffColumn
                                staff={person}
                                events={events.filter(
                                    (e) => e.staffId === person.id
                                )}
                                date={currentDate}
                                width={resourceWidth}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
