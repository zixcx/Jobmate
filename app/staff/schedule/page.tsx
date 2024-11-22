import {
    PlusIcon,
    CalendarDaysIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";
import WeekSchedule from "@/components/schedule/week_schedule";

export default function StaffSchedule() {
    return (
        <div className="flex flex-col gap-6 p-10">
            <div className="flex justify-between items-center">
                <h1 className="title-lg">일정</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <WeekSchedule />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-semibold">이번 주 요약</h2>
                        <div className="flex items-center gap-2">
                            <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                            <span>총 근무일: 5일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-green-600" />
                            <span>총 근무시간: 40시간</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-semibold">다가오는 일정</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span>내일 오전 9시 - 오후 6시</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                <span>모레 오후 2시 - 오후 10시</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
