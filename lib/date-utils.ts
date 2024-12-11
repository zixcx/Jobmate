// ./lib/date-utils.ts
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export function getWeekDates(date: dayjs.Dayjs) {
    const startOfWeek = date.startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
}

export function formatWeekTitle(date: dayjs.Dayjs) {
    const year = date.format("YYYY년");
    const month = date.format("M월");
    const weekNumber = date.day();
    return `${year} ${month} ${weekNumber}주차`;
}
