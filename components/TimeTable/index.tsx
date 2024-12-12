"use client";

import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { useState, useEffect, useCallback, useRef } from "react";
import { EventItem } from "./EventItem";
import { EventTooltip } from "./EventTooltip";
import { Event } from "./types";
dayjs.extend(minMax);

const weekdayMapping: { [key: string]: string } = {
    SUN: "일",
    MON: "월",
    TUE: "화",
    WED: "수",
    THU: "목",
    FRI: "금",
    SAT: "토",
};

const events: Event[] = [
    {
        title: "event1",
        weekday: "SUN",
        start: dayjs().hour(10).minute(0),
        end: dayjs().hour(13).minute(0),
        subtitle: "store1",
    },
    {
        title: "event2",
        weekday: "MON",
        start: dayjs().hour(10).minute(0),
        end: dayjs().hour(13).minute(0),
        subtitle: "store1",
    },
    {
        title: "event3",
        weekday: "SUN",
        start: dayjs().hour(16).minute(0),
        end: dayjs().hour(17).minute(0),
        subtitle: "store3",
    },
    {
        title: "event4",
        weekday: "SAT",
        start: dayjs().hour(11).minute(0),
        end: dayjs().hour(22).minute(0),
        subtitle: "store4",
    },
    {
        title: "event5",
        weekday: "WED",
        start: dayjs().hour(20).minute(0),
        end: dayjs().hour(22).minute(0),
        subtitle: "store4",
    },
    {
        title: "event6",
        weekday: "FRI",
        start: dayjs().hour(18).minute(0),
        end: dayjs().hour(21).minute(0),
        subtitle: "store4",
    },
];

export default function TimeTable() {
    const start_time =
        dayjs.min(events.map((event) => event.start)) || dayjs().startOf("day");
    const end_time =
        dayjs.max(events.map((event) => event.end)) || dayjs().endOf("day");
    const table_len = end_time ? end_time.diff(start_time, "minute") : 1440;
    const [tooltipEvent, setTooltipEvent] = useState<Event | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const timetableRef = useRef<HTMLDivElement>(null);

    const updateTooltipPosition = useCallback(() => {
        if (!tooltipEvent) return;
        const eventElement = document.querySelector(
            `[data-event-id="${tooltipEvent.title}"]`
        );
        if (!eventElement) return;
        const rect = eventElement.getBoundingClientRect();
        const isLateWeekday = ["THU", "FRI", "SAT"].includes(
            tooltipEvent.weekday
        );
        const TOOLTIP_MARGIN = 10;
        const TOOLTIP_WIDTH = 150;
        const TOOLTIP_HEIGHT = 100;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let x = isLateWeekday
            ? rect.left - TOOLTIP_WIDTH - TOOLTIP_MARGIN
            : rect.right + TOOLTIP_MARGIN;
        let y = rect.top + window.scrollY;
        if (x < TOOLTIP_MARGIN) {
            x = TOOLTIP_MARGIN;
        } else if (x + TOOLTIP_WIDTH > viewportWidth - TOOLTIP_MARGIN) {
            x = viewportWidth - TOOLTIP_WIDTH - TOOLTIP_MARGIN;
        }
        if (y + TOOLTIP_HEIGHT > viewportHeight - TOOLTIP_MARGIN) {
            y = viewportHeight - TOOLTIP_HEIGHT - TOOLTIP_MARGIN;
        }
        setTooltipPosition({ x, y });
    }, [tooltipEvent]);

    useEffect(() => {
        const onScroll = () => {
            updateTooltipPosition();
        };
        const onResize = () => {
            updateTooltipPosition();
        };
        const timetableElement = timetableRef.current;
        if (timetableElement) {
            timetableElement.addEventListener("scroll", onScroll, {
                passive: true,
            });
        }
        window.addEventListener("resize", onResize);
        return () => {
            if (timetableElement) {
                timetableElement.removeEventListener("scroll", onScroll);
            }
            window.removeEventListener("resize", onResize);
        };
    }, [updateTooltipPosition]);

    const handleEventClick = (event: Event, e: React.MouseEvent) => {
        setTooltipEvent(event);
        const rect = e.currentTarget.getBoundingClientRect();
        const isLateWeekday = ["THU", "FRI", "SAT"].includes(event.weekday);
        setTooltipPosition({
            x: isLateWeekday ? rect.left - 120 : rect.right + 10,
            y: rect.top + window.scrollY,
        });
    };

    return (
        <div className="w-full" ref={timetableRef}>
            <div className="w-full h-[512px] overflow-hidden flex justify-center items-center">
                <div className="flex w-full h-full">
                    <div className="flex-1 border overflow-hidden">
                        <div className="grid w-full h-full grid-cols-7">
                            {Object.keys(weekdayMapping).map((key) => (
                                <div
                                    key={key}
                                    className="border-l first:border-l-0 h-full overflow-hidden relative"
                                >
                                    {/* 요일 헤더 제거, 주석 처리
                                    <div className="text-center bg-gray-50 py-2 font-medium">
                                        {weekdayMapping[key]}
                                    </div>
                                    */}
                                    {events
                                        .filter(
                                            (event) => event.weekday === key
                                        )
                                        .map((event, eventIndex) => (
                                            <EventItem
                                                key={eventIndex}
                                                event={event}
                                                startTime={start_time}
                                                tableLen={table_len}
                                                onClick={handleEventClick}
                                                data-event-id={event.title}
                                            />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {tooltipEvent && (
                <EventTooltip
                    event={tooltipEvent}
                    position={tooltipPosition}
                    onClose={() => setTooltipEvent(null)}
                />
            )}
        </div>
    );
}
