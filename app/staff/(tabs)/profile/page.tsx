import db from "@/lib/db";
import { calculateAge } from "@/lib/etc";
import getSession from "@/lib/session";
import {
    PencilSquareIcon,
    PhoneIcon,
    CalendarIcon,
    UserGroupIcon,
    UserIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function StaffProfile() {
    const session = await getSession();

    const user = await db.user.findUnique({
        where: { id: session.id },
        select: {
            avatar: true,
            staff: {
                select: {
                    name: true,
                    birth_year: true,
                    phone: true,
                    gender: true,
                    assignments: { select: { id: true } },
                },
            },
        },
    });

    const logout = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 bg-neutral-800 text-white p-8 flex flex-col items-center justify-center">
                        <div className="relative">
                            <Image
                                src={
                                    user?.avatar ??
                                    "/assets/default_profile.jpg"
                                }
                                width={160}
                                height={160}
                                className="rounded-full border-4 border-white shadow-lg"
                                alt={user?.staff?.name || "User Avatar"}
                            />
                            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-neutral-200 transition duration-300">
                                <PencilSquareIcon className="w-5 h-5 text-neutral-800" />
                            </div>
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-center">
                            {user?.staff?.name}
                        </h1>
                        <p className="mt-2 text-neutral-400">
                            {user?.staff?.gender === "M" ? "Male" : "Female"}
                        </p>
                    </div>
                    <div className="p-8 md:flex-grow">
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
                            정보
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <CalendarIcon className="w-5 h-5 text-neutral-500" />
                                    <div>
                                        <p className="font-bold">태어난 연도</p>
                                        <p>{user?.staff?.birth_year}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <UserIcon className="w-5 h-5 text-neutral-500" />
                                    <div>
                                        <p className="font-bold">나이</p>
                                        <p>
                                            {calculateAge(
                                                Number(user?.staff?.birth_year)
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <PhoneIcon className="w-5 h-5 text-neutral-500" />
                                    <div>
                                        <p className="font-bold">전화번호</p>
                                        <p>{user?.staff?.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-neutral-600 gap-4">
                                    <UserGroupIcon className="w-5 h-5 text-neutral-500" />
                                    <div>
                                        <p className="font-bold">
                                            현재 근무중인 알바 수
                                        </p>
                                        <p>
                                            {user?.staff?.assignments?.length ??
                                                0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form action={logout} className="mt-8">
                            <button
                                type="submit"
                                className="flex items-center justify-center w-full px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition duration-300"
                            >
                                <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
