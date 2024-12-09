"use client";

import * as React from "react";
import { type StaffColumnProps } from "./types";
import dayjs from "dayjs";
import Image from "next/image";

export function StaffColumn({ staff, events, width }: StaffColumnProps) {
    const endOfDay = dayjs().hour(23).minute(0).second(0);

    const getEventStyle = (start: string, end: string) => {
        const startTime = dayjs(start);
        let endTime = dayjs(end);
        if (endTime.isAfter(endOfDay)) {
            endTime = endOfDay;
        }

        const startMinutes =
            startTime.hour() * 60 + startTime.minute() - 9 * 60;
        const duration = endTime.diff(startTime, "minute");

        return {
            top: `${(startMinutes / 60) * 5}rem`,
            height: `${(duration / 60) * 5}rem`,
            width: width > 0 ? `${width - 1}px` : "100%", // width=0이면 모바일 뷰로 판단하고 w-full
        };
    };

    return (
        <div
            className="flex-none border-r"
            style={width > 0 ? { width: `${width}px` } : {}}
        >
            <div className="flex h-20 items-center gap-3 border-b p-4">
                <Image
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-10 w-10 rounded-full"
                />
                <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-sm text-gray-500">{staff.role}</div>
                </div>
            </div>
            <div className="relative">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="absolute left-0 overflow-hidden rounded border bg-blue-100 p-2 text-sm"
                        style={getEventStyle(event.start, event.end)}
                    >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-gray-500">
                            {dayjs(event.start).format("h:mm A")} -{" "}
                            {dayjs(event.end).format("h:mm A")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
