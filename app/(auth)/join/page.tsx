import Image from "next/image";
import Link from "next/link";

export default function Join() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-64px)] gap-10">
            <div className="flex flex-col -mt-10">
                <span className="font-semibold text-4xl">안녕하세요!</span>
                <span className="font-medium text-lg text-gray-600">
                    잡메이트에 로그인할 방법을 선택해 주세요 😄
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    href={"/join/naver"}
                    className="bg-[#02C75A] hover:bg-[#02be57] text-[#FFFEFE] px-10 py-3 rounded-md shadow flex items-center gap-2 h-14"
                >
                    <Image
                        src={"./assets/naver_.svg"}
                        alt="naver-logo"
                        width={21}
                        height={21}
                    />
                    <span>네이버계정으로 로그인하기</span>
                </Link>
                <Link
                    href={"/join/kakao"}
                    className="bg-[#FFE401] hover:bg-[#efd702] text-[#181606] px-10 py-3 rounded-md shadow flex items-center gap-2 h-14"
                >
                    <Image
                        src={"./assets/kakao.svg"}
                        alt="kakao-logo"
                        width={21}
                        height={21}
                    />
                    <span>카카오계정으로 로그인하기</span>
                </Link>
            </div>
        </div>
    );
}
