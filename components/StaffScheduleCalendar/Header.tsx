// ./components/StaffScheduleCalendar/Header.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

interface StaffScheduleCalendarHeaderProps {
    currentWeek: number;
    setCurrentWeek: Dispatch<SetStateAction<number>>;
    staffCardWidth: number;
    setStaffCardWidth: Dispatch<SetStateAction<number>>;
}

export default function StaffScheduleCalendarHeader({
    currentWeek,
    setCurrentWeek,
    staffCardWidth,
    setStaffCardWidth,
}: StaffScheduleCalendarHeaderProps) {
    const startOfWeek = dayjs().week(currentWeek).startOf("week");
    const endOfWeek = dayjs().week(currentWeek).endOf("week");

    const handlePrevWeek = () => {
        setCurrentWeek((prevWeek) => prevWeek - 1);
    };

    const handleNextWeek = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

    const minWidth = 200; // 최소 너비
    const maxWidth = 500; // 최대 너비

    const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStaffCardWidth(Number(event.target.value));
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-between items-center">
                <div className="flex justify-center items-center">
                    {/* prev Week button */}
                    <button
                        onClick={handlePrevWeek}
                        className="p-1 rounded-lg transition-all hover:backdrop-brightness-95 active:scale-95 active:backdrop-brightness-90"
                    >
                        <ChevronLeft
                            className="size-6"
                            style={{ strokeWidth: 1.15 }}
                        />
                    </button>
                    {/* next Week button */}
                    <button
                        onClick={handleNextWeek}
                        className="p-1 rounded-lg transition-all hover:backdrop-brightness-95 active:scale-95 active:backdrop-brightness-90"
                    >
                        <ChevronRight
                            className="size-6"
                            style={{ strokeWidth: 1.15 }}
                        />
                    </button>
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <span className="text-xl font-semibold shrink-0">
                        {startOfWeek.format("YYYY년 MM월")}
                    </span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded-lg shrink-0 flex justify-center items-center">
                        {startOfWeek.format("MM.DD")}
                        {" - "}
                        {endOfWeek.format("MM.DD")}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <span className="flex-shrink-0">리소스 폭:</span>
                <input
                    type="range"
                    min={minWidth}
                    max={maxWidth}
                    value={staffCardWidth}
                    onChange={handleWidthChange}
                    className="range range-xs"
                />
            </div>
        </div>
    );
}
