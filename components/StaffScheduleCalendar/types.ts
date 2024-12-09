import { type Dayjs } from "dayjs";

export type ViewMode = "week" | "month";

export interface Staff {
    id: string;
    name: string;
    role: string; // position -> role로 변경
    avatar: string;
}

export interface Event {
    id: string;
    staffId: string;
    title: string;
    start: string;
    end: string;
    color?: string;
}

export interface CalendarProps {
    staff: Staff[];
    events: Event[];
    initialDate?: Date;
    initialView?: ViewMode;
}

export interface HeaderProps {
    currentDate: Dayjs;
    view: ViewMode;
    onTodayClick: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
    onViewChange: (view: ViewMode) => void;
    onResourceWidthChange: (width: number) => void;
}

export interface TimeGridProps {
    staff: Staff[];
    events: Event[];
    currentDate: Dayjs;
    resourceWidth: number;
}

export interface StaffColumnProps {
    staff: Staff;
    events: Event[];
    date: Dayjs;
    width: number;
}
