import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col">
            <section className="w-full h-[calc(100vh-64px)] bg-white flex flex-col justify-center items-center px-10 md:px-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-4xl w-full text-center [line-height:3rem] [letter-spacing:0.5px]">
                        사장님과 알바생
                        <br className="md:hidden" /> 모두에게 필요한
                        <br className="md:hidden" />
                        급여 관리 서비스
                    </h1>
                    <Link
                        href={"/join"}
                        className="w-64 h-12 px-3 py-2 bg-teal-500 rounded-lg flex justify-center items-center text-white shadow hover:bg-teal-600 mt-6"
                    >
                        시작하기
                    </Link>
                </div>
            </section>
            <section className="w-full h-[calc(100vh-64px)] bg-neutral-200 flex flex-col justify-center items-center px-10 md:px-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-4xl w-full text-center [line-height:3rem] [letter-spacing:0.5px]">
                        쉽고 빠르게 <br className="md:hidden" />
                        급여를 계산하세요 💸
                    </h1>
                    <Link
                        href={"/join"}
                        className="w-64 h-12 px-3 py-2 bg-teal-500 rounded-lg flex justify-center items-center text-white shadow hover:bg-teal-600 mt-6"
                    >
                        시작하기
                    </Link>
                </div>
            </section>
            <section className="w-full h-[calc(100vh-64px)] bg-neutral-100 flex flex-col justify-center items-center px-10 md:px-14">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-4xl w-full text-center [line-height:3rem] [letter-spacing:0.5px]">
                        사용방법을 알려드릴게요 📚
                    </h1>
                    <Link
                        href={"/join"}
                        className="w-64 h-12 px-3 py-2 bg-teal-500 rounded-lg flex justify-center items-center text-white shadow hover:bg-teal-600 mt-6"
                    >
                        시작하기
                    </Link>
                </div>
            </section>
        </div>
    );
}
