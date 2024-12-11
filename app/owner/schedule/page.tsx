import dayjs from "dayjs";

// const sampleStaff: Staff[] = [
//     {
//         id: "1",
//         name: "Don Taylor",
//         role: "Resident",
//         avatarUrl: "/images/don.jpg",
//     },
//     {
//         id: "2",
//         name: "John Adams",
//         role: "Fellow",
//         avatarUrl: "/images/john.jpg",
//     },
//     {
//         id: "3",
//         name: "Jenny Brown",
//         role: "Attending",
//         avatarUrl: "/images/jenny.jpg",
//     },
//     {
//         id: "4",
//         name: "Chris Lee",
//         role: "Nurse",
//         avatarUrl: "/images/chris.jpg",
//     },
//     { id: "5", name: "Kim Soo", role: "Intern", avatarUrl: "/images/kim.jpg" },
//     {
//         id: "6",
//         name: "Park Joon",
//         role: "Fellow",
//         avatarUrl: "/images/park.jpg",
//     },
//     {
//         id: "7",
//         name: "Lee Chan",
//         role: "Attending",
//         avatarUrl: "/images/lee.jpg",
//     },
//     {
//         id: "8",
//         name: "Yoon Ha",
//         role: "Resident",
//         avatarUrl: "/images/yoon.jpg",
//     },
//     { id: "9", name: "Min Jung", role: "Intern", avatarUrl: "/images/min.jpg" },
//     {
//         id: "10",
//         name: "Oh Hyun",
//         role: "Resident",
//         avatarUrl: "/images/oh.jpg",
//     },
// ];

// const sampleEvents: Event[] = [
//     {
//         id: "e1",
//         staffId: "1",
//         title: "Conference",
//         start: "2024-12-09T09:30:00", // 월요일 09:30
//         end: "2024-12-09T10:30:00", // 월요일 10:30
//     },
//     {
//         id: "e2",
//         staffId: "1",
//         title: "Surgery",
//         start: "2024-12-11T10:30:00", // 수요일 10:30
//         end: "2024-12-11T12:00:00", // 수요일 12:00
//     },
//     {
//         id: "e3",
//         staffId: "2",
//         title: "Rounds",
//         start: "2024-12-10T09:00:00", // 화요일 09:00
//         end: "2024-12-10T09:45:00", // 화요일 09:45
//     },
//     {
//         id: "e4",
//         staffId: "3",
//         title: "Staff Meeting",
//         start: "2024-12-13T14:00:00", // 금요일 14:00
//         end: "2024-12-13T15:30:00", // 금요일 15:30
//     },
//     {
//         id: "e5",
//         staffId: "4",
//         title: "Checkup",
//         start: "2024-12-14T09:00:00", // 토요일 09:00
//         end: "2024-12-14T09:30:00", // 토요일 09:30
//     },
//     {
//         id: "e6",
//         staffId: "5",
//         title: "Consultation",
//         start: "2024-12-09T11:00:00", // 월요일 11:00
//         end: "2024-12-09T11:30:00", // 월요일 11:30
//     },
//     {
//         id: "e7",
//         staffId: "6",
//         title: "X-Ray Review",
//         start: "2024-12-12T13:00:00", // 목요일 13:00
//         end: "2024-12-12T13:45:00", // 목요일 13:45
//     },
//     {
//         id: "e8",
//         staffId: "7",
//         title: "Operation",
//         start: "2024-12-10T10:00:00", // 화요일 10:00
//         end: "2024-12-10T11:00:00", // 화요일 11:00
//     },
//     {
//         id: "e9",
//         staffId: "8",
//         title: "Discussion",
//         start: "2024-12-11T15:00:00", // 수요일 15:00
//         end: "2024-12-11T16:00:00", // 수요일 16:00
//     },
//     {
//         id: "e10",
//         staffId: "9",
//         title: "Evaluation",
//         start: "2024-12-13T14:30:00", // 금요일 14:30
//         end: "2024-12-13T15:00:00", // 금요일 15:00
//     },
//     {
//         id: "e11",
//         staffId: "10",
//         title: "Research",
//         start: "2024-12-12T10:00:00", // 목요일 10:00
//         end: "2024-12-12T12:00:00", // 목요일 12:00
//     },
//     {
//         id: "e12",
//         staffId: "1",
//         title: "Patient Rounds",
//         start: "2024-12-10T13:00:00", // 화요일 13:00
//         end: "2024-12-10T14:00:00", // 화요일 14:00
//     },
//     {
//         id: "e13",
//         staffId: "2",
//         title: "Team Meeting",
//         start: "2024-12-13T09:00:00", // 금요일 09:00
//         end: "2024-12-13T10:00:00", // 금요일 10:00
//     },
//     {
//         id: "e14",
//         staffId: "3",
//         title: "Clinic",
//         start: "2024-12-09T14:00:00", // 월요일 14:00
//         end: "2024-12-09T16:00:00", // 월요일 16:00
//     },
//     {
//         id: "e15",
//         staffId: "4",
//         title: "Training",
//         start: "2024-12-11T09:00:00", // 수요일 09:00
//         end: "2024-12-11T10:00:00", // 수요일 10:00
//     },
//     {
//         id: "e16",
//         staffId: "5",
//         title: "Paperwork",
//         start: "2024-12-14T13:00:00", // 토요일 13:00
//         end: "2024-12-14T14:00:00", // 토요일 14:00
//     },
// ];

export default function OwnerSchedule() {
    const startOfWeek = "2024-12-08"; // 2024년 12월 2주차 시작일 (일요일)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Staff Schedule
            </h1>
            <div className="p-4">
                {/* <StaffScheduleCalendar
                    staff={sampleStaff}
                    events={sampleEvents}
                    startOfWeek={startOfWeek}
                /> */}
            </div>
        </div>
    );
}
