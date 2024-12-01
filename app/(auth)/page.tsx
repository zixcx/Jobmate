// ./app/(auth)/page.tsx
"use client";

import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GuideSection from "@/components/sections/GuideSection";
import QnaSection from "@/components/sections/QnaSection";
import FullScroll from "@/components/FullScroll";

export default function Home() {
    return (
        <FullScroll scrollCooldown={400} showIndicator>
            <HeroSection />
            <FeaturesSection />
            <GuideSection />
            <QnaSection />
        </FullScroll>
    );
}
