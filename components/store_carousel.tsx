// ./components/store_carousel.tsx
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTransition, animated } from "react-spring";

interface Store {
    id: string;
    store_name: string;
    store_tag: string;
    owner_name: string;
    store_address: string;
}

interface SearchStoreProps {
    stores: Store[];
}

// const DEFAULT_BG_COLOR = "bg-blue-100"; // 기본 배경색
// const DEFAULT_TEXT_COLOR = "text-blue-800"; // 기본 글자색

export default function StoreCarousel({ stores }: SearchStoreProps) {
    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % stores.length);
    };

    const prevSlide = () => {
        setSlideIndex(
            (prevIndex) => (prevIndex - 1 + stores.length) % stores.length
        );
    };

    const goToSlide = (index: number) => {
        setSlideIndex(index); // 클릭한 인디케이터의 인덱스 설정
    };

    const transitions = useTransition(slideIndex, {
        key: slideIndex,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
    });

    return (
        <div className="relative flex w-full overflow-hidden border shadow h-52 rounded-xl">
            {/* 슬라이드 */}
            <div className="flex flex-col items-center justify-center w-full h-full text-white">
                {transitions((style, index) => (
                    <animated.div
                        key={stores[index].id}
                        className="absolute flex flex-col items-center justify-center flex-shrink-0 w-full h-full bg-blue-100 text-blue-800"
                        style={{
                            ...style,
                            // backgroundColor: stores[index].bg_color,
                            // color: getContrastYIQ(stores[index].bg_color),
                        }}
                    >
                        <div className="flex flex-col items-center justify-center gap-1">
                            <span className="text-2xl font-bold">
                                {stores[index].store_name}#
                                {stores[index].store_tag}
                            </span>
                            <span>
                                <span className="font-semibold">
                                    {stores[index].owner_name}
                                </span>
                                <span> 사장님</span>
                            </span>
                            <span>{stores[index].store_address}</span>
                        </div>
                        <button className="h-10 mt-3 min-h-10 w-18 btn">
                            출근하기
                        </button>
                    </animated.div>
                ))}
            </div>

            {/* 이전 버튼 */}
            <button
                className="absolute left-0 p-2 h-52 pr-7 hover:from-white/10 hover:bg-gradient-to-r"
                onClick={prevSlide}
            >
                <ChevronLeftIcon width={20} />
            </button>

            {/* 다음 버튼 */}
            <button
                className="absolute right-0 p-2 h-52 pl-7 hover:from-white/10 hover:bg-gradient-to-l"
                onClick={nextSlide}
            >
                <ChevronRightIcon width={20} />
            </button>

            {/* 인디케이터 */}
            <div className="absolute flex gap-2 -translate-x-1/2 bottom-2 left-1/2">
                {stores.map((_, index) => (
                    <span
                        key={index}
                        className={`rounded-full w-2 h-2 cursor-pointer transition hover:scale-150 duration-300 ${
                            index === slideIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        onClick={() => goToSlide(index)} // 인디케이터 클릭 시 해당 슬라이드로 이동
                    />
                ))}
            </div>
        </div>
    );
}
