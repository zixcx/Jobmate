// ./components/TimeTable/types.ts

import { Dayjs } from "dayjs";

export interface Event {
    title: string;
    weekday: Weekday;
    start: Dayjs;
    end: Dayjs;
    subtitle?: string;
}

export type Weekday = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
