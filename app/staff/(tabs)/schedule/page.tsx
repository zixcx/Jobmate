import WeekSchedule from "@/components/schedule/week_schedule";

export default function StaffSchedule() {
    return (
        <div className="flex flex-col gap-3 p-10">
            <span className="title-lg">일정</span>

            {/* 스케줄 리스트 (week 임시 컴포넌트 */}
            <WeekSchedule />
        </div>
    );
}
