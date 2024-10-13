import db from "@/lib/db";
import { calculateAge } from "@/lib/etc";
import getSession from "@/lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function StaffProfile() {
    const session = await getSession();
    const user = await db.user.findUnique({
        where: {
            id: session.id,
        },
        select: {
            avatar: true,
            staff: {
                select: {
                    name: true,
                    birth_year: true,
                    phone: true,
                    gender: true,
                    assignments: true,
                },
            },
        },
    });

    const logout = async () => {
        "use server"; // 서버 액션으로 정의
        const session = await getSession();
        await session.destroy();
        redirect("/");
    };

    return (
        <div className="flex flex-col items-center justify-center p-10">
            <div className="relative mt-24 border-[0.5px] shadow border-neutral-200 w-64 h-72 flex flex-col justify-center items-center bg-neutral-100 rounded-xl">
                <Image
                    src={user?.avatar ?? "./assets/default_profile.jpg"} // avatar가 null일 경우 기본 이미지 사용
                    width={160}
                    height={160}
                    className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2"
                    alt={user?.staff?.name || "User Avatar"} // alt 텍스트에 이름이 있으면 사용
                />
                <h1 className="mt-10 text-2xl font-semibold">
                    {user?.staff?.name}
                </h1>
                <span>성별: {user?.staff?.gender === "M" ? "남" : "여"}</span>
                <span>태어난 연도: {user?.staff?.birth_year}</span>
                <span>
                    나이: {calculateAge(Number(user?.staff?.birth_year))}
                </span>
                <span>휴대폰 번호: {user?.staff?.phone}</span>
                <span>
                    현재 근무 중인 알바 수: {user?.staff?.assignments.length}
                </span>
            </div>
            <form action={logout}>
                <button type="submit" className="mt-5 btn">
                    logout
                </button>
            </form>
        </div>
    );
}
