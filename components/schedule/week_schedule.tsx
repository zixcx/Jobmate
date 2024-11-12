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
import Link from "next/link";

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

    const dateSelectorToggle = () => setIsShowDateSelector(!isShowDateSelector);

    useEffect(() => {
        if (isShowDateSelector) {
            setDisplayedMonth(currentDate); // dateSelector가 열릴 때 현재 연월을 표시
        }
    }, [isShowDateSelector, currentDate]);

    // 7일간의 날짜 배열 계산
    const getWeekDates = (date: dayjs.Dayjs) => {
        const startOfWeek = date.startOf("week");
        const dates = [];
        for (let i = 0; i < 7; i++) {
            dates.push(startOfWeek.add(i, "day"));
        }
        return dates;
    };

    const weekDates = getWeekDates(currentDate);

    const handlePreviousWeek = () => {
        setCurrentDate(currentDate.subtract(1, "week"));
    };

    const handleNextWeek = () => {
        setCurrentDate(currentDate.add(1, "week"));
    };

    const today = dayjs();

    // 연도 선택
    const selectYear = (year: number) => {
        setDisplayedMonth(displayedMonth.year(year));
        setDateSelectorMode("MONTH");
    };

    // 월 선택
    const selectMonth = (month: number) => {
        setDisplayedMonth(displayedMonth.month(month - 1));
        setDateSelectorMode("CAL");
    };

    // 특정 날짜 선택 시 해당 주로 이동
    const handleDayClick = (date: dayjs.Dayjs) => {
        setCurrentDate(date.startOf("week"));
        setSelectedCol(date.day());
        setIsShowDateSelector(false);
    };

    // 다음 달로 이동
    const goToNextMonth = () => {
        setDisplayedMonth(displayedMonth.add(1, "month"));
    };

    // 이전 달로 이동
    const goToPreviousMonth = () => {
        setDisplayedMonth(displayedMonth.subtract(1, "month"));
    };

    return (
        <>
            <div className="flex flex-col gap-3 bg-white box">
                <div className="flex justify-between items-center font-semibold *:hover:cursor-pointer">
                    <div
                        onClick={dateSelectorToggle}
                        className="flex items-center gap-1 p-2 select-none rounded-xl hover:bg-neutral-100"
                    >
                        <span>{`${currentDate.year()}년 ${
                            currentDate.month() + 1
                        }월`}</span>
                        <ChevronDownIcon
                            width={20}
                            className={`${
                                isShowDateSelector && "-rotate-180"
                            } transition-transform`}
                            style={{ strokeWidth: "2" }}
                        />
                    </div>
                    <button className="self-center p-2 size-fit rounded-xl hover:bg-neutral-100">
                        <Cog6ToothIcon
                            width={20}
                            style={{ strokeWidth: "2" }}
                        />
                    </button>
                </div>

                {isShowDateSelector && (
                    <div className="flex flex-col w-full gap-3 px-10 box bg-neutral-100/65">
                        {/* 연도 및 월 선택 */}
                        <div className="flex items-center justify-around">
                            {/* 이전달 이동 버튼 */}
                            <button
                                onClick={goToPreviousMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer size-10 hover:bg-neutral-200"
                            >
                                <ChevronLeftIcon
                                    width={20}
                                    style={{ strokeWidth: "2" }}
                                />
                            </button>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setDateSelectorMode("YEAR")}
                                    className="relative px-4 py-2 font-semibold bg-white rounded-lg hover:bg-neutral-200"
                                >
                                    {displayedMonth.year()}년
                                    <div className="absolute border-b-[6px] border-l-[6px] border-sky-800 bottom-1.5 right-1.5 border-l-transparent" />
                                </button>
                                <button
                                    onClick={() => setDateSelectorMode("MONTH")}
                                    className="relative px-4 py-2 font-semibold bg-white rounded-lg hover:bg-neutral-200"
                                >
                                    {displayedMonth.month() + 1}월
                                    <div className="absolute border-b-[6px] border-l-[6px] border-sky-800 bottom-1.5 right-1.5 border-l-transparent" />
                                </button>
                            </div>
                            {/* 다음달 이동 버튼 */}
                            <button
                                onClick={goToNextMonth}
                                className="flex items-center justify-center bg-white rounded-full cursor-pointer size-10 hover:bg-neutral-200"
                            >
                                <ChevronRightIcon
                                    width={20}
                                    style={{ strokeWidth: "2" }}
                                />
                            </button>
                        </div>

                        {dateSelectorMode === "YEAR" && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {[2020, 2021, 2022, 2023, 2024, 2025].map(
                                    (year) => (
                                        <button
                                            key={year}
                                            onClick={() => selectYear(year)}
                                            className="w-24 h-10 bg-white rounded-lg hover:bg-neutral-200"
                                        >
                                            {year}년
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {dateSelectorMode === "MONTH" && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                    (month) => (
                                        <button
                                            key={month}
                                            onClick={() => selectMonth(month)}
                                            className="w-16 h-10 bg-white rounded-lg hover:bg-neutral-200"
                                        >
                                            {month}월
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {dateSelectorMode === "CAL" && (
                            <div className="flex flex-col items-center justify-center w-full gap-2">
                                <div className="flex items-center justify-center w-full gap-1">
                                    {[
                                        "일",
                                        "월",
                                        "화",
                                        "수",
                                        "목",
                                        "금",
                                        "토",
                                    ].map((day, idx) => (
                                        <span
                                            key={idx}
                                            className="w-10 text-center"
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                                {[...Array(5)].map((_, weekIdx) => (
                                    <div
                                        key={weekIdx}
                                        className="flex items-center justify-center w-full gap-1"
                                    >
                                        {[...Array(7)].map((_, dayIdx) => {
                                            const date = displayedMonth
                                                .startOf("month")
                                                .startOf("week")
                                                .add(
                                                    weekIdx * 7 + dayIdx,
                                                    "day"
                                                );
                                            const isToday = date.isSame(
                                                today,
                                                "day"
                                            );
                                            const isCurrentMonth =
                                                date.month() ===
                                                displayedMonth.month();
                                            return (
                                                <button
                                                    key={dayIdx}
                                                    onClick={() =>
                                                        handleDayClick(date)
                                                    }
                                                    className={`size-10 rounded-lg ${
                                                        isToday
                                                            ? "bg-sky-200/30"
                                                            : isCurrentMonth
                                                            ? "bg-white hover:bg-neutral-200"
                                                            : "bg-neutral-200/50 text-neutral-400"
                                                    }`}
                                                >
                                                    {date.date()}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between gap-1">
                    {/* 이전주 보기 버튼 */}
                    <button
                        onClick={handlePreviousWeek}
                        className="px-1 rounded-lg hover:bg-neutral-100"
                    >
                        <ChevronLeftIcon width={20} />
                    </button>

                    <div className="w-full grid grid-cols-7 gap-1 *:cursor-pointer *:select-none">
                        {weekDates.map((date, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center text-center rounded-lg py-2 ${
                                    selectedCol === index
                                        ? "bg-sky-950"
                                        : date.isSame(today, "day")
                                        ? "bg-sky-200/30"
                                        : "bg-white"
                                }`}
                                onClick={() => setSelectedCol(index)}
                            >
                                <span
                                    className={
                                        selectedCol === index
                                            ? `text-neutral-100`
                                            : `text-neutral-700`
                                    }
                                >
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
                                <span
                                    className={
                                        selectedCol === index
                                            ? `text-neutral-100`
                                            : `text-neutral-500`
                                    }
                                >
                                    {date.date()}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* 다음주 보기 버튼 */}
                    <button
                        onClick={handleNextWeek}
                        className="px-1 rounded-lg hover:bg-neutral-100"
                    >
                        <ChevronRightIcon width={20} />
                    </button>
                </div>
                <span className="w-full h-px my-2 bg-neutral-300" />
                <div className="w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-3">
                        <div className="flex flex-col items-center justify-center *:text-neutral-500">
                            <span>일정이 없습니다.</span>
                            <span>일정을 추가해 보세요!</span>
                        </div>
                        <Link href={"/staff/schedule/add"} className="btn">
                            일정 추가하기
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
