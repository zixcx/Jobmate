// ./app/staff/schedule/actions.ts
"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export interface ThisWeekSummary {
    totalWorkingDays: number;
    totalWorkingHours: number;
}

export interface UpcomingSchedule {
    date: string;
    startTime: string;
    endTime: string;
    storeName: string;
}

export interface CreateScheduleParams {
    storeId: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
}

export const createSchedule = async ({
    storeId,
    title,
    start,
    end,
    isAllDay,
}: CreateScheduleParams) => {
    const session = await getSession();
    const userId = session.id;

    try {
        const staff = await db.user.findUnique({
            where: { id: userId },
            select: { staff: { select: { id: true } } },
        });

        if (!staff || !staff.staff) {
            return { error: "직원 정보를 찾을 수 없습니다." };
        }

        await db.schedule.create({
            data: {
                staffId: staff.staff.id,
                storeId,
                title,
                start,
                end,
                isAllDay,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "일정 추가 중 오류가 발생했습니다." };
    }
};

export const getThisWeekSummary = async (): Promise<ThisWeekSummary> => {
    const session = await getSession();
    const userId = session.id;

    const startOfWeek = dayjs().startOf("week").toDate();
    const endOfWeek = dayjs().endOf("week").toDate();

    const staff = await db.user.findUnique({
        where: { id: userId },
        select: {
            staff: {
                include: {
                    schedules: {
                        where: {
                            start: {
                                gte: startOfWeek,
                                lte: endOfWeek,
                            },
                        },
                        include: {
                            store: true,
                        },
                    },
                },
            },
        },
    });

    if (!staff || !staff.staff) {
        return { totalWorkingDays: 0, totalWorkingHours: 0 };
    }

    const schedules = staff.staff.schedules;

    const totalWorkingDays = new Set(
        schedules.map((schedule) => dayjs(schedule.start).format("YYYY-MM-DD"))
    ).size;

    const totalWorkingHours = schedules.reduce(
        (total, schedule) =>
            total + dayjs(schedule.end).diff(schedule.start, "hour"),
        0
    );

    return { totalWorkingDays, totalWorkingHours };
};

export const getUpcomingSchedules = async (): Promise<UpcomingSchedule[]> => {
    const session = await getSession();
    const userId = session.id;

    const today = dayjs().toDate();

    const staff = await db.user.findUnique({
        where: { id: userId },
        select: {
            staff: {
                include: {
                    schedules: {
                        where: {
                            start: {
                                gte: today,
                            },
                        },
                        orderBy: {
                            start: "asc",
                        },
                        take: 2,
                        include: {
                            store: true,
                        },
                    },
                },
            },
        },
    });

    if (!staff || !staff.staff) {
        return [];
    }

    const schedules = staff.staff.schedules;

    return schedules.map((schedule) => ({
        date: dayjs(schedule.start).format("YYYY-MM-DD"),
        startTime: dayjs(schedule.start).format("HH:mm"),
        endTime: dayjs(schedule.end).format("HH:mm"),
        storeName: schedule.store.store_name,
    }));
};

export const getWeekSchedules = async (date: string) => {
    const session = await getSession();
    const userId = session.id;

    const startOfWeek = dayjs(date).startOf("week").toDate();
    const endOfWeek = dayjs(date).endOf("week").toDate();

    const staff = await db.user.findUnique({
        where: { id: userId },
        select: {
            staff: {
                include: {
                    schedules: {
                        where: {
                            start: {
                                gte: startOfWeek,
                                lte: endOfWeek,
                            },
                        },
                        include: {
                            store: true,
                        },
                    },
                },
            },
        },
    });

    if (!staff || !staff.staff) {
        return [];
    }

    return staff.staff.schedules;
};

export const getStaffAssignments = async () => {
    const session = await getSession();
    const userId = session.id;

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                staff: {
                    select: {
                        assignments: {
                            where: {
                                status: "ACCEPTED",
                            },
                            include: {
                                store: {
                                    select: {
                                        store_name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user || !user.staff) {
            return [];
        }

        return user.staff.assignments;
    } catch (error) {
        console.error(error);
        return [];
    }
};
