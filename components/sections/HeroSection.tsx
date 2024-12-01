// ./components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
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
                <h1 className="font-semibold text-5xl md:text-6xl w-full text-center [line-height:1.2] [letter-spacing:0.5px] bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    사장님과 알바생
                    <br className="md:hidden" /> 모두에게 필요한
                    <br className="md:hidden" />
                    급여 관리 서비스
                </h1>
                <p className="mt-6 text-lg text-gray-600 text-center max-w-2xl">
                    간편하고 정확한 급여 계산으로 효율적인 알바 관리를
                    시작하세요
                </p>
                <Link
                    href="/join"
                    className="group flex items-center justify-center w-64 h-12 px-3 py-2 mt-8 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 hover:scale-105"
                >
                    시작하기
                </Link>
            </motion.div>
            <div className="absolute bottom-8 animate-bounceY">
                <ArrowDown className="w-6 h-6 text-gray-400" />
            </div>
        </div>
    );
}
