'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import { about } from "@/data/portfolio";
import AboutOrb3D from "../ui/AboutOrb3D";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const perSectionHeightVh = 100;
  const sectionBreakpoints = {
    secondStartsAt: 0.1,
    thirdStartsAt: 0.4,
  };

  const marqueeText = [
    "what make me alive",
    "·",
    "programming experiences",
    "·",
  ];

  const aboutSections = useMemo(
    () => [
      {
        title: "About Me",
        content: (
          <div className="space-y-6 rounded-lg p-8">
            <p className=" text-zinc-900 leading-relaxed">{about.bio}</p>

            <div className="space-y-3">
              {about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-zinc-900">✓</span>
                  <p className="text-zinc-900">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "My Process",
        content: (
          <div className="space-y-5 rounded-lg p-8 text-zinc-900">
            <p className="leading-relaxed">
              Gosto de transformar ideia em interface com foco em motion,
              performance e narrativa visual.
            </p>
            <p className="leading-relaxed">
              Esse bloco aceita qualquer JSX: texto, imagem, vídeo, cards ou
              até um componente inteiro.
            </p>
            <div className="rounded-xl border border-zinc-900/20 bg-zinc-900/5 p-4">
              Area pronta para inserir imagem/componente customizado.
            </div>
          </div>
        ),
      },
      {
        title: "What I Build",
        content: (
          <div className="space-y-5 rounded-lg p-8 text-zinc-900">
            <p className="leading-relaxed">
              Projetos interativos com identidade forte, animações bem
              calibradas e experiencia fluida em desktop/mobile.
            </p>
            <p className="leading-relaxed">
              Para adicionar mais setores, basta inserir um novo objeto no array
              aboutSections.
            </p>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const maxScrollable = rect.height - window.innerHeight;
      const progress =
        maxScrollable <= 0
          ? 0
          : Math.min(Math.max((-rect.top / maxScrollable), 0), 1);

      let next = 0;
      if (progress >= sectionBreakpoints.thirdStartsAt) {
        next = 2;
      } else if (progress >= sectionBreakpoints.secondStartsAt) {
        next = 1;
      }

      next = Math.min(next, aboutSections.length - 1);

      setActiveSection((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [aboutSections.length]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-0 bg-[#e9e9e9]"
      style={{ height: `${(aboutSections.length + 2) * perSectionHeightVh}vh` }}
    >

      <div className="sticky top-0 h-screen overflow-visible">
        <div className="w-full select-none overflow-visible">
          <div className="marquee-track flex w-max items-center gap-[1em] font-herkey leading-[.8] uppercase font-extralight text-[#0a0a0a] text-[20em]">
            {[...marqueeText, ...marqueeText].map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex px-4 py-16 overflow-visible">
          <div className="relative top-0 z-10 flex flex-1 items-end overflow-visible select-none">
            <AboutOrb3D />
          </div>

          <div className="flex-1 flex flex-col z-50 items-start justify-start font-nicholas">
            <div className="relative w-full h-full">
              {aboutSections.map((section, index) => (
                <article
                  key={section.title}
                  className={`absolute inset-0 text-[1.5em] ${
                    activeSection === index
                      ? "pointer-events-auto"
                      : "pointer-events-none"
                  }`}
                >
                  <h2
                    className={`text-[5em] leading-[.5em] text-zinc-900 transition-all duration-700 ease-out ${
                      activeSection === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10"
                    }`}
                  >
                    {section.title}
                  </h2>
                  <hr className="my-6 border-zinc-900 w-full" />
                  <div
                    className={`relative z-10 transition-all duration-700 delay-100 ease-out ${
                      activeSection === index
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {section.content}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
          .marquee-track {
            animation: about-marquee 40s linear infinite;
          }

          @keyframes about-marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
    </section>
  );
}
