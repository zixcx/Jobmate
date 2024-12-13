"use client";

import { useCallback, useState, useEffect } from "react";
import SearchInput from "@/components/search_input";
import StoreCarousel from "@/components/store_carousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStores, applyForStore } from "./actions";
import Modal from "@/components/modal/modal";
import StoreCard from "@/components/store_card";
import { debounce } from "lodash";

interface Store {
    id: string;
    store_name: string;
    owner_name: string;
    store_tag: string;
    store_address: string;
    store_detail_address: string | null;
}

export default function StaffWork() {
    const [stores, setStores] = useState<Store[]>([]);
    const [searchedStores, setSearchedStores] = useState<Store[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showStoreSearchModal, setShowStoreSearchModal] = useState(false);
    const [showTimeTableModal, setShowTimeTableModal] = useState(false);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                // getStores를 직접 사용
                const initialStores = await getStores("");
                setStores(initialStores);
            } catch (error) {
                console.error("Error fetching stores:", error);
                // 에러 처리 로직
            }
        };

        fetchStores();
    }, []); // 의존성 배열 비움

    // handleSearch 함수의 useCallback 의존성 배열에 getStores를 직접 추가
    const handleSearch = useCallback(
        debounce(async (query: string) => {
            const trimmedQuery = query.trim();

            if (trimmedQuery === "") {
                setSearchedStores([]);
                setNoResults(false);
                return;
            }

            // getStores를 직접 사용
            const result = await getStores(trimmedQuery);
            setSearchedStores(result);
            setNoResults(result.length === 0);
        }, 300),
        [getStores] // 의존성 배열에 getStores 추가
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
            <div className="w-full">
                <div className="flex flex-col gap-6 w-full">
                    <div className="bg-white box w-full">
                        <h2 className="title mb-4">가게 등록 ✅</h2>
                        <button
                            onClick={() => setShowStoreSearchModal(true)}
                            className="btn"
                        >
                            <MagnifyingGlassIcon width={16} />
                            <span>찾으러 가기</span>
                        </button>
                        <h2 className="title mb-4">추천 가게 🏬</h2>
                        {stores.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-4 w-full">
                                {/* <p className="text-center">
                                    연결된 근무지가 없어요 🙀
                                </p> */}
                                <button
                                    onClick={() =>
                                        setShowStoreSearchModal(true)
                                    }
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
                </div>
                {/* <div className="bg-white box flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between items-center mb-4">
                        <span className="text-xl font-semibold">시간표</span>
                        <button
                            onClick={() => setShowTimeTableModal(true)}
                            className="p-2 hover:bg-neutral-100 rounded-lg active:bg-neutral-200 transition-colors"
                        >
                            <PlusIcon
                                width={20}
                                style={{ strokeWidth: "1.75" }}
                            />
                        </button>
                    </div>

                    <TimeTable events={sampleEvents} />
                </div> */}
            </div>

            {/* Store Search Modal */}
            <Modal
                show={showStoreSearchModal} // show prop 추가
                onClose={() => setShowStoreSearchModal(false)}
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
                                <strong>가게이름+태그</strong>로 검색해 보세요!
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

            {/* Time Table Modal */}
            <Modal
                show={showTimeTableModal} // show prop 추가
                onClose={() => setShowTimeTableModal(false)}
                width="450px"
                height="650px"
                closeButtonVisible
            >
                모달 내용~
            </Modal>
        </div>
    );
}
