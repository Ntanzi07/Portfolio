'use client';

import React, { type CSSProperties } from 'react';

type Article = {
    title: string;
    paragraphs: string[];
};

const backgroundArticles: Article[] = [
    {
        title: 'Capa — Design',
        paragraphs: [
            `Nice to meet you! I'm Nathan, a Computer Engineering student at Facens and an NEA Engineering intern at 
                Splice Group (Votorantim). I'm focused on backend development, currently diving deeper into Golang, and I 
                have a solid foundation in Java and C++. I build APIs, integrate services, and also work with frontend using 
                React, as well as websites and mobile apps developed in Java.`,
            `In my internship, I collaborate with the operations team and translate real-world processes into digital solutions. 
                    This experience has helped me strengthen my technical skills, communication, and problem-solving abilities.`,
            `I'm looking for opportunities to grow as a backend developer, bring my full-stack perspective to real projects, 
                    and continue improving my English until reaching full fluency. Open to advanced internships and entry-level roles.`,
        ],
    },
    {
        title: 'Coluna — Código',
        paragraphs: [
            `Besides programming, music is a big part of my life.
                    I play acoustic guitar and piano in my free time.
                    I also enjoy creating and remixing songs.
                    One of my favorite styles is deep house music.
                    Music helps me relax and express my creativity.`,
        ],
    },
    {
        title: 'Reportagem — Produto',
        paragraphs: [
            `I am a calm and quiet person.
                    I like spending time with people I care about.
                    I feel really happy when I am with someone I love.
                    I also value personal growth and self-improvement.
                    I always try to become a better version of myself.`,
        ],
    },
    {
        title: 'Editorial',
        paragraphs: [
            `I have experience working with Java and Node.js.
                    I like creating APIs and designing backend systems.
                    I also enjoy solving problems and thinking logically.
                    Building scalable and efficient applications is something I am always improving.
                    I am constantly studying to become a better developer every day.`,
        ],
    },
    {
        title: 'Editorial',
        paragraphs: [
            `I have experience working with Java and Node.js.
                    I like creating APIs and designing backend systems.
                    I also enjoy solving problems and thinking logically.
                    Building scalable and efficient applications is something I am always improving.
                    I am constantly studying to become a better developer every day.`,
        ],
    },
];

export default function BackgroundTexts({ moveProgress }: { moveProgress: number }) {
    const articlesMoveProgress = Math.min(Math.max(moveProgress, 0), 1);

    return (
        <div className="sticky top-20 inset-0 z-10 h-screen w-screen overflow-hidden bg-[#0a0a0a] pointer-events-none">
            <div className="relative h-full w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-6 md:grid-rows-5 gap-6">
                {/* text-1 */}
                <article className="px-4 text-white whitespace-normal hyphens-auto 
                    lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-2"
                    style={{
                        transform: `translateY(${articlesMoveProgress * 2000}px)`,
                        transition: 'transform 300ms ease-out',
                        willChange: 'transform'
                    }}>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">{backgroundArticles[0].title}</h4>
                    {backgroundArticles[0].paragraphs.map((p, i) => (
                        <p key={i} className="text-[2vw] md:text-[12px] lg:text-[15px] mb-2 text-justify">{p}</p>
                    ))}
                </article>

                {/* text-2 */}
                <article className="px-4 text-white whitespace-normal hyphens-auto
                     lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:row-span-2"
                    style={{
                        transform: `translateY(${articlesMoveProgress * 1500}px)`,
                        transition: 'transform 300ms ease-out', willChange: 'transform'
                    }}>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">{backgroundArticles[1].title}</h4>
                    {backgroundArticles[1].paragraphs.map((p, i) => (
                        <p key={i} className="text-[2vw] md:text-[12px] lg:text-[15px] mb-2 text-justify">{p}</p>
                    ))}
                </article>

                {/* text-3 */}
                <article className="px-4 text-white text-right whitespace-normal
                     lg:col-start-4 lg:col-span-1 lg:row-start-2 lg:row-span-3 row-start-1 "
                    style={{
                        transform: `translateY(${articlesMoveProgress * 1800}px)`,
                        transition: 'transform 300ms ease-out', willChange: 'transform'
                    }}>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">{backgroundArticles[2].title}</h4>
                    {backgroundArticles[2].paragraphs.map((p, i) => (
                        <p key={i} className="text-[2vw] md:text-[12px] lg:text-[15px] mb-2 text-justify">{p}</p>
                    ))}
                </article>

                {/* text-4 */}
                <article className="px-4 text-white whitespace-normal hyphens-auto
                     lg:col-start-1 md:col-span-1 lg:row-start-4 lg:row-span-2 row-start-3 "
                    style={{
                        transform: `translateY(${articlesMoveProgress * 2000}px)`,
                        transition: 'transform 300ms ease-out', willChange: 'transform'
                    }}>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">{backgroundArticles[3].title}</h4>
                    {backgroundArticles[3].paragraphs.map((p, i) => (
                        <p key={i} className="text-[2vw] md:text-[12px] lg:text-[15px] mb-2 text-justify">{p}</p>
                    ))}
                </article>

                <article className="px-4 text-white whitespace-normal hyphens-auto
                     md:col-start-3 md:col-span-1 md:row-start-4 md:row-span-2 row-start-4 col-start-2"
                    style={{
                        transform: `translateY(${articlesMoveProgress * 2000}px)`,
                        transition: 'transform 300ms ease-out', willChange: 'transform'
                    }}>
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">{backgroundArticles[4].title}</h4>
                    {backgroundArticles[4].paragraphs.map((p, i) => (
                        <p key={i} className="text-[2vw] md:text-[12px] lg:text-[15px] mb-2 text-justify">{p}</p>
                    ))}
                </article>
            </div>
        </div>
    );
}
