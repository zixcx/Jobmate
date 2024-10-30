"use client";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useState } from "react";

import isoWeek from "dayjs/plugin/isoWeek";
import Link from "next/link";
dayjs.extend(isoWeek);

export default function WeekSchedule() {
    const nowDate = dayjs();
    const [selectedCol, setSelectedCol] = useState<number>(dayjs().day());
    const [isShowDateSelector, setIsShowDateSelector] = useState(false);
    const [currentDate, setCurrentDate] = useState(nowDate);

    const dateSelectorToggle = () => setIsShowDateSelector(!isShowDateSelector);

    // 7일간의 날짜 배열 계산
    const getWeekDates = (date: any) => {
        const startOfWeek = date.startOf("week"); // 일요일부터 시작
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

    const getMonthLabel = () => {
        const selectedDay = weekDates[selectedCol];
        const isNextMonth =
            selectedDay.month() !== currentDate.month() &&
            selectedDay.month() > currentDate.month();
        const isPreviousMonth =
            selectedDay.month() !== currentDate.month() &&
            selectedDay.month() < currentDate.month();
        if (isNextMonth) {
            return `${selectedDay.year()}년 ${selectedDay.month() + 1}월`;
        }
        if (isPreviousMonth) {
            return `${selectedDay.year()}년 ${selectedDay.month() + 1}월`;
        }
        return `${currentDate.year()}년 ${currentDate.month() + 1}월`;
    };

    const today = dayjs();

    // dateSelector
    const [dateSelectorMode, setDateSelectorMode] = useState<
        "CAL" | "YEAR" | "MONTH"
    >("CAL");

    return (
        <>
            <div className="flex flex-col gap-3 bg-white box">
                <div className="flex justify-between items-center font-semibold *:hover:cursor-pointer">
                    <div
                        onClick={dateSelectorToggle}
                        className="flex items-center gap-1 p-2 select-none rounded-xl hover:bg-neutral-100"
                    >
                        <span>{getMonthLabel()}</span>
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
                    <div className="flex flex-col w-full gap-3 px-10 box bg-neutral-100">
                        <div className="flex justify-center gap-2">
                            <button className="px-2 rounded-lg hover:bg-neutral-200">
                                <ChevronLeftIcon width={20} />
                            </button>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => setDateSelectorMode("YEAR")}
                                    className="px-4 py-2 bg-white rounded-lg hover:bg-neutral-200"
                                >
                                    2024년
                                </button>
                                <button
                                    onClick={() => setDateSelectorMode("MONTH")}
                                    className="px-4 py-2 bg-white rounded-lg hover:bg-neutral-200"
                                >
                                    10월
                                </button>
                            </div>
                            <button className="px-2 rounded-lg hover:bg-neutral-200">
                                <ChevronRightIcon width={20} />
                            </button>
                        </div>
                        {dateSelectorMode === "CAL" && (
                            <div className="flex flex-col items-center justify-center w-full gap-2">
                                <div className="flex items-center gap-1 justify-center w-full *:flex *:justify-center *:items-center *:text-center *:w-10 select-none">
                                    <span>일</span>
                                    <span>월</span>
                                    <span>화</span>
                                    <span>수</span>
                                    <span>목</span>
                                    <span>금</span>
                                    <span>토</span>
                                </div>

                                <div className="flex flex-col items-center justify-center w-full gap-1">
                                    <div className="flex items-center justify-center w-full *:flex *:justify-center *:items-center *:text-center *:size-10 gap-1 *:bg-white *:rounded-lg *:cursor-pointer hover:*:scale-105 *:transition">
                                        <span>29</span>
                                        <span>30</span>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full *:flex *:justify-center *:items-center *:text-center *:size-10 gap-1 *:bg-white *:rounded-lg *:cursor-pointer hover:*:scale-105 *:transition">
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                        <span>11</span>
                                        <span>12</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full *:flex *:justify-center *:items-center *:text-center *:size-10 gap-1 *:bg-white *:rounded-lg *:cursor-pointer hover:*:scale-105 *:transition">
                                        <span>13</span>
                                        <span>14</span>
                                        <span>15</span>
                                        <span>16</span>
                                        <span>17</span>
                                        <span>18</span>
                                        <span>19</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full *:flex *:justify-center *:items-center *:text-center *:size-10 gap-1 *:bg-white *:rounded-lg *:cursor-pointer hover:*:scale-105 *:transition">
                                        <span>20</span>
                                        <span>21</span>
                                        <span>22</span>
                                        <span>23</span>
                                        <span className="!bg-sky-200/60">
                                            24
                                        </span>
                                        <span>25</span>
                                        <span>26</span>
                                    </div>
                                    <div className="flex items-center justify-center w-full *:flex *:justify-center *:items-center *:text-center *:size-10 gap-1 *:bg-white *:rounded-lg *:cursor-pointer hover:*:scale-105 *:transition">
                                        <span>27</span>
                                        <span>28</span>
                                        <span>29</span>
                                        <span>30</span>
                                        <span>31</span>
                                        <span>1</span>
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {dateSelectorMode === "YEAR" && (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <button className="flex justify-center w-full pt-1">
                                    <ChevronUpIcon width={20} />
                                </button>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2020년
                                    </button>
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2021년
                                    </button>
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2022년
                                    </button>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2023년
                                    </button>
                                    <button className="w-24 h-10 transition rounded-lg bg-sky-200/60 min-w-24 hover:scale-105">
                                        2024년
                                    </button>
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2025년
                                    </button>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2026년
                                    </button>
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2027년
                                    </button>
                                    <button className="w-24 h-10 transition bg-white rounded-lg min-w-24 hover:scale-105">
                                        2028년
                                    </button>
                                </div>
                                <button className="flex justify-center w-full pb-1">
                                    <ChevronDownIcon width={20} />
                                </button>
                            </div>
                        )}
                        {dateSelectorMode === "MONTH" && (
                            <div className="flex flex-col items-center justify-center w-full gap-2">
                                <div className="flex items-center justify-center gap-2 *:rounded-lg *:h-10 *:w-16 *:min-w-16 *:bg-white hover:*:scale-105 *:transition">
                                    <button>1월</button>
                                    <button>2월</button>
                                    <button>3월</button>
                                    <button>4월</button>
                                </div>
                                <div className="flex items-center justify-center gap-2 *:rounded-lg *:h-10 *:w-16 *:min-w-16 *:bg-white hover:*:scale-105 *:transition">
                                    <button>5월</button>
                                    <button>6월</button>
                                    <button>7월</button>
                                    <button>8월</button>
                                </div>
                                <div className="flex items-center justify-center gap-2 *:rounded-lg *:h-10 *:w-16 *:min-w-16 *:bg-white hover:*:scale-105 *:transition">
                                    <button>9월</button>
                                    <button className="!bg-sky-200/70">
                                        10월
                                    </button>
                                    <button>11월</button>
                                    <button>12월</button>
                                </div>
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
                    {/* <div className="w-full">
                        <ScheduleItem />
                    </div> */}
                </div>
            </div>
        </>
    );
}
