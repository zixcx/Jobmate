// ./components/TimeTable/types.ts
import dayjs from "dayjs";

export interface Event {
    title: string;
    subtitle: string; // subtitle 추가
    weekday: string;
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    // bg_color 속성 제거
}

export type Weekday = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
