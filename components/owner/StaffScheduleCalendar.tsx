// ./components/owner/StaffScheduleCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer, Views, View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getStaffSchedules } from "@/components/owner/actions";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set up the localizer
const localizer = dayjsLocalizer(dayjs);

interface Schedule {
    id: string;
    title: string;
    start: Date;
    end: Date;
    staffId: string;
}

export default function StaffScheduleCalendar() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 캘린더의 현재 날짜
    const [currentView, setCurrentView] = useState<View>(Views.MONTH); // 현재 보기 (View 타입)

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const data = await getStaffSchedules();
            setSchedules(
                data.map((schedule) => ({
                    ...schedule,
                    start: dayjs(schedule.start).toDate(),
                    end: dayjs(schedule.end).toDate(),
                }))
            );
        } catch (error) {
            console.error("Error fetching staff schedules:", error);
        }
    };

    // 캘린더의 날짜 변경 시 호출
    const handleNavigate = (date: Date) => {
        setCurrentDate(date);
    };

    // 보기(View) 변경 시 호출
    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    return (
        <div className="p-5 overflow-hidden border shadow-sm rounded-2xl bg-white h-[600px]">
            <Calendar
                localizer={localizer}
                events={schedules}
                startAccessor="start"
                endAccessor="end"
                date={currentDate} // 현재 날짜
                view={currentView} // 현재 보기
                onNavigate={handleNavigate} // 날짜 변경 핸들러
                onView={handleViewChange} // 보기 변경 핸들러
                style={{ height: "100%" }}
            />
        </div>
    );
}
