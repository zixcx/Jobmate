// ./components/TimeTable/types.ts
import dayjs from "dayjs";

export interface Event {
    title: string;
    weekday: string;
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    store: string;
    bg_color: string;
}
