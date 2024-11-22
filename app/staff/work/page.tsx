// ./app/staff/work/page.tsx
"use client";

import { useCallback, useState } from "react";
import SearchInput from "@/components/search_input";
import StoreCarousel from "@/components/store_carousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TimeTable from "@/components/time_table/time_table";
import { getStores, applyForStore } from "./action";
import Modal from "@/components/modal/modal";
import StoreCard from "@/components/store_card";
import { debounce } from "lodash";

interface Store {
    id: string;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
    store_detail_address: string | null;
    bg_color: string;
}

export default function StaffWork() {
    const [stores, setStores] = useState<Store[]>([]);
    const [searchedStores, setSearchedStores] = useState<Store[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = useCallback(
        debounce(async (query: string) => {
            const trimmedQuery = query.trim();

            if (trimmedQuery === "") {
                setSearchedStores([]);
                setNoResults(false);
                return;
            }

            const result = await getStores(trimmedQuery);
            setSearchedStores(result);
            setNoResults(result.length === 0);
        }, 300),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        handleSearch(value);
    };

    const handleApply = async (storeId: string) => {
        try {
            const response = await applyForStore(storeId);
            alert(response.message);
            // Remove the applied store from the searchedStores list
            setSearchedStores((prevStores) =>
                prevStores.filter((store) => store.id !== storeId)
            );
        } catch (error) {
            alert("가입 신청 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col w-full gap-3 p-10">
            <span className="title-lg">근무</span>
            <div className="flex flex-col items-center justify-center w-full gap-3 bg-white box">
                <span className="self-start title">알림 🔔</span>
                {stores.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <span>연결된 근무지가 없어요 🙀</span>

                        <button
                            onClick={() => setShowModal(true)}
                            className="btn"
                        >
                            <MagnifyingGlassIcon width={16} />
                            <span>찾으러 가기</span>
                        </button>

                        {showModal && (
                            <Modal
                                onClose={() => setShowModal(false)}
                                closeButtonVisible
                                width="450px"
                                height="650px"
                            >
                                <div className="flex flex-col w-full h-full gap-2">
                                    <div className="flex gap-2 w-full items-center justify-center">
                                        <SearchInput
                                            placeholder="근무지를 검색해 보세요!"
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                            className="w-full"
                                        />
                                    </div>
                                    {searchQuery.trim() === "" && (
                                        <div className="box !py-2 bg-neutral-50 flex gap-4 mt-4">
                                            <span className="text-xs text-neutral-400 whitespace-nowrap flex justify-center items-center">
                                                알려드려요 📢
                                            </span>
                                            <div className="w-px h-full bg-neutral-300" />
                                            <span className="text-xs text-neutral-400">
                                                사장님의 <strong>이름</strong>{" "}
                                                또는 <strong>전화번호</strong>{" "}
                                                혹은{" "}
                                                <strong>가게이름+태그</strong>로
                                                검색해 보세요!
                                            </span>
                                        </div>
                                    )}
                                    {searchedStores.length > 0 && (
                                        <div className="flex flex-col gap-2 mt-4">
                                            {searchedStores.map((store) => (
                                                <StoreCard
                                                    key={store.id}
                                                    {...store}
                                                    store_detail_address={
                                                        store.store_detail_address ||
                                                        ""
                                                    }
                                                    onApply={handleApply}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    {searchQuery.trim() !== "" && noResults && (
                                        <div className="text-center text-sm text-neutral-400 mt-4">
                                            검색 결과가 없습니다. 😥
                                        </div>
                                    )}
                                </div>
                            </Modal>
                        )}
                    </div>
                )}
            </div>
            {stores.length !== 0 && <StoreCarousel stores={stores} />}
            <div className="flex flex-col gap-3 bg-white box">
                <TimeTable />
            </div>
        </div>
    );
}
