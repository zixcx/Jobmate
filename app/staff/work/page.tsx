import SearchInput from "@/components/search_input";

export default function StaffWork() {
    return (
        <div className="relative w-full h-[calc(100vh-72px)] p-5 group">
            <SearchInput
                className="absolute w-3/4 transition-all duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 focus-within:top-0 focus-within:translate-y-1/2"
                placeholder="근무지를 검색해 주세요!"
                type="search"
                name="store_search"
                id="store_search"
                autoComplete="off"
            />
            {/* mt 계산: SearchInput 높이 + SearchInput 높이의 절반 */}
            <div className="w-full h-[calc(100%-50px)] mt-[75px] opacity-0 invisible transition-opacity duration-1000 group-focus-within:opacity-100 group-focus-within:visible">
                contents div is here
            </div>
        </div>
    );
}
