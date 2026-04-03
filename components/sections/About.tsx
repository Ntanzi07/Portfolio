import { about } from "@/data/portfolio";
import Image from "next/image";
import TerminalAnimation from "../ui/TerminalAnimation";
import ScalableImage from "../ui/ScalableImage";

export default function About() {
  return (
    <section id="about" className="relative bg-[#0a0a0a]">
      <div className="relative  mx-auto flex items-center gap-12 h-screen">

        <div className="absolute top-0 z-0 inset-0 h-screen w-screen items-center mx-auto">
          <Image
            src="/About/GradientBG.png"
            alt="Gradient Background"
            fill
            quality={100}
            priority
            unoptimized
            draggable={false}
            className="object-cover grayscale-0 hue-rotate-0 brightness-120 pointer-events-none select-none"
          />
        </div>


        <div className="relative top-0 z-10 flex-1 flex items-end select-none overflow-hidden">
          <div className={`relative bottom-0 z-10 w-full`}>
            <TerminalAnimation />
          </div>
        </div>
        <div className="flex-1 z-20">
          <h2 className="text-4xl font-bold text-zinc-900 mb-8 text-center">
            About Me
          </h2>
          <div className="bg-zinc-100 rounded-lg p-8 shadow-lg">
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              {about.bio}
            </p>
            <div className="space-y-3">
              {about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-zinc-600 text-xl">✓</span>
                  <p className="text-zinc-600">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
