import ModalButton from "@/components/modal/modal_button";
import SearchInput from "@/components/search_input";
import StoreCarousel from "@/components/store_carousel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TimeTable from "@/components/time_table/time_table";

interface Store {
    id: number;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
    bg_color: string;
}

export default function StaffWork() {
    const stores: Store[] = [
        {
            id: 1,
            store_name: "store1",
            store_tag: "1000",
            owner_name: "john doe",
            store_address: "경기 성남시 분당구 판교역로 166",
            bg_color: "#3A6D8C",
        },
        {
            id: 2,
            store_name: "store2",
            store_tag: "1001",
            owner_name: "susan",
            store_address: "서울 강남구 테헤란로 131",
            bg_color: "#433878",
        },
        {
            id: 3,
            store_name: "store3",
            store_tag: "1002",
            owner_name: "kevin Rowen",
            store_address: "서울 강남구 테헤란로 133",
            bg_color: "#B7E0FF",
        },
        {
            id: 4,
            store_name: "잡메이트",
            store_tag: "1003",
            owner_name: "홍길동",
            store_address: "경기 성남시 분당구 불정로 6",
            bg_color: "#C0EBA6",
        },
        {
            id: 5,
            store_name: "카카카오",
            store_tag: "1004",
            owner_name: "손정의",
            store_address: "경기 성남시 분당구 불정로 19",
            bg_color: "#B17457",
        },
    ];

    return (
        <div className="flex flex-col w-full gap-3 p-10">
            <span className="title-lg">근무</span>
            <div className="flex flex-col items-center justify-center w-full gap-3 bg-white box">
                <span className="self-start title">알림 📢</span>
                {stores.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <span>연결된 근무지가 없어요 🙀</span>

                        <ModalButton
                            className="btn"
                            modalCloseBtnVisible
                            modalWidth="450px"
                            modalHeight="650px"
                            buttonChildren={
                                <>
                                    <MagnifyingGlassIcon width={16} />
                                    <span>찾으러 가기</span>
                                </>
                            }
                            modalChildren={
                                <>
                                    <SearchInput placeholder="근무지를 검색해 보세요!" />
                                </>
                            }
                        />
                    </div>
                )}
            </div>
            {stores.length !== 0 && <StoreCarousel stores={stores} />}
            <div className="flex flex-col gap-3 bg-white box">
                <span className="title">시간표</span>
                <div className="w-full max-w-md h-[512px] border rounded">
                    <TimeTable />
                </div>
            </div>
        </div>
    );
}
