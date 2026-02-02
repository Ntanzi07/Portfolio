import { personalInfo } from "@/data/portfolio";
import Image from "next/image";
import TerminalAnimation from "@/components/ui/TerminalAnimation";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex lg:items-center justify-end py-20">
            <div className="absolute inset-0 z-0items-center mx-auto overflow-hidden">
                <Image
                    src="/Hero/Nathan.png"
                    alt="Nathan Picture"
                    fill
                    quality={100}
                    priority
                    unoptimized
                    className="object-cover grayscale-0 hue-rotate-0 brightness-110"
                />
            </div>

            <div className="text-white font-sk-modernist font-bold text-[16vw] md:text-[7rem] leading-[1em] uppercase text-end z-10 p-8 md:p-16 lg:p-24 mix-blend-difference 2xl:max-w-[50vw]">
                <h1>Welcome to my world.</h1>
            </div>

            <div className={`absolute bottom-0 z-10 w-full `}>
                <TerminalAnimation />
            </div>

        </section>
    );
}
