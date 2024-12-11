// ./components/TimeTable/EventItem.tsx
"use client";

import { getContrastYIQ } from "@/lib/textColor";
import { Event } from "./types";
import dayjs from "dayjs";

interface EventItemProps {
    event: Event;
    startTime: dayjs.Dayjs;
    tableLen: number;
    onClick: (event: Event, e: React.MouseEvent) => void;
}

export function EventItem({
    event,
    startTime,
    tableLen,
    onClick,
}: EventItemProps) {
    const duration = event.end.diff(event.start, "minute");
    const isShortEvent = duration <= 60;

    return (
        <div
            className={`absolute left-0 right-0 flex flex-col items-center justify-start p-1 text-xs rounded-md shadow-sm transition-all overflow-hidden cursor-pointer bg-blue-100 text-gray-800
                ${isShortEvent ? "hover:shadow-md" : ""}`}
            style={{
                top: `${
                    (event.start.diff(startTime, "minute") / tableLen) * 100
                }%`,
                height: `${(duration / tableLen) * 100}%`,
            }}
            onClick={(e) => onClick(event, e)}
        >
            <span className="font-medium truncate w-full text-center">
                {event.title}
            </span>
            <span
                className={`flex flex-col items-start justify-center text-[10px] w-full
                ${isShortEvent ? "hidden" : ""}`}
            >
                <span className="w-full text-center">
                    {event.start.format("HH:mm")}
                </span>
                <span className="w-full text-center">
                    {event.end.format("HH:mm")}
                </span>
            </span>
        </div>
    );
}
