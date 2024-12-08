// ./app/owner/schedule/page.tsx
import StaffScheduleCalendar from "@/components/owner/StaffScheduleCalendar";

export default function OwnerSchedule() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800">Staff Schedule</h1>
            <StaffScheduleCalendar />
        </div>
    );
}
