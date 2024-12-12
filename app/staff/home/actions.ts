// ./app/staff/home/actions.ts
"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { StaffAssignment, Schedule } from "@prisma/client";
import dayjs from "dayjs";

interface StaffHomeData {
    expectedWage: number;
    totalWorkHours: number;
    registeredJobs: number;
}

export const getStaffHomeData = async (): Promise<StaffHomeData> => {
    const session = await getSession();
    const user = session.id;

    const staff = await db.user.findUnique({
        where: { id: user },
        select: {
            staff: {
                include: {
                    assignments: {
                        where: {
                            status: "ACCEPTED",
                        },
                        include: {
                            store: true,
                        },
                    },
                    schedules: {
                        where: {
                            start: {
                                gte: dayjs().startOf("month").toDate(),
                                lte: dayjs().endOf("month").toDate(),
                            },
                        },
                    },
                },
            },
        },
    });

    if (!staff || !staff.staff) {
        return {
            expectedWage: 0,
            totalWorkHours: 0,
            registeredJobs: 0,
        };
    }

    const expectedWage = staff.staff.assignments.reduce(
        (sum, assignment) => sum + assignment.hourly_wage,
        0
    );
    const totalWorkHours = staff.staff.schedules.reduce(
        (sum, schedule) =>
            sum + dayjs(schedule.end).diff(dayjs(schedule.start), "hour"),
        0
    );
    const registeredJobs = staff.staff.assignments.length;

    return { expectedWage, totalWorkHours, registeredJobs };
};

export const getWageChartData = async () => {
    const session = await getSession();
    const user = session.id;

    const staffData = await db.user.findUnique({
        where: { id: user },
        select: {
            staff: {
                include: {
                    assignments: {
                        where: {
                            status: "ACCEPTED",
                        },
                        include: {
                            store: true,
                        },
                    },
                    schedules: {
                        where: {
                            start: {
                                gte: dayjs()
                                    .subtract(3, "month")
                                    .startOf("month")
                                    .toDate(),
                            },
                        },
                    },
                },
            },
        },
    });

    if (!staffData || !staffData.staff) {
        return {
            wageData: { labels: [], datasets: [] },
            recentThreeMonthsWageData: { labels: [], datasets: [] },
            recentThreeMonthsHoursData: { labels: [], datasets: [] },
        };
    }

    const labels = staffData.staff.assignments.map(
        (assignment) => assignment.store.store_name
    );
    const currentMonth = dayjs().month() + 1; // 0-indexed to 1-indexed
    const lastThreeMonths = [
        currentMonth - 2,
        currentMonth - 1,
        currentMonth,
    ].map((month) => (month <= 0 ? month + 12 : month));

    const wageData = calculateWageData(
        staffData.staff.assignments,
        staffData.staff.schedules,
        [currentMonth],
        labels
    );
    const recentThreeMonthsWageData = calculateWageData(
        staffData.staff.assignments,
        staffData.staff.schedules,
        lastThreeMonths,
        labels
    );
    const recentThreeMonthsHoursData = calculateHoursData(
        staffData.staff.assignments,
        staffData.staff.schedules,
        lastThreeMonths,
        labels
    );

    return {
        wageData,
        recentThreeMonthsWageData,
        recentThreeMonthsHoursData,
    };
};

function calculateWageData(
    assignments: (StaffAssignment & { store: { store_name: string } })[],
    schedules: Schedule[],
    months: number[],
    labels: string[]
) {
    const colors = generateColors(labels.length);
    const borderColors = generateBorderColors(labels.length);

    return {
        labels,
        datasets: [
            {
                label: "급여 데이터",
                backgroundColor: colors,
                borderColor: borderColors,
                data: labels.map((label) => {
                    const assignment = assignments.find(
                        (a) => a.store.store_name === label
                    );
                    if (!assignment) return 0;

                    return schedules.reduce((acc, schedule) => {
                        if (
                            schedule.storeId === assignment.storeId &&
                            months.includes(dayjs(schedule.start).month() + 1)
                        ) {
                            const hours = dayjs(schedule.end).diff(
                                dayjs(schedule.start),
                                "hour"
                            );
                            return acc + hours * assignment.hourly_wage;
                        }
                        return acc;
                    }, 0);
                }),
            },
        ],
    };
}

function calculateHoursData(
    assignments: (StaffAssignment & { store: { store_name: string } })[],
    schedules: Schedule[],
    months: number[],
    labels: string[]
) {
    const colors = generateColors(labels.length);
    const borderColors = generateBorderColors(labels.length);

    return {
        labels,
        datasets: [
            {
                label: "최근 3개월 근무 시간 데이터",
                backgroundColor: colors,
                borderColor: borderColors,
                data: labels.map((label) => {
                    const assignment = assignments.find(
                        (a) => a.store.store_name === label
                    );
                    if (!assignment) return 0;

                    return schedules.reduce((acc, schedule) => {
                        if (
                            schedule.storeId === assignment.storeId &&
                            months.includes(dayjs(schedule.start).month() + 1)
                        ) {
                            return (
                                acc +
                                dayjs(schedule.end).diff(
                                    dayjs(schedule.start),
                                    "hour"
                                )
                            );
                        }
                        return acc;
                    }, 0);
                }),
            },
        ],
    };
}

function generateColors(count: number) {
    const colors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(201, 203, 207, 0.5)",
        "rgba(100, 100, 255, 0.5)",
        "rgba(200, 200, 100, 0.5)",
        "rgba(100, 200, 150, 0.5)",
    ];
    return colors.slice(0, count);
}

function generateBorderColors(count: number) {
    const borderColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(201, 203, 207, 1)",
        "rgba(100, 100, 255, 1)",
        "rgba(200, 200, 100, 1)",
        "rgba(100, 200, 150, 1)",
    ];
    return borderColors.slice(0, count);
}
