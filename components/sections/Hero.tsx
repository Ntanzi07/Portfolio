'use client';

import Image from "next/image";
import { useState, useEffect, type CSSProperties, type ReactNode } from "react";

export default function Hero() {
    const [scrollProgress, setScrollProgress] = useState(0);
    type LabelSetting = {
        key: string;
        content: ReactNode;
        fontFamily: string;
        weight: number;
        baseAngle: number;
        sizeClasses: string;
        className: string;
    };

    const labelSettings: LabelSetting[] = [
        {
            key: "Hello",
            content: "Nice to meet you!",
            fontFamily: "var(--font-solen)",
            weight: 600,
            baseAngle: 0,
            sizeClasses: "text-[10vw] md:text-[6.7rem] lg:text-[7rem] xl:text-[10rem]",
            className: "",
        },
        {
            key: "computer-engineering",
            content: (
                <>
                    <span className="italic font-bold">I'm a </span>
                    <span className="not-italic font-normal">computer engineering</span>
                </>
            ),
            fontFamily: "var(--font-solen)",
            weight: 600,
            baseAngle: -30,
            sizeClasses: "text-[10vw] md:text-[6.7rem] lg:text-[7rem] xl:text-[10rem]",
            className: "",
        },
        {
            key: "software-developer",
            content: (
                <>
                    <span className="italic  font-bold">I'm a </span>
                    <span className="not-italic font-normal">software developer</span>
                </>
            ),
            fontFamily: "var(--font-nura)",
            weight: 500,
            baseAngle: -60,
            sizeClasses: "text-[10vw] md:text-[4rem] lg:text-[5rem] xl:text-[8rem]",
            className: "",
        },
        {
            key: "im-nathan-tanzi",
            content: (
                <>
                    <span className="italic font-bold">I'm </span>
                    <span className="not-italic font-normal">Nathan Tanzi</span>
                </>
            ),
            fontFamily: "var(--font-aura)",
            weight: 400,
            baseAngle: -90,
            sizeClasses: "text-[15vw] md:text-[6.7rem] lg:text-[8rem] xl:text-[12rem]",
            className: "normal-case",
        },
    ];
    const maxScrollForRotation = 0.8; // Rotação termina em 80% do scroll
    const cappedProgress = Math.min(scrollProgress / maxScrollForRotation, 1);
    const circleRotation = cappedProgress * 90;
    const outlineStrokeWidth = "clamp(0.6px, 0.13vw, 2px)";
    const silhouetteMaskStyle: CSSProperties = {
        WebkitMaskImage: "url('/Hero/Nathan_nbg.png')",
        maskImage: "url('/Hero/Nathan_nbg.png')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "cover",
        maskSize: "cover",
    };

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('hero');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const scrollableDistance = section.offsetHeight - window.innerHeight;
            const traveled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
            const progress = scrollableDistance > 0 ? traveled / scrollableDistance : 0;

            setScrollProgress(progress);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const getRevealProgress = (angle: number) => {
        const distance = Math.abs(angle);
        return Math.max(0, 1 - distance / 20);
    };

    const getLabelStyle = (angle: number, reveal: number): CSSProperties => ({
        opacity: reveal,
        transform: `translate(-100%, -50%) rotate(${angle}deg)`,
        transformOrigin: '150vw center',
    });

    const getLabelFontStyle = (fontFamily: string, weight: number): CSSProperties => ({
        fontFamily,
        fontWeight: weight,
    });

    return (
        <section id="hero" className="relative h-[300vh]">

            <div className="sticky top-0 inset-0 z-0 h-screen w-screen items-center mx-auto">
                <Image
                    src="/Hero/Nathan.png"
                    alt="Nathan BG"
                    fill
                    quality={100}
                    priority
                    unoptimized
                    className="object-cover grayscale-0 hue-rotate-0 brightness-120"
                />
            </div>

            <div className="absolute inset-0 h-[300vh]">
                <div className="sticky top-0 h-screen w-screen overflow-hidden pointer-events-none">
                    <div className="absolute z-0 top-[90vh] md:top-1/2 right-0 h-2.5 w-2.5">
                        {labelSettings.map((item) => {
                            const angle = item.baseAngle + circleRotation;
                            const reveal = getRevealProgress(angle);

                            return (
                                <span
                                    key={item.key}
                                    className={`absolute w-screen ${item.sizeClasses} ${item.className} leading-[1em] text-end mix-blend-difference 
                                    hue-rotate-150 text-white transition-all duration-500 ease-out`}
                                    style={{
                                        ...getLabelStyle(angle, reveal),
                                        ...getLabelFontStyle(item.fontFamily, item.weight),
                                    }}
                                >
                                    {item.content}
                                </span>
                            );
                        })}
                    </div>

                    <div className="absolute inset-0 z-5" style={silhouetteMaskStyle}>
                        <Image
                            src="/Hero/Nathan.png"
                            alt="Nathan mask cutout"
                            fill
                            quality={100}
                            priority
                            unoptimized
                            className="object-cover grayscale-0 hue-rotate-0 brightness-120"
                        />
                    </div>

                    <div className="absolute inset-0 z-10" style={silhouetteMaskStyle}>
                        <div className="absolute z-10 top-[90vh] md:top-1/2 right-0 h-2.5 w-2.5">
                            {labelSettings.map((item) => {
                                const angle = item.baseAngle + circleRotation;
                                const reveal = getRevealProgress(angle);

                                return (
                                    <span
                                        key={`${item.key}-outline`}
                                        className={`absolute w-screen ${item.sizeClasses} ${item.className} leading-[1em]
                                        text-end transition-all duration-500 ease-out`}
                                        style={{
                                            ...getLabelStyle(angle, reveal),
                                            ...getLabelFontStyle(item.fontFamily, item.weight),
                                            color: 'transparent',
                                            WebkitTextStroke: `${outlineStrokeWidth} rgb(255 255 255)`,
                                        }}
                                    >
                                        {item.content}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
