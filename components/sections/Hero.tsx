'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const labels = ["Computer Engineering", "Software Developer", "I'm Nathan Tanzi"];
    const labelAngles = [0, -30, -60];
    const maxScrollForRotation = 0.8; // Rotação termina em 80% do scroll
    const cappedProgress = Math.min(scrollProgress / maxScrollForRotation, 1);
    const circleRotation = cappedProgress * 60;

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
                <Image
                    src="/Hero/Nathan_nbg.png"
                    alt="Nathan Picture"
                    fill
                    quality={100}
                    priority
                    unoptimized
                    className="object-cover grayscale-0 hue-rotate-0 brightness-120 transition-transform duration-200 ease-out"
                />
            </div>

            <div className="absolute inset-0 h-[300vh]">
                <div className="sticky top-0 h-screen w-screen overflow-hidden pointer-events-none">
                    <div className="absolute z-0 top-1/2 right-0 h-2.5 w-2.5">
                        {labels.map((label, index) => {
                            const angle = labelAngles[index] + circleRotation;
                            const reveal = getRevealProgress(angle);

                            return (
                                <span
                                    key={label}
                                    className="absolute font-sk-modernist font-bold w-screen text-[14vw] md:text-[3.5rem] 
                                    lg:text-[5rem] xl:text-[7rem] leading-[1em] uppercase text-end mix-blend-difference 
                                    hue-rotate-150 text-blue-300 md:whitespace-nowrap transition-all duration-500 ease-out"
                                    style={{
                                        opacity: reveal,
                                        transform: `translate(-100%, -50%) rotate(${angle}deg)`,
                                        transformOrigin: '150vw center'
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

        </section>
    );
}
