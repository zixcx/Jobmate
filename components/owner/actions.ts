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
                staff: {
                    include: {
                        user: true, // User 정보 포함
                    },
                },
            },
        });

        // 필터링: staff 또는 user가 null인 데이터를 제거
        const validApplications = pendingApplications.filter(
            (assignment) =>
                assignment.staff !== null && assignment.staff.user !== null
        );

        return validApplications.map((assignment) => ({
            id: assignment.staff!.id,
            name: assignment.staff!.name,
            avatar: assignment.staff!.user!.avatar,
            role: assignment.role,
            storeId: assignment.storeId, // storeId 추가
        }));
    } catch (error) {
        console.error("Error fetching pending applications:", error);
        throw new Error("Failed to fetch pending applications");
    }
}

export async function handleStaffApplication(
    staffId: string,
    storeId: string, // storeId 파라미터 추가
    status: "ACCEPTED" | "REJECTED"
) {
    try {
        const session = await getSession();
        if (!session.id) throw new Error("Not authenticated");

        // 현재 owner가 해당 store의 소유자인지 확인
        const owner = await db.owner.findUnique({
            where: {
                userId: session.id,
                store: {
                    id: storeId,
                },
            },
            include: { store: true },
        });

        if (!owner) {
            throw new Error("You are not authorized to perform this action");
        }

        const staffAssignments = await db.staffAssignment.findMany({
            where: {
                staffId: staffId,
                storeId: storeId, // storeId 추가
            },
        });

        if (staffAssignments.length === 0) {
            throw new Error("Staff assignment not found");
        }

        // 여러 개의 StaffAssignment 업데이트
        await Promise.all(
            staffAssignments.map(async (assignment) => {
                await db.staffAssignment.update({
                    where: { id: assignment.id },
                    data: { status },
                });
            })
        );

        revalidatePath("/owner/home");
    } catch (error) {
        console.error("Error handling staff application:", error);
        throw new Error("Failed to update staff application status");
    }
}

export async function getStaffList() {
    try {
        const session = await getSession();
        if (!session.id) throw new Error("Not authenticated");

        // 현재 owner와 관련된 store를 가져옴
        const owner = await db.owner.findUnique({
            where: { userId: session.id },
            include: { store: true },
        });

        if (!owner || !owner.store) {
            throw new Error("Owner or store not found");
        }

        const staffList = await db.staffAssignment.findMany({
            where: {
                storeId: owner.store.id, // owner의 storeId와 일치하는 staffAssignment만 가져옴
                status: "ACCEPTED",
            },
            include: {
                staff: {
                    include: {
                        user: true, // User 정보 포함
                    },
                },
            },
        });

        // staff 또는 user가 null인 경우를 필터링
        const validStaffList = staffList.filter(
            (assignment) =>
                assignment.staff !== null && assignment.staff.user !== null
        );

        return validStaffList.map((assignment) => ({
            id: assignment.staff!.id,
            name: assignment.staff!.name,
            avatar: assignment.staff!.user!.avatar, // 아바타 정보 추가
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
