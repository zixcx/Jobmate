"use client";

import {
    CalendarDateRangeIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import isoWeek from "dayjs/plugin/isoWeek";

import { StaffAssignment } from "@prisma/client";
import AddScheduleModal from "@/app/staff/schedule/add_schedule_modal";
import { getStaffAssignments, getWeekSchedules } from "./actions";

dayjs.extend(isoWeek);

interface Schedule {
    id: string;
    storeId: string;
    store: {
        store_name: string;
    };
    title: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
}

export default function WeekSchedule() {
    const nowDate = dayjs();
    const [selectedCol, setSelectedCol] = useState<number>(dayjs().day());
    const [isShowDateSelector, setIsShowDateSelector] = useState(false);
    const [currentDate, setCurrentDate] = useState(nowDate);
    const [displayedMonth, setDisplayedMonth] = useState(nowDate);
    const [dateSelectorMode, setDateSelectorMode] = useState<
        "CAL" | "YEAR" | "MONTH"
    >("CAL");
    const [showModal, setShowModal] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [assignments, setAssignments] = useState<
        (StaffAssignment & { store: { store_name: string } })[]
    >([]);

    const dateSelectorToggle = () => setIsShowDateSelector(!isShowDateSelector);

    useEffect(() => {
        const fetchSchedules = async () => {
            const fetchedSchedules = await getWeekSchedules(
                currentDate.startOf("week").format("YYYY-MM-DD")
            );
            setSchedules(fetchedSchedules);
        };

        fetchSchedules();
    }, [currentDate]);

    useEffect(() => {
        if (isShowDateSelector) {
            setDisplayedMonth(currentDate);
        }
    }, [isShowDateSelector, currentDate]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const fetchedAssignments = await getStaffAssignments();
            setAssignments(fetchedAssignments);
        };

        fetchAssignments();
    }, []);

    const getWeekDates = (date: dayjs.Dayjs) => {
        const startOfWeek = date.startOf("week");
        return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
    };

    const weekDates = getWeekDates(currentDate);

    const handlePreviousWeek = () =>
        setCurrentDate(currentDate.subtract(1, "week"));
    const handleNextWeek = () => setCurrentDate(currentDate.add(1, "week"));

    const today = dayjs();

    const selectYear = (year: number) => {
        setDisplayedMonth(displayedMonth.year(year));
        setDateSelectorMode("MONTH");
    };

    const selectMonth = (month: number) => {
        setDisplayedMonth(displayedMonth.month(month - 1));
        setDateSelectorMode("CAL");
    };

    const handleDayClick = (date: dayjs.Dayjs) => {
        setCurrentDate(date.startOf("week"));
        setSelectedCol(date.day());
        setIsShowDateSelector(false);
    };

    const goToNextMonth = () =>
        setDisplayedMonth(displayedMonth.add(1, "month"));
    const goToPreviousMonth = () =>
        setDisplayedMonth(displayedMonth.subtract(1, "month"));

    const hasSchedule = (date: dayjs.Dayjs) => {
        return schedules.some((schedule) =>
            dayjs(schedule.start).isSame(date, "day")
        );
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                <div
                    onClick={dateSelectorToggle}
                    className="flex items-center gap-1 p-2 w-fit select-none rounded-xl hover:bg-gray-100 cursor-pointer font-semibold"
                >
                    <span>{`${currentDate.year()}년 ${
                        currentDate.month() + 1
                    }월`}</span>
                    <ChevronDownIcon
                        width={20}
                        className={`${
                            isShowDateSelector ? "-rotate-180" : ""
                        } transition-transform`}
                        style={{ strokeWidth: "2" }}
                    />
                </div>

                {isShowDateSelector && (
                    <div className="flex flex-col w-full gap-3 p-5 bg-gray-100 rounded-xl">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={goToPreviousMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer w-10 h-10 hover:bg-gray-200 border-[0.1px]"
                            >
                                <ChevronLeftIcon
                                    width={20}
                                    style={{ strokeWidth: "2" }}
                                />
                            </button>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setDateSelectorMode("YEAR")}
                                    className="px-4 py-2 font-semibold bg-white rounded-lg hover:bg-gray-200 border-[0.1px]"
                                >
                                    {displayedMonth.year()}년
                                </button>
                                <button
                                    onClick={() => setDateSelectorMode("MONTH")}
                                    className="px-4 py-2 font-semibold bg-white rounded-lg hover:bg-gray-200 border-[0.1px]"
                                >
                                    {displayedMonth.month() + 1}월
                                </button>
                            </div>
                            <button
                                onClick={goToNextMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer w-10 h-10 hover:bg-gray-200 border-[0.1px]"
                            >
                                <ChevronRightIcon
                                    width={20}
                                    style={{ strokeWidth: "2" }}
                                />
                            </button>
                        </div>

                        {dateSelectorMode === "YEAR" && (
                            <div className="grid grid-cols-3 gap-2">
                                {[2020, 2021, 2022, 2023, 2024, 2025].map(
                                    (year) => (
                                        <button
                                            key={year}
                                            onClick={() => selectYear(year)}
                                            className="py-2 bg-white rounded-lg hover:bg-gray-200 border-[0.1px]"
                                        >
                                            {year}년
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {dateSelectorMode === "MONTH" && (
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                    (month) => (
                                        <button
                                            key={month}
                                            onClick={() => selectMonth(month)}
                                            className="py-2 bg-white rounded-lg hover:bg-gray-200 border-[0.1px]"
                                        >
                                            {month}월
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {dateSelectorMode === "CAL" && (
                            <div className="grid grid-cols-7 gap-1">
                                {["일", "월", "화", "수", "목", "금", "토"].map(
                                    (day, idx) => (
                                        <span
                                            key={idx}
                                            className="text-center text-gray-500"
                                        >
                                            {day}
                                        </span>
                                    )
                                )}
                                {Array.from({ length: 35 }).map((_, idx) => {
                                    const date = displayedMonth
                                        .startOf("month")
                                        .startOf("week")
                                        .add(idx, "day");
                                    const isToday = date.isSame(today, "day");
                                    const isCurrentMonth =
                                        date.month() === displayedMonth.month();
                                    const hasEvent = hasSchedule(date);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleDayClick(date)}
                                            className={`py-2 rounded-lg border-[0.1px] ${
                                                isToday
                                                    ? "bg-sky-100 text-sky-900 hover:bg-sky-200/60"
                                                    : isCurrentMonth
                                                    ? "bg-white hover:bg-neutral-200 text-neutral-800"
                                                    : "bg-neutral-50 text-neutral-600/80 hover:bg-neutral-200"
                                            } ${hasEvent ? "relative" : ""}`}
                                        >
                                            {hasEvent && (
                                                <div className="absolute inset-x-0 top-1 flex justify-center">
                                                    <div className="w-1 h-1 bg-sky-500 rounded-full"></div>
                                                </div>
                                            )}
                                            {date.date()}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between gap-1">
                    <button
                        onClick={handlePreviousWeek}
                        className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                    >
                        <ChevronLeftIcon width={20} />
                    </button>

                    <div className="grid grid-cols-7 gap-1 flex-grow">
                        {weekDates.map((date, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center text-center rounded-lg py-2 cursor-pointer ${
                                    selectedCol === index
                                        ? "bg-sky-100 text-sky-800"
                                        : date.isSame(today, "day")
                                        ? "bg-sky-50 text-sky-900"
                                        : "bg-white hover:bg-sky-50"
                                }`}
                                onClick={() => setSelectedCol(index)}
                            >
                                <span className="text-sm">
                                    {
                                        [
                                            "일",
                                            "월",
                                            "화",
                                            "수",
                                            "목",
                                            "금",
                                            "토",
                                        ][index]
                                    }
                                </span>
                                <span className="text-lg font-semibold">
                                    {date.date()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleNextWeek}
                        className="p-2 rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                    >
                        <ChevronRightIcon width={20} />
                    </button>
                </div>

                <div className="border-t border-gray-200 my-2" />

                {schedules.filter((schedule) =>
                    dayjs(schedule.start).isSame(weekDates[selectedCol], "day")
                ).length > 0 ? (
                    <div className="flex flex-col gap-2 items-center">
                        {schedules
                            .filter((schedule) =>
                                dayjs(schedule.start).isSame(
                                    weekDates[selectedCol],
                                    "day"
                                )
                            )
                            .map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold">
                                                {schedule.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {schedule.store.store_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <p className="text-sm text-gray-500">
                                            {schedule.isAllDay
                                                ? "종일"
                                                : `${dayjs(
                                                      schedule.start
                                                  ).format("HH:mm")} - ${dayjs(
                                                      schedule.end
                                                  ).format("HH:mm")}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-40 shrink-0 group px-4 py-2 flex gap-1 justify-between items-center bg-sky-100 text-sky-800 rounded-lg hover:bg-sky-200 transition-colors"
                        >
                            <div className="relative flex justify-center items-center">
                                <CalendarDateRangeIcon width={20} />
                                <PlusIcon
                                    width={12}
                                    className="absolute -bottom-1 -right-1 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors"
                                />
                            </div>
                            <span>일정 추가하기</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-gray-500 mb-2">일정이 없습니다.</p>
                        <p className="text-gray-500 mb-4">
                            일정을 추가해 보세요!
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-36 shrink-0 group px-4 py-2 flex gap-1 justify-between items-center bg-sky-100 text-sky-800 rounded-lg hover:bg-sky-200 transition-colors"
                        >
                            <div className="relative flex justify-center items-center">
                                <CalendarDateRangeIcon width={20} />
                                <PlusIcon
                                    width={12}
                                    className="absolute -bottom-1 -right-1 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors"
                                />
                            </div>
                            <span>일정 추가하기</span>
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <AddScheduleModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    currentDate={currentDate}
                    assignments={assignments}
                />
            )}
        </>
    );
}
