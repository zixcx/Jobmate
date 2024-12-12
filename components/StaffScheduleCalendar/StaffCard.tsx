import dayjs from "dayjs";
import Image from "next/image";
import TimeTable from "../TimeTable";
import { Event, Staff } from "./types";

interface StaffCardProps {
    staff: Staff;
    events: Event[];
    currentWeek: number;
    staffCardWidth: number;
}

export default function StaffCard({
    staff,
    currentWeek,
    staffCardWidth,
}: StaffCardProps) {
    const startOfWeek = dayjs().week(currentWeek).startOf("week"); // 주의 시작 날짜 (일요일)

    return (
        <div
            className="flex flex-col justify-center items-center border-x border-gray-300"
            style={{
                width: `${staffCardWidth}px`,
                minWidth: `${staffCardWidth}px`,
            }}
        >
            {/* staff info */}
            <div className="w-full flex gap-4 px-5 py-2 justify-start items-center border-b border-gray-300">
                <Image
                    src={staff.avatarUrl}
                    alt={"Userprofile"}
                    width={55}
                    height={55}
                    className="rounded-full"
                />
                <div className="flex flex-col justify-center items-start">
                    <span className="text-lg font-medium">{staff.name}</span>
                    <span className="text-sm font-light">{staff.role}</span>
                </div>
            </div>
            {/* week row */}
            <div className="w-full flex justify-around items-center py-4">
                {["일", "월", "화", "수", "목", "금", "토"].map(
                    (day, index) => {
                        const date = startOfWeek.add(index, "day");
                        return (
                            <div
                                key={day}
                                className="flex flex-col justify-center items-center"
                            >
                                <span className="text-sm font-[310]">
                                    {day}
                                </span>
                                <span className="text-xl font-medium">
                                    {date.format("DD")}
                                </span>
                            </div>
                        );
                    }
                )}
            </div>
            {/* event grid */}
            <TimeTable />
        </div>
    );
}
