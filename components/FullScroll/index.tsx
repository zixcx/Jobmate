// ./components/FullScroll/index.tsx
"use client";

import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from "react";
import styles from "./styles.module.css";

interface FullScrollProps {
    children: ReactNode;
    scrollCooldown?: number;
    showIndicator?: boolean;
}

export default function FullScroll({
    children,
    scrollCooldown = 1000,
    showIndicator = false,
}: FullScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const isScrolling = useRef(false);
    const touchStartY = useRef(0);
    const touchDeltaY = useRef(0);

    const childrenArray = Array.isArray(children) ? children : [children];
    const sectionHeight =
        typeof window !== "undefined"
            ? outerRef.current?.getBoundingClientRect().height || 0
            : 0;

    // 특정 섹션으로 스크롤
    const scrollToSection = useCallback(
        (index: number) => {
            if (!containerRef.current) return;

            const offset = index * sectionHeight;
            containerRef.current.style.transform = `translateY(-${offset}px)`;
        },
        [sectionHeight]
    );

    // 스크롤 방향 처리
    const handleScroll = useCallback(
        (direction: number) => {
            if (isScrolling.current) return;

            const newSection = Math.max(
                0,
                Math.min(currentSection + direction, childrenArray.length - 1)
            );

            if (newSection !== currentSection) {
                isScrolling.current = true;
                setCurrentSection(newSection);
                scrollToSection(newSection);

                setTimeout(() => {
                    isScrolling.current = false;
                }, scrollCooldown);
            }
        },
        [currentSection, childrenArray.length, scrollCooldown, scrollToSection]
    );

    // 인디케이터 클릭 처리
    const handleIndicatorClick = useCallback(
        (index: number) => {
            if (isScrolling.current || index === currentSection) return;
            isScrolling.current = true;
            setCurrentSection(index);
            scrollToSection(index);

            setTimeout(() => {
                isScrolling.current = false;
            }, scrollCooldown);
        },
        [currentSection, scrollCooldown, scrollToSection]
    );

    // 스크롤 방지 함수
    const preventBodyScroll = useCallback((enable: boolean) => {
        if (enable) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }
    }, []);

    // 스크롤 이벤트 처리
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;

            e.preventDefault();
            const delta = e.deltaY;

            if (Math.abs(delta) > 50) {
                handleScroll(delta > 0 ? 1 : -1);
            }
        };

        window.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel);
        };
    }, [handleScroll]);

    // 터치 이벤트 처리
    useEffect(() => {
        const onTouchStart = (e: TouchEvent) => {
            if (isScrolling.current) return;

            touchStartY.current = e.touches[0].clientY;
            touchDeltaY.current = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (isScrolling.current) return;

            e.preventDefault();
            const currentTouchY = e.touches[0].clientY;
            touchDeltaY.current += touchStartY.current - currentTouchY;
            touchStartY.current = currentTouchY;

            if (Math.abs(touchDeltaY.current) > sectionHeight / 4) {
                handleScroll(touchDeltaY.current > 0 ? 1 : -1);
                touchDeltaY.current = 0;
            }
        };

        const onTouchEnd = () => {
            touchDeltaY.current = 0;
        };

        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [handleScroll, sectionHeight]);

    useEffect(() => {
        preventBodyScroll(true);

        return () => {
            preventBodyScroll(false);
        };
    }, [preventBodyScroll]);

    useEffect(() => {
        scrollToSection(currentSection);
    }, [currentSection, scrollToSection]);

    return (
        <div ref={outerRef} className={styles.outer}>
            <div ref={containerRef} className={styles.container}>
                {childrenArray.map((child, idx) => (
                    <section key={idx} className={styles.section}>
                        {child}
                    </section>
                ))}
            </div>
            {showIndicator && (
                <div className={styles.indicator}>
                    {childrenArray.map((_, idx) => (
                        <div
                            key={idx}
                            className={`${styles.indicatorDot} ${
                                idx === currentSection
                                    ? styles.activeIndicator
                                    : ""
                            }`}
                            onClick={() => handleIndicatorClick(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
