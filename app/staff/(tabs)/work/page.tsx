"use client";

import SearchInput from "@/components/search_input";
import StoreCarousel from "@/components/store_carousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TimeTable from "@/components/time_table/time_table";
import Modal from "@/components/modal/modal";
import { useState, useEffect } from "react";
import { getStores } from "./action";

interface Store {
    id: number;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
    bg_color: string;
}

export default function StaffWork() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        async function fetchStores() {
            const data = await getStores();
            setStores(data);
        }
        fetchStores();
    }, []);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col w-full gap-3 p-10">
            <span className="title-lg">근무</span>
            <div className="flex flex-col items-center justify-center w-full gap-3 bg-white box">
                <span className="self-start title">알림 🔔</span>
                {stores.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <span>연결된 근무지가 없어요 🙀</span>
                        <button
                            onClick={handleModalOpen}
                            className="btn flex items-center gap-1"
                        >
                            <MagnifyingGlassIcon width={16} />
                            <span>찾으러 가기</span>
                        </button>
                    </div>
                )}
            </div>

            {stores.length !== 0 && <StoreCarousel stores={stores} />}

            <div className="flex flex-col gap-3 bg-white box">
                <span className="title">시간표</span>
                <div className="w-full max-w-md h-[512px] border rounded-md overflow-hidden flex justify-center items-center">
                    <TimeTable />
                </div>
            </div>

            {isModalOpen && (
                <Modal onClose={handleModalClose} width="450px" height="650px">
                    <div className="flex flex-col w-full h-full gap-2">
                        <SearchInput placeholder="근무지를 검색해 보세요!" />
                        <div className="box !py-2 bg-neutral-50 flex gap-2">
                            <span className="text-xs text-neutral-400">
                                알려드려요 📢
                            </span>
                            <div className="w-px h-full bg-neutral-300" />
                            <span className="text-xs text-neutral-400">
                                사장님의 전화번호 또는 가게이름+태그로 검색해
                                보세요!
                            </span>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
