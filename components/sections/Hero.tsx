import { personalInfo } from "@/data/portfolio";
import Image from "next/image";
import TerminalAnimation from "@/components/ui/TerminalAnimation";

export default function Hero() {
    return (
        <section id="hero" className="relative h-[200vh]">

            <div className="sticky top-0 inset-0 z-0 h-screen w-screen items-center mx-auto overflow-hidden">
                <Image
                    src="/Hero/Nathan.png"
                    alt="Nathan Picture"
                    fill
                    quality={100}
                    priority
                    unoptimized
                    className="object-cover grayscale-0 hue-rotate-0 brightness-120"
                />
            </div>

            <div className="absolute top-0 w-full flex h-[200vh] flex-col-reverse md:flex-row">
                <div className="relative md:sticky top-0 h-screen flex-1 flex items-end select-none overflow-hidden">
                    <div className={`relative bottom-0 z-10 w-full`}>
                        <TerminalAnimation />
                    </div>
                </div>

                <div className="relative top-0 md:top-0 right-0 flex-1 h-fit md:h-screen flex items-center justify-end select-none" >
                    <div className="relative h-fit text-blue-300 font-sk-modernist font-bold text-[13vw] 
                    md:text-[3rem] lg:text-[4rem] xl:text-[6rem] leading-[1em] uppercase text-end z-10 p-8 mix-blend-difference hue-rotate-150">
                        <h1>Computer Engineering</h1>
                    </div>
                </div>
            </div>



        </section>
    );
}
