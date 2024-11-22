// ./components/time_table/time_table.tsx
"use client";

import { getContrastYIQ } from "@/lib/textColor";
import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import Modal from "../modal/modal";
import { useState } from "react";
dayjs.extend(minMax);

export default function TimeTable() {
    const events = [
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
    ];

    // events에서 가장 빠른 시작 시간과 가장 늦은 종료 시간 찾기
    const start_time = dayjs.min(events.map((event) => event.start));
    const end_time = dayjs.max(events.map((event) => event.end));

    // 전체 시간 길이
    const table_len = end_time ? end_time.diff(start_time, "minute") : 1440;

    // 요일 매핑
    const weekdayMapping: { [key: string]: string } = {
        SUN: "일",
        MON: "월",
        TUE: "화",
        WED: "수",
        THU: "목",
        FRI: "금",
        SAT: "토",
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    width="450px"
                    height="650px"
                    closeButtonVisible
                ></Modal>
            )}
            <div className="w-full flex justify-between items-center">
                <span className="title">시간표</span>
                <button
                    onClick={() => setShowModal(true)}
                    className="p-2 hover:bg-neutral-100 rounded-lg active:bg-neutral-200"
                >
                    <PlusIcon width={20} style={{ strokeWidth: "1.75" }} />
                </button>
            </div>
            <div className="w-full max-w-md h-[512px] border rounded-md overflow-hidden flex justify-center items-center">
                <div className="grid w-full h-full max-w-md grid-cols-7 mx-auto divide-x">
                    {Object.keys(weekdayMapping).map((key) => (
                        <div
                            key={key}
                            className="grid grid-rows-[auto,1fr] divide-y h-full overflow-hidden"
                        >
                            <div className="text-center bg-neutral-50">
                                {weekdayMapping[key]}
                            </div>
                            <div className="relative h-full">
                                {events
                                    .filter((event) => event.weekday === key)
                                    .map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="absolute left-0 right-0 flex flex-col items-center justify-start before:z-50"
                                            style={{
                                                top:
                                                    (event.start.diff(
                                                        start_time,
                                                        "minute"
                                                    ) /
                                                        table_len) *
                                                        100 +
                                                    "%",
                                                height:
                                                    (event.end.diff(
                                                        event.start,
                                                        "minute"
                                                    ) /
                                                        table_len) *
                                                        100 +
                                                    "%",
                                                backgroundColor: event.bg_color,
                                                color: getContrastYIQ(
                                                    event.bg_color
                                                ),
                                            }}
                                        >
                                            <span className="font-medium">
                                                {event.title}
                                            </span>
                                            <span className="flex flex-col items-start justify-center text-sm">
                                                <span className="text-xs">
                                                    시작
                                                    <span className="">
                                                        {event.start.format(
                                                            "HH:mm"
                                                        )}
                                                    </span>
                                                </span>
                                                <span className="text-xs">
                                                    종료
                                                    {event.end.format("HH:mm")}
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
