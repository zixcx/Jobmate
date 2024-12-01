// ./app/staff/work/page.tsx
"use client";

import { useCallback, useState } from "react";
import SearchInput from "@/components/search_input";
import StoreCarousel from "@/components/store_carousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStores, applyForStore } from "./action";
import Modal from "@/components/modal/modal";
import StoreCard from "@/components/store_card";
import { debounce } from "lodash";
import TimeTable from "@/components/TimeTable";

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
        debounce((query: string) => {
            const trimmedQuery = query.trim();

            if (trimmedQuery === "") {
                setSearchedStores([]);
                setNoResults(false);
                return;
            }

            getStores(trimmedQuery).then((result) => {
                setSearchedStores(result);
                setNoResults(result.length === 0);
            });
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
            setSearchedStores((prevStores) =>
                prevStores.filter((store) => store.id !== storeId)
            );
        } catch {
            alert("가입 신청 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col w-full gap-6 p-10">
            <h1 className="title-lg">근무</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <div className="bg-white box">
                        <h2 className="title mb-4">알림 🔔</h2>
                        {stores.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p className="text-center">
                                    연결된 근무지가 없어요 🙀
                                </p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn"
                                >
                                    <MagnifyingGlassIcon width={16} />
                                    <span>찾으러 가기</span>
                                </button>
                            </div>
                        ) : (
                            <StoreCarousel stores={stores} />
                        )}
                    </div>
                    {/* Add more components or information here */}
                    <div className="bg-white box">
                        <h2 className="title mb-4">근무 통계</h2>
                        <p>여기에 근무 통계 정보를 추가할 수 있습니다.</p>
                    </div>
                </div>
                <div className="bg-white box">
                    <TimeTable />
                </div>
            </div>

            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    closeButtonVisible
                    width="450px"
                    height="650px"
                >
                    <div className="flex flex-col w-full h-full gap-4 p-5">
                        <SearchInput
                            placeholder="근무지를 검색해 보세요!"
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                        {searchQuery.trim() === "" && (
                            <div className="bg-neutral-50 p-4 rounded-lg border">
                                <p className="text-sm text-neutral-600">
                                    <span className="font-semibold">
                                        알려드려요 📢
                                    </span>
                                    <br />
                                    사장님의 <strong>이름</strong> 또는{" "}
                                    <strong>전화번호</strong> 혹은{" "}
                                    <strong>가게이름+태그</strong>로 검색해
                                    보세요!
                                </p>
                            </div>
                        )}
                        {searchedStores.length > 0 && (
                            <div className="flex flex-col gap-4 overflow-y-auto">
                                {searchedStores.map((store) => (
                                    <StoreCard
                                        key={store.id}
                                        {...store}
                                        store_detail_address={
                                            store.store_detail_address || ""
                                        }
                                        onApply={handleApply}
                                    />
                                ))}
                            </div>
                        )}
                        {searchQuery.trim() !== "" && noResults && (
                            <p className="text-center text-sm text-neutral-400">
                                검색 결과가 없습니다. 😥
                            </p>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}
