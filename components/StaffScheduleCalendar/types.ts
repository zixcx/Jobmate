// ./components/StaffScheduleCalendar/types.ts

import { Dayjs } from "dayjs";

export interface Staff {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Event {
    id: string;
    staffId: string;
    title: string;
    start: Dayjs;
    end: Dayjs;
    weekday: Weekday;
    subtitle?: string;
}

export interface StaffScheduleCalendarProps {
    staffs: Staff[];
    events: Event[];
    initialWeek: number;
}

export type Weekday = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
