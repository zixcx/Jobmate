"use client";
import { type HeaderProps } from "./types";

export function Header({
    currentDate,
    view,
    onTodayClick,
    onPrevClick,
    onNextClick,
    onViewChange,
    onResourceWidthChange,
}: HeaderProps) {
    const weekOfMonth = Math.ceil(currentDate.date() / 7);
    const year = currentDate.format("YYYY");
    const month = currentDate.format("M");
    const weekStr = `${weekOfMonth}주차`;
    const dateLabel = `${year}년 ${month}월 ${weekStr}`;

    return (
        <div className="flex items-center justify-between border-b p-4 w-full">
            <div className="flex items-center gap-2">
                {/* 메뉴 버튼 제거 */}
                <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={onTodayClick}
                >
                    오늘
                </button>
                <div className="flex items-center gap-1">
                    <button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={onPrevClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={onNextClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <div className="text-lg font-semibold">{dateLabel}</div>
            </div>
            {/* 리소스 폭 슬라이더는 md 이상에서만 표시 */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm">리소스 폭</span>
                    <input
                        type="range"
                        min="200"
                        max="500"
                        step="10"
                        defaultValue="300"
                        className="range w-[100px] range-sm"
                        onChange={(e) =>
                            onResourceWidthChange(Number(e.target.value))
                        }
                    />
                </div>
                <div className="flex items-center rounded-md border overflow-hidden">
                    <button
                        className={`px-3 py-1 ${
                            view === "week" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => onViewChange("week")}
                    >
                        주
                    </button>
                    <button
                        className={`px-3 py-1 ${
                            view === "month" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => onViewChange("month")}
                    >
                        월
                    </button>
                </div>
            </div>
        </div>
    );
}
