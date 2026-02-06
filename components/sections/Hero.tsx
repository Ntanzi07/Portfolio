'use client';

import { personalInfo } from "@/data/portfolio";
import Image from "next/image";
import TerminalAnimation from "@/components/ui/TerminalAnimation";
import { useState, useEffect } from "react";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = -(e.clientX / window.innerWidth - 0.5) * 2;
            const y = 0;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="hero" className="relative h-[200vh]">

            <div className="sticky top-0 inset-0 z-0 h-screen w-screen items-center mx-auto">
                <Image
                    src="/Hero/Nathan_bg.png"
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
                    style={{
                        transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
                    }}
                />
            </div>

            <div className="absolute top-0 w-full flex h-[200vh] flex-col-reverse md:flex-row">
                <div className="relative md:sticky top-0 h-screen flex-1 flex items-end select-none overflow-hidden">
                    <div className={`relative bottom-0 z-10 w-full`}>
                        <TerminalAnimation />
                    </div>
                </div>

                <div className="relative top-0 md:top-0 right-0 flex-1 h-fit md:h-screen flex items-center justify-end select-none" >
                    <div className="relative h-fit font-sk-modernist font-bold text-[13vw] md:text-[3rem] lg:text-[4rem] 
                    xl:text-[6rem] leading-[1em] uppercase text-end z-10 p-8 mix-blend-difference hue-rotate-150 text-blue-300">
                        <h1>Computer Engineering</h1>
                    </div>
                </div>
            </div>



        </section>
    );
}
