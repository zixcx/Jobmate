// ./components/TimeTable/index.tsx
// INDEX.TSX
"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Modal from "../modal/modal";
import { EventItem } from "./EventItem";
import { EventTooltip } from "./EventTooltip";
import { TimeSlots } from "./TimeSlots";
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
        store: "store1",
        bg_color: "#3b82f6",
    },
    {
        title: "event2",
        weekday: "MON",
        start: dayjs().hour(10).minute(0),
        end: dayjs().hour(13).minute(0),
        store: "store1",
        bg_color: "#C4D7FF",
    },
    {
        title: "event3",
        weekday: "SUN",
        start: dayjs().hour(16).minute(0),
        end: dayjs().hour(17).minute(0),
        store: "store3",
        bg_color: "#257180",
    },
    {
        title: "event4",
        weekday: "SAT",
        start: dayjs().hour(11).minute(0),
        end: dayjs().hour(22).minute(0),
        store: "store4",
        bg_color: "#A5B68D",
    },
    {
        title: "event5",
        weekday: "WED",
        start: dayjs().hour(20).minute(0),
        end: dayjs().hour(22).minute(0),
        store: "store4",
        bg_color: "#433878",
    },
    {
        title: "event6",
        weekday: "FRI",
        start: dayjs().hour(18).minute(0),
        end: dayjs().hour(21).minute(0),
        store: "store4",
        bg_color: "#A2D2DF",
    },
];

export default function TimeTable() {
    const start_time =
        dayjs.min(events.map((event) => event.start)) || dayjs().startOf("day");
    const end_time =
        dayjs.max(events.map((event) => event.end)) || dayjs().endOf("day");
    const table_len = end_time ? end_time.diff(start_time, "minute") : 1440;

    const [showModal, setShowModal] = useState(false);
    const [tooltipEvent, setTooltipEvent] = useState<Event | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const timetableRef = useRef<HTMLDivElement>(null);

    const timeSlots = useMemo(() => {
        const slots = [];
        let currentTime = start_time.clone();
        while (currentTime.isBefore(end_time) || currentTime.isSame(end_time)) {
            slots.push(currentTime.format("HH:mm"));
            currentTime = currentTime.add(1, "hour");
        }
        return slots;
    }, [start_time, end_time]);

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

        // Ensure the tooltip doesn't go off-screen
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

        // Cleanup listeners on unmount
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
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    width="450px"
                    height="650px"
                    closeButtonVisible
                />
            )}
            <div className="w-full flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">시간표</span>
                <button
                    onClick={() => setShowModal(true)}
                    className="p-2 hover:bg-neutral-100 rounded-lg active:bg-neutral-200 transition-colors"
                >
                    <PlusIcon width={20} style={{ strokeWidth: "1.75" }} />
                </button>
            </div>
            <div className="w-full max-w-md h-[512px] overflow-hidden flex justify-center items-center">
                <div className="flex w-full h-full max-w-md">
                    <TimeSlots
                        slots={timeSlots}
                        slotsLength={timeSlots.length}
                    />
                    <div className="flex-1 border rounded-lg overflow-hidden">
                        <div className="grid w-full h-full grid-cols-7">
                            {Object.keys(weekdayMapping).map((key) => (
                                <div
                                    key={key}
                                    className="grid grid-rows-[auto,1fr] divide-y divide-gray-200 border-l first:border-l-0 h-full overflow-hidden"
                                >
                                    <div className="text-center bg-gray-50 py-2 font-medium">
                                        {weekdayMapping[key]}
                                    </div>
                                    <div className="relative h-full">
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
