// components/StaffScheduleCalendar/index.tsx
"use client";

import * as React from "react";
import dayjs from "dayjs";
import { type CalendarProps, type ViewMode } from "./types";
import { Header } from "./header";
import { TimeGrid } from "./time-grid";

export function StaffScheduleCalendar({
    staff,
    events,
    initialDate = new Date(),
    initialView = "week",
}: CalendarProps) {
    const [currentDate, setCurrentDate] = React.useState(dayjs(initialDate));
    const [view, setView] = React.useState<ViewMode>(initialView);
    const [resourceWidth, setResourceWidth] = React.useState(300);

    const handleTodayClick = () => {
        setCurrentDate(dayjs());
    };

    const handlePrevClick = () => {
        setCurrentDate(currentDate.subtract(1, view));
    };

    const handleNextClick = () => {
        setCurrentDate(currentDate.add(1, view));
    };

    return (
        <div className="flex flex-col w-full border shadow-sm rounded-2xl overflow-hidden">
            <Header
                currentDate={currentDate}
                view={view}
                onTodayClick={handleTodayClick}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
                onViewChange={setView}
                onResourceWidthChange={setResourceWidth}
            />
            <TimeGrid
                staff={staff}
                events={events}
                currentDate={currentDate}
                resourceWidth={resourceWidth}
            />
        </div>
    );
}
