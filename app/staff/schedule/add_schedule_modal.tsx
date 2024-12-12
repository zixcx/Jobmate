"use client";

import { useState, useEffect } from "react";

import dayjs from "dayjs";
import { StaffAssignment } from "@prisma/client";
import Modal from "@/components/modal/modal";
import { createSchedule } from "@/components/schedule/actions";

interface AddScheduleModalProps {
    showModal: boolean;
    onClose: () => void;
    currentDate: dayjs.Dayjs;
    assignments: (StaffAssignment & { store: { store_name: string } })[];
}

export default function AddScheduleModal({
    showModal,
    onClose,
    currentDate,
    assignments,
}: AddScheduleModalProps) {
    const [selectedStoreId, setSelectedStoreId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<dayjs.Dayjs>(currentDate);
    const [endDate, setEndDate] = useState<dayjs.Dayjs>(currentDate);
    const [startTime, setStartTime] = useState<string>("09:00");
    const [endTime, setEndTime] = useState<string>("18:00");
    const [isAllDay, setIsAllDay] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setStartDate(currentDate);
        setEndDate(currentDate);
    }, [currentDate]);

    const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStoreId(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleStartDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStartDate(dayjs(event.target.value));
    };

    const handleEndDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndDate(dayjs(event.target.value));
    };

    const handleStartTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndTime(event.target.value);
    };

    const handleIsAllDayChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsAllDay(event.target.checked);
    };

    const handleSubmit = async () => {
        if (!selectedStoreId || !title) {
            setError("가게와 일정 제목은 필수 입력 항목입니다.");
            return;
        }

        const start = isAllDay
            ? startDate.startOf("day")
            : startDate
                  .set("hour", parseInt(startTime.split(":")[0]))
                  .set("minute", parseInt(startTime.split(":")[1]));
        const end = isAllDay
            ? endDate.endOf("day")
            : endDate
                  .set("hour", parseInt(endTime.split(":")[0]))
                  .set("minute", parseInt(endTime.split(":")[1]));

        const result = await createSchedule({
            storeId: selectedStoreId,
            title,
            start: start.toDate(),
            end: end.toDate(),
            isAllDay,
        });

        if (result.error) {
            setError(result.error);
        } else {
            onClose();
            window.location.reload();
        }
    };

    return (
        <Modal
            onClose={onClose}
            closeButtonVisible
            width="450px"
            height="650px"
            show={showModal} // showModal prop을 Modal 컴포넌트에 전달
        >
            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    일정 추가
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <label
                        htmlFor="store"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        가게 선택
                    </label>
                    <select
                        id="store"
                        value={selectedStoreId}
                        onChange={handleStoreChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">가게를 선택하세요</option>
                        {assignments.map((assignment) => (
                            <option
                                key={assignment.id}
                                value={assignment.storeId}
                            >
                                {assignment.store.store_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        일정 제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="일정 제목을 입력하세요"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="startDate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        시작 날짜
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate.format("YYYY-MM-DD")}
                        onChange={handleStartDateChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="endDate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        종료 날짜
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate.format("YYYY-MM-DD")}
                        onChange={handleEndDateChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="startTime"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        시작 시간
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        value={startTime}
                        disabled={isAllDay}
                        onChange={handleStartTimeChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="endTime"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        종료 시간
                    </label>
                    <input
                        type="time"
                        id="endTime"
                        value={endTime}
                        disabled={isAllDay}
                        onChange={handleEndTimeChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="checkbox"
                        id="isAllDay"
                        checked={isAllDay}
                        onChange={handleIsAllDayChange}
                        className="mr-2"
                    />
                    <label
                        htmlFor="isAllDay"
                        className="text-sm font-medium text-gray-900"
                    >
                        하루 종일
                    </label>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    일정 추가
                </button>
            </div>
        </Modal>
    );
}
