import { personalInfo } from "@/data/portfolio";
import Image from "next/image";
import TerminalAnimation from "@/components/ui/TerminalAnimation";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex pt-20 flex-row  flex-wrap-reverse">

            <div className="absolute inset-0 z-0 items-center mx-auto overflow-hidden">
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


            <div className="flex-1 flex items-end select-none" >
                <div className={`relative bottom-0 z-10 w-full `}>
                    <TerminalAnimation />
                </div>
            </div>


            <div className="flex-1 flex items-center select-none" >
                <div className="relative text-blue-300 font-sk-modernist font-bold text-[13vw] md:text-[7rem] 
                leading-[1em] uppercase text-end z-10 p-8 mix-blend-difference hue-rotate-150">
                    <h1>Computer Engenering</h1>
                </div>
            </div>


        </section>
    );
}
