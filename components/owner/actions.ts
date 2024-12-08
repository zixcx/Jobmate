// ./components/owner/actions.ts
"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getPendingApplications() {
    try {
        const session = await getSession();
        if (!session.id) throw new Error("Not authenticated");

        const owner = await db.owner.findUnique({
            where: { userId: session.id },
            include: { store: true },
        });

        if (!owner || !owner.store) {
            throw new Error("Owner or store not found");
        }

        const pendingApplications = await db.staffAssignment.findMany({
            where: {
                storeId: owner.store.id,
                status: "PENDING",
            },
            include: {
                staff: true,
            },
        });

        // 필터링: staff가 null인 데이터를 제거
        const validApplications = pendingApplications.filter(
            (assignment) => assignment.staff !== null
        );

        return validApplications.map((assignment) => ({
            id: assignment.staff!.id,
            name: assignment.staff!.name,
            role: assignment.role,
        }));
    } catch (error) {
        console.error("Error fetching pending applications:", error);
        throw new Error("Failed to fetch pending applications");
    }
}

export async function handleStaffApplication(
    id: string,
    status: "ACCEPTED" | "REJECTED"
) {
    try {
        await db.staffAssignment.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/owner/home");
    } catch (error) {
        console.error("Error handling staff application:", error);
        throw new Error("Failed to update staff application status");
    }
}

export async function getStaffList() {
    try {
        const staffList = await db.staffAssignment.findMany({
            where: { status: "ACCEPTED" },
            include: {
                staff: true,
            },
        });

        return staffList.map((assignment) => ({
            id: assignment.staff?.id || null, // staff가 null일 경우 대비
            name: assignment.staff?.name || "Unknown", // 이름 처리
            role: assignment.role,
        }));
    } catch (error) {
        console.error("Error fetching staff list:", error);
        throw new Error("Failed to fetch staff list");
    }
}

export async function updateStaffPermission(id: string, newRole: string) {
    try {
        await db.staffAssignment.update({
            where: { id },
            data: { role: newRole },
        });
        revalidatePath("/owner/work");
    } catch (error) {
        console.error("Error updating staff permission:", error);
        throw new Error("Failed to update staff permission");
    }
}

export async function getMonthlyPaymentSummary() {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        const schedules = await db.schedule.findMany({
            where: {
                start: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth,
                },
            },
            include: {
                staff: {
                    include: {
                        assignments: true,
                    },
                },
            },
        });

        let totalAmount = 0;
        const staffSet = new Set();

        schedules.forEach((schedule) => {
            const assignment = schedule.staff?.assignments.find(
                (a) => a.storeId === schedule.storeId
            );
            if (assignment) {
                const hours =
                    (schedule.end.getTime() - schedule.start.getTime()) /
                    (1000 * 60 * 60);
                totalAmount += hours * assignment.hourly_wage;
                staffSet.add(schedule.staffId);
            }
        });

        return {
            totalAmount: Math.round(totalAmount),
            staffCount: staffSet.size,
        };
    } catch (error) {
        console.error("Error fetching monthly payment summary:", error);
        throw new Error("Failed to fetch monthly payment summary");
    }
}

export async function getStaffPermissions() {
    try {
        const staffPermissions = await db.staffAssignment.findMany({
            where: { status: "ACCEPTED" },
            include: {
                staff: true,
            },
        });

        return staffPermissions.map((assignment) => ({
            id: assignment.staff?.id || "unknown", // 기본값 설정
            name: assignment.staff?.name || "Unknown", // 기본값 설정
            role: assignment.role,
        }));
    } catch (error) {
        console.error("Error fetching staff permissions:", error);
        throw new Error("Failed to fetch staff permissions");
    }
}

export async function getStaffSchedules() {
    try {
        const schedules = await db.schedule.findMany({
            include: {
                staff: true, // 직원 정보를 포함하여 가져오기
            },
        });

        return schedules.map((schedule) => ({
            id: schedule.id,
            title: `${schedule.staff?.name || "Unknown"} - ${schedule.title}`,
            start: schedule.start.toISOString(),
            end: schedule.end.toISOString(),
            staffId: schedule.staffId,
        }));
    } catch (error) {
        console.error("Error fetching staff schedules:", error);
        throw new Error("Failed to fetch staff schedules");
    }
}
