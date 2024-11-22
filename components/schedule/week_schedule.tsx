// ./components/schedule/week_schedule.tsx
"use client";

import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import Modal from "../modal/modal";

dayjs.extend(isoWeek);

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
    const [showSettings, setShowSettings] = useState(false); // New state for settings

    const dateSelectorToggle = () => setIsShowDateSelector(!isShowDateSelector);

    useEffect(() => {
        if (isShowDateSelector) {
            setDisplayedMonth(currentDate);
        }
    }, [isShowDateSelector, currentDate]);

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

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center font-semibold">
                    <div
                        onClick={dateSelectorToggle}
                        className="flex items-center gap-1 p-2 select-none rounded-xl hover:bg-gray-100 cursor-pointer"
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
                    <button
                        onClick={() => setShowSettings(true)} // Updated to toggle settings modal
                        className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                    >
                        <Cog6ToothIcon
                            width={20}
                            style={{ strokeWidth: "2" }}
                        />
                    </button>
                </div>

                {isShowDateSelector && (
                    <div className="flex flex-col w-full gap-3 p-5 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={goToPreviousMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer w-10 h-10 hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                            >
                                <ChevronLeftIcon
                                    width={20}
                                    style={{ strokeWidth: "2" }}
                                />
                            </button>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setDateSelectorMode("YEAR")}
                                    className="px-4 py-2 font-semibold bg-white rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                                >
                                    {displayedMonth.year()}년
                                </button>
                                <button
                                    onClick={() => setDateSelectorMode("MONTH")}
                                    className="px-4 py-2 font-semibold bg-white rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
                                >
                                    {displayedMonth.month() + 1}월
                                </button>
                            </div>
                            <button
                                onClick={goToNextMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer w-10 h-10 hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
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
                                            className="py-2 bg-white rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
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
                                            className="py-2 bg-white rounded-lg hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
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
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleDayClick(date)}
                                            className={`py-2 rounded-lg ${
                                                isToday
                                                    ? "bg-gradient-to-br from-sky-200/60 to-blue-200/60 backdrop-blur-sm text-cyan-800"
                                                    : isCurrentMonth
                                                    ? "bg-gradient-to-br from-sky-100/40 to-blue-100/40 backdrop-blur-sm text-cyan-800"
                                                    : "bg-white text-neutral-600"
                                            }`}
                                        >
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
                                        ? "bg-gradient-to-br from-sky-200/60 to-blue-200/60 backdrop-blur-sm text-sky-800"
                                        : date.isSame(today, "day")
                                        ? "bg-gradient-to-br from-sky-100/40 to-blue-100/40 backdrop-blur-sm text-sky-600"
                                        : "bg-white hover:bg-gradient-to-br hover:from-gray-100/60 hover:to-gray-200/60 hover:backdrop-blur-sm"
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

                <div className="flex flex-col items-center justify-center py-10">
                    <p className="text-gray-500 mb-2">일정이 없습니다.</p>
                    <p className="text-gray-500 mb-4">일정을 추가해 보세요!</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-gradient-to-br from-sky-200/60 to-blue-200/60 backdrop-blur-sm text-sky-800 rounded-lg hover:bg-gradient-to-br hover:from-sky-300/60 hover:to-blue-300/60 transition-colors"
                    >
                        일정 추가하기
                    </button>
                </div>
            </div>

            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    closeButtonVisible
                    width="450px"
                    height="650px"
                />
            )}

            {showSettings && ( // New Settings modal
                <Modal
                    onClose={() => setShowSettings(false)}
                    closeButtonVisible
                    width="350px"
                    height="450px"
                >
                    <div className="p-5">
                        <h2 className="text-xl font-semibold mb-4">설정</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    시작 요일
                                </label>
                                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option>일요일</option>
                                    <option>월요일</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    기본 근무 시간
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="time"
                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        부터
                                    </span>
                                </div>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="time"
                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        까지
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2">주말 표시</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
