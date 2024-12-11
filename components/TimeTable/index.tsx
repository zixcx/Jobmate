// ./components/TimeTable/index.tsx
"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { useState, useEffect, useCallback, useRef } from "react";
import { EventItem } from "./EventItem";
import { EventTooltip } from "./EventTooltip";
import { Event } from "./types";

dayjs.extend(minMax);

interface TimeTableProps {
    events: Event[];
}

export default function TimeTable({ events }: TimeTableProps) {
    const start_time =
        events.length > 0
            ? dayjs.min(events.map((event) => event.start)) ||
              dayjs().startOf("day")
            : dayjs().startOf("day");
    const end_time =
        events.length > 0
            ? dayjs.max(events.map((event) => event.end)) ||
              dayjs().endOf("day")
            : dayjs().endOf("day");
    const table_len = end_time.diff(start_time, "minute");

    const [tooltipEvent, setTooltipEvent] = useState<Event | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const timetableRef = useRef<HTMLDivElement>(null);

    const updateTooltipPosition = useCallback(() => {
        if (!tooltipEvent || !timetableRef.current) return;

        const eventElement = document.querySelector(
            `[data-event-id="${tooltipEvent.title}"]`
        );
        if (!eventElement) return;

        const rect = eventElement.getBoundingClientRect();
        const timetableRect = timetableRef.current.getBoundingClientRect(); // Get TimeTable container rect
        const isLateWeekday = ["THU", "FRI", "SAT"].includes(
            tooltipEvent.weekday
        );

        const TOOLTIP_MARGIN = 10;
        const TOOLTIP_WIDTH = 150;
        const TOOLTIP_HEIGHT = 100;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate position relative to the TimeTable container
        let x = isLateWeekday
            ? rect.left - timetableRect.left - TOOLTIP_WIDTH - TOOLTIP_MARGIN
            : rect.right - timetableRect.left + TOOLTIP_MARGIN;
        let y = rect.top - timetableRect.top;

        // Ensure the tooltip doesn't go off-screen within the TimeTable container
        if (x < TOOLTIP_MARGIN) {
            x = TOOLTIP_MARGIN;
        } else if (x + TOOLTIP_WIDTH > timetableRect.width - TOOLTIP_MARGIN) {
            x = timetableRect.width - TOOLTIP_WIDTH - TOOLTIP_MARGIN;
        }

        if (y + TOOLTIP_HEIGHT > timetableRect.height - TOOLTIP_MARGIN) {
            y = timetableRect.height - TOOLTIP_HEIGHT - TOOLTIP_MARGIN;
        }

        setTooltipPosition({ x, y });
    }, [tooltipEvent, timetableRef]);

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
            window.addEventListener("scroll", onScroll, { passive: true }); // Add window scroll listener
        }
        window.addEventListener("resize", onResize);

        return () => {
            if (timetableElement) {
                timetableElement.removeEventListener("scroll", onScroll);
                window.removeEventListener("scroll", onScroll); // Remove window scroll listener
            }
            window.removeEventListener("resize", onResize);
        };
    }, [updateTooltipPosition]);

    const handleEventClick = useCallback(
        (event: Event, e: React.MouseEvent) => {
            e.stopPropagation(); // Prevent event bubbling
            setTooltipEvent(event);
            updateTooltipPosition();
        },
        [updateTooltipPosition]
    );

    const handleContainerClick = useCallback(() => {
        setTooltipEvent(null); // Hide tooltip when clicking outside of events
    }, []);

    return (
        <div
            className="w-full"
            ref={timetableRef}
            onClick={handleContainerClick}
        >
            <div className="w-full max-w-md h-[512px] overflow-auto flex justify-center items-center">
                <div className="flex w-full h-full max-w-md relative">
                    {" "}
                    {/* Changed */}
                    <div className="flex-1 border rounded-lg overflow-hidden relative">
                        {" "}
                        {/* Changed */}
                        <div className="grid w-full h-full grid-cols-7">
                            {" "}
                            {/* Changed */}
                            {Array(7)
                                .fill(null)
                                .map((_, index) => {
                                    const day = [
                                        "SUN",
                                        "MON",
                                        "TUE",
                                        "WED",
                                        "THU",
                                        "FRI",
                                        "SAT",
                                    ][index];
                                    return (
                                        <div
                                            key={day}
                                            className="border-l first:border-l-0 h-full"
                                        >
                                            <div className="relative h-full">
                                                {events
                                                    .filter(
                                                        (event) =>
                                                            event.weekday ===
                                                            day
                                                    )
                                                    .map(
                                                        (event, eventIndex) => (
                                                            <EventItem
                                                                key={eventIndex}
                                                                event={event}
                                                                startTime={
                                                                    start_time
                                                                }
                                                                tableLen={
                                                                    table_len
                                                                }
                                                                onClick={
                                                                    handleEventClick
                                                                }
                                                                data-event-id={
                                                                    event.title
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            {tooltipEvent && (
                <div style={{ position: "relative" }}>
                    <EventTooltip
                        event={tooltipEvent}
                        position={tooltipPosition}
                        onClose={() => setTooltipEvent(null)}
                    />
                </div>
            )}
        </div>
    );
}
