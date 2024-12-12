// ./app/staff/schedule/page.tsx
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import WeekSchedule from "@/components/schedule/week_schedule";

import {
    UpcomingSchedule,
    ThisWeekSummary,
} from "@/components/schedule/actions";
import {
    getThisWeekSummary,
    getUpcomingSchedules,
} from "@/components/schedule/actions";

export default async function StaffSchedule() {
    const thisWeekSummary: ThisWeekSummary = await getThisWeekSummary();
    const upcomingSchedules: UpcomingSchedule[] = await getUpcomingSchedules();

    return (
        <div className="flex flex-col gap-6 p-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">일정</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5">
                    <WeekSchedule />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 p-5 bg-white rounded-xl shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">
                            이번 주 요약
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                            <span>
                                총 근무일: {thisWeekSummary.totalWorkingDays}일
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <ClockIcon className="w-5 h-5 text-green-600" />
                            <span>
                                총 근무시간: {thisWeekSummary.totalWorkingHours}
                                시간
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-5 bg-white rounded-xl shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800">
                            다가오는 일정
                        </h2>
                        <ul className="space-y-2">
                            {upcomingSchedules.map((schedule, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-gray-600"
                                >
                                    <div
                                        className={`w-2 h-2 ${
                                            index === 0
                                                ? "bg-blue-600"
                                                : "bg-green-600"
                                        } rounded-full`}
                                    ></div>
                                    <span>
                                        {schedule.storeName} {schedule.date}{" "}
                                        {schedule.startTime} -{" "}
                                        {schedule.endTime}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
