'use client';

import Image from "next/image";
import { Fragment, useState, useEffect, type CSSProperties, type ReactNode } from "react";
import BackgroundTexts from './BackgroundTexts';
import ScalableImage from '../ui/ScalableImage';
import HeroLayers from '../ui/HeroLayers';

export default function Hero() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMdUp, setIsMdUp] = useState(false);
    const [headerBottomOffset, setHeaderBottomOffset] = useState(0);
    type LabelSetting = {
        key: string;
        content: ReactNode;
        staticPrefix?: ReactNode;
        fontFamily: string;
        weight: number;
        baseAngle: number;
        sizeClasses: string;
        sizeClassesSub: string,
        className: string;
    };

    const labelSettings: LabelSetting[] = [
        {
            key: "Hello",
            content: (
                <>
                    <span className=" not-italic font-normal">Nice to </span>
                    <span className=" italic font-bold">meet you!</span>
                </>
            ),
            staticPrefix: <span className="not-italic font-normal">Hello!</span>,
            fontFamily: "var(--font-solen)",
            weight: 600,
            baseAngle: 0,
            sizeClasses: "leading-[.8em] text-[19vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]",
            sizeClassesSub: "leading-[.9em] text-[16vw] md:text-[4.7rem] lg:text-[6rem] xl:text-[8rem]",
            className: "",
        },
        {
            key: "computer-engineering",
            content: (
                <>
                    <span className="italic font-normal" style={{ fontFamily: "var(--font-nicholas)" }}>computer engineering</span>
                </>
            ),
            staticPrefix: <span className="not-italic font-normal">I'm a </span>,
            fontFamily: "var(--font-solen)",
            weight: 600,
            baseAngle: -60,
            sizeClasses: "leading-[.7em] text-[22vw] md:text-[10rem] lg:text-[12rem] xl:text-[12rem]",
            sizeClassesSub: "leading-[.8em] text-[16vw] md:text-[4.7rem] lg:text-[6rem] xl:text-[8rem]",
            className: "",
        },
        {
            key: "software-developer",
            content: (
                <>
                    <span className="not-italic font-normal">software developer</span>
                </>
            ),
            staticPrefix: <span className="not-italic font-normal">I'm a </span>,
            fontFamily: "var(--font-herkey)",
            weight: 300,
            baseAngle: -120,
            sizeClasses: "leading-[.7em] text-[20vw] md:text-[10rem] lg:text-[8rem] xl:text-[12rem]",
            sizeClassesSub: "leading-[.5em] text-[16vw] md:text-[4.7rem] lg:text-[6rem] xl:text-[8rem]",
            className: "",
        },
        {
            key: "im-nathan-tanzi",
            content: (
                <>
                    <span className="italic font-normal">Nathan Tanzi.</span>
                </>
            ),
            staticPrefix: <span className="italic font-normal">I'm </span>,
            fontFamily: "var(--font-herkey)",
            weight: 400,
            baseAngle: -180,
            sizeClasses: "leading-[.8em] text-[27vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[18rem]",
            sizeClassesSub: "leading-[.2em] text-[16vw] md:text-[4.7rem] lg:text-[6rem] xl:text-[10rem] left-[0vw] md:left-[-5vw]",
            className: "normal-case",
        },
    ];
    const maxScrollForRotation = 0.8;
    const cappedProgress = Math.min(scrollProgress / maxScrollForRotation, 1);
    const circleRotation = cappedProgress * 180;
    const centerHoldDegrees = 20;
    const frameAnimationStart = 0.84;
    const frameAnimationProgress = Math.min(Math.max((scrollProgress - frameAnimationStart) / (1 - frameAnimationStart), 0), 1);
    const frameScale = 1 - (frameAnimationProgress * 0.48);
    const frameRadiusPx = frameAnimationProgress * 36;

    // Quando o bottom do header (section) encosta na bottom da viewport,
    // `headerBottomOffset` vira >0. Mapear esse offset pela altura da
    // viewport faz com que o progresso vá até 1 quando o bottom alcançar o top.
    const articlesMoveProgress = typeof window !== 'undefined'
        ? Math.min(Math.max(headerBottomOffset / window.innerHeight, 0), 1)
        : 0;
    
    const autoIndex = 0; // fixed — no auto-rotation
    const heroFrameStyle: CSSProperties = {
        transform: `scale(${frameScale})`,
        borderRadius: `${frameRadiusPx}px`,
        overflow: 'hidden',
        transformOrigin: 'center center',
        willChange: 'transform, border-radius',
    };
    const outlineStrokeWidth = "clamp(0.7px, 0.13vw, 2px)";
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
    const viewportCutMaskStyle: CSSProperties = {
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 80%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 80%, transparent 100%)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        const syncViewport = () => {
            setIsMdUp(mediaQuery.matches);
        };

        syncViewport();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', syncViewport);
            return () => mediaQuery.removeEventListener('change', syncViewport);
        }

        mediaQuery.addListener(syncViewport);
        return () => mediaQuery.removeListener(syncViewport);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('hero');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const scrollableDistance = section.offsetHeight - window.innerHeight;
            const traveled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
            const progress = scrollableDistance > 0 ? traveled / scrollableDistance : 0;

            // bottomOffset > 0 quando o bottom do section vai além do bottom da viewport
            const bottomOffset = Math.max(0, window.innerHeight - rect.bottom);

            setScrollProgress(progress);
            setHeaderBottomOffset(bottomOffset);
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
        return Math.max(0, 1 - distance / 35);
    };

    const getStaticPrefixOpacity = (angle: number) => {
        return Math.abs(angle) <= 8 ? 1 : 0;
    };

    const getHeldAngle = (angle: number) => {
        if (Math.abs(angle) <= centerHoldDegrees) return 0;
        return angle > 0 ? angle - centerHoldDegrees : angle + centerHoldDegrees;
    };

    const getLabelStyle = (angle: number, reveal: number, stackBelow: boolean): CSSProperties => ({
        opacity: reveal,
        top: stackBelow ? '50%' : undefined,
        transform: stackBelow
            ? `translate(-100%, 0%) rotate(${angle}deg)`
            : `translate(-100%, -50%) rotate(${angle}deg)`,
        transformOrigin: stackBelow ? '150vw top' : '150vw center',
    });

    const getLabelFontStyle = (fontFamily: string, weight: number): CSSProperties => ({
        fontFamily,
        fontWeight: weight,
    });

    return (
        <section id="hero" className="relative h-[400vh] bg-[#0a0a0a]">

            <BackgroundTexts moveProgress={articlesMoveProgress} />

            <ScalableImage style={heroFrameStyle} src="/Hero/Nathan.png" alt="Nathan BG" />

            <HeroLayers
                isMdUp={isMdUp}
                heroFrameStyle={heroFrameStyle}
                viewportCutMaskStyle={viewportCutMaskStyle}
                labelSettings={labelSettings}
                silhouetteMaskStyle={silhouetteMaskStyle}
                outlineStrokeWidth={outlineStrokeWidth}
                circleRotation={circleRotation}
                getHeldAngle={getHeldAngle}
                getRevealProgress={getRevealProgress}
                getStaticPrefixOpacity={getStaticPrefixOpacity}
                getLabelStyle={getLabelStyle}
                getLabelFontStyle={getLabelFontStyle}
            />

        </section>
    );
}
