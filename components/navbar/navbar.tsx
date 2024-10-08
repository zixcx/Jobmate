"use client";
import classNames from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { isLogin as checkLogin, logout } from "./actions"; // isLogin과 logout을 가져옵니다.

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // isLogin 상태를 나타내는 변수
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // md 사이즈 이상일 때 메뉴를 자동으로 닫음
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const checkUserLogin = async () => {
            const loginStatus = await checkLogin(); // 로그인 상태를 확인
            setIsLoggedIn(loginStatus); // 로그인 상태 업데이트
        };

        checkUserLogin(); // 로그인 상태 확인 함수 호출
    }, []);

    const handleLogout = async () => {
        await logout(); // 로그아웃 처리
        const loginStatus = await checkLogin(); // 로그아웃 후 로그인 상태 다시 확인
        setIsLoggedIn(loginStatus); // 로그인 상태 업데이트
    };

    return (
        <div className="w-full fixed h-16 flex items-center px-10 md:px-14 bg-white border-b shadow-sm justify-between">
            <Link
                href={"/"}
                className="text-black text-xl font-semibold [letter-spacing:-1px] select-none cursor-pointer"
            >
                Jobmate
            </Link>
            <div
                onClick={toggleMenu}
                className="w-10 h-10 flex flex-col items-center justify-center cursor-pointer md:hidden"
            >
                <div
                    className={classNames(
                        "w-[47%] h-[2px] bg-black rounded-sm transition-all origin-left translate-y-[0.45rem]",
                        isMenuOpen ? "rotate-[-45deg]" : null
                    )}
                />
                <div
                    className={classNames(
                        "w-[47%] h-[2px] bg-black rounded-md transition-all origin-center",
                        isMenuOpen ? "hidden" : null
                    )}
                />
                <div
                    className={classNames(
                        "w-[47%] h-[2px] bg-black rounded-md transition-all origin-left -translate-y-[0.45rem]",
                        isMenuOpen ? "rotate-[45deg]" : null
                    )}
                />
            </div>
            {isMenuOpen ? (
                <ul className="flex fixed top-16 left-0 text-black w-full flex-col border-b border-neutral-100 bg-white gap-1 px-3 py-2 *:transition-colors *:duration-100 *:select-none">
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link
                            href={"/"}
                            onClick={toggleMenu}
                            className="w-full h-full block"
                        >
                            홈
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link
                            href={"/notice"}
                            onClick={toggleMenu}
                            className="w-full h-full block"
                        >
                            공지사항
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link
                            href={"/#qna"}
                            onClick={toggleMenu}
                            className="w-full h-full block"
                        >
                            자주 묻는 질문
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link
                            href={"/#guide"}
                            onClick={toggleMenu}
                            className="w-full h-full block"
                        >
                            사용 가이드
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link
                            href={isLoggedIn ? "#logout" : "/join"} // 로그인 상태에 따라 링크 변경
                            onClick={
                                isLoggedIn
                                    ? (e) => {
                                          e.preventDefault();
                                          handleLogout();
                                      }
                                    : toggleMenu
                            } // 로그아웃 처리
                            className="w-full h-full block"
                        >
                            {isLoggedIn ? "로그아웃" : "로그인"}
                        </Link>
                    </li>
                </ul>
            ) : null}
            <div className="hidden md:block">
                <ul className="flex gap-1 *:transition-colors">
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link href={"/"} className="w-full h-full block">
                            홈
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link href={"/notice"} className="w-full h-full block">
                            공지사항
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link href={"/#qna"} className="w-full h-full block">
                            자주 묻는 질문
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-neutral-200 cursor-pointer">
                        <Link href={"/#guide"} className="w-full h-full block">
                            사용 가이드
                        </Link>
                    </li>
                    <li className="px-3 py-2 rounded-lg text-white bg-teal-500 hover:bg-teal-600 cursor-pointer">
                        <Link
                            href={isLoggedIn ? "#logout" : "/join"} // 로그인 상태에 따라 링크 변경
                            onClick={
                                isLoggedIn
                                    ? (e) => {
                                          e.preventDefault();
                                          handleLogout();
                                      }
                                    : undefined
                            } // 로그아웃 처리
                            className="w-full h-full block"
                        >
                            {isLoggedIn ? "로그아웃" : "로그인"}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
