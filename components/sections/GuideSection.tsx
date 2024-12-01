// ./components/sections/GuideSection.tsx
"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function GuideSection() {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <div className="flex flex-col justify-center items-center text-center h-full w-full bg-neutral-50 relative px-10 md:px-14">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center"
            >
                <BookOpen className="w-16 h-16 text-teal-500 mb-6" />
                <h1 className="font-semibold text-4xl md:text-5xl w-full text-center [line-height:1.2] [letter-spacing:0.5px]">
                    사용방법을 알려드릴게요 📚
                </h1>
                <p className="mt-6 text-lg text-gray-600 text-center max-w-2xl">
                    직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다
                </p>
                <Link
                    href="/join"
                    className="group flex items-center justify-center w-64 h-12 px-3 py-2 mt-8 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 hover:scale-105"
                >
                    시작하기
                </Link>
            </motion.div>
        </div>
    );
}
