import { StaffScheduleCalendar } from "@/components/StaffScheduleCalendar";

const sampleStaff = [
    {
        id: "1",
        name: "Don Taylor",
        role: "Resident",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "2",
        name: "John Adams",
        role: "Fellow",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "3",
        name: "Jenny Brown",
        role: "Attending",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "4",
        name: "Sarah Lee",
        role: "Nurse",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "5",
        name: "David Smith",
        role: "Nurse",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "6",
        name: "Michael Johnson",
        role: "Nurse",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

const sampleEvents = [
    {
        id: "1",
        staffId: "1",
        title: "Surgery",
        start: "2024-01-09T09:00",
        end: "2024-01-09T11:00",
    },
    {
        id: "2",
        staffId: "2",
        title: "Rounds",
        start: "2024-01-09T09:00",
        end: "2024-01-09T12:00",
    },
];

export default function OwnerSchedule() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h1 className="text-2xl font-bold text-gray-800">Staff Schedule</h1>
            <div className="w-full">
                <StaffScheduleCalendar
                    staff={sampleStaff}
                    events={sampleEvents}
                />
            </div>
        </div>
    );
}
