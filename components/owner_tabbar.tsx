// ./components/owner_tabbar.tsx
"use client";
import {
    HomeIcon,
    UserIcon,
    BuildingStorefrontIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className="left-1/2 fixed bottom-0 transform -translate-x-1/2 w-full max-w-screen-md grid grid-cols-4 h-[72px] bg-white border-neutral-50 rounded-t-lg border-t-2 px-5 py-3 *:text-black">
            <Link
                href="/owner/home"
                className="flex flex-col items-center gap-px"
            >
                <HomeIcon
                    className={classNames(
                        "w-7 h-7",
                        pathname === "/owner/home"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                />
                <span
                    className={classNames(
                        "text-xs",
                        pathname === "/owner/home"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                >
                    홈
                </span>
            </Link>
            <Link
                href="/owner/schedule"
                className="flex flex-col items-center gap-px"
            >
                <CalendarDaysIcon
                    className={classNames(
                        "w-7 h-7",
                        pathname === "/owner/schedule"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                />
                <span
                    className={classNames(
                        "text-xs",
                        pathname === "/owner/schedule"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                >
                    일정
                </span>
            </Link>
            <Link
                href="/owner/work"
                className="flex flex-col items-center gap-px"
            >
                <BuildingStorefrontIcon
                    className={classNames(
                        "w-7 h-7",
                        pathname === "/owner/work"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                />
                <span
                    className={classNames(
                        "text-xs",
                        pathname === "/owner/work"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                >
                    근무
                </span>
            </Link>
            <Link
                href="/owner/profile"
                className="flex flex-col items-center gap-px"
            >
                <UserIcon
                    className={classNames(
                        "w-7 h-7",
                        pathname === "/owner/profile"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                />
                <span
                    className={classNames(
                        "text-xs",
                        pathname === "/owner/profile"
                            ? "text-black"
                            : "text-neutral-400"
                    )}
                >
                    프로필
                </span>
            </Link>
        </div>
    );
}
