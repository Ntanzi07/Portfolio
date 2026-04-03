'use client';

import Image from 'next/image';
import React, { Fragment, type CSSProperties, type ReactNode } from 'react';

type LabelSetting = {
    key: string;
    content: ReactNode;
    staticPrefix?: ReactNode;
    fontFamily: string;
    weight: number;
    baseAngle: number;
    sizeClasses: string;
    sizeClassesSub: string;
    className: string;
};

export default function HeroLayers(props: {
    isMdUp: boolean;
    heroFrameStyle: CSSProperties;
    viewportCutMaskStyle: CSSProperties;
    labelSettings: LabelSetting[];
    silhouetteMaskStyle: CSSProperties;
    outlineStrokeWidth: string;
    circleRotation: number;
    getHeldAngle: (angle: number) => number;
    getRevealProgress: (angle: number) => number;
    getStaticPrefixOpacity: (angle: number) => number;
    getLabelStyle: (angle: number, reveal: number, stackBelow: boolean) => CSSProperties;
    getLabelFontStyle: (fontFamily: string, weight: number) => CSSProperties;
}) {
    const {
        isMdUp,
        heroFrameStyle,
        viewportCutMaskStyle,
        labelSettings,
        silhouetteMaskStyle,
        outlineStrokeWidth,
        circleRotation,
        getHeldAngle,
        getRevealProgress,
        getStaticPrefixOpacity,
        getLabelStyle,
        getLabelFontStyle,
    } = props;

    return (
        <div className="absolute inset-0 z-20 h-[400vh] select-none">
            <div
                className="sticky top-0 h-screen w-screen overflow-hidden pointer-events-none"
                style={isMdUp ? { ...heroFrameStyle, ...viewportCutMaskStyle } : heroFrameStyle}
            >
                <div className="absolute z-0 top-[75%] right-0 h-2.5 w-2.5 md:top-[42%]">
                    {labelSettings.map((item) => {
                        const angle = getHeldAngle(item.baseAngle + circleRotation);
                        const reveal = getRevealProgress(angle);
                        const staticPrefixOpacity = getStaticPrefixOpacity(angle);

                        return (
                            <Fragment key={item.key}>
                                {item.staticPrefix ? (
                                    <span
                                        className={`absolute w-screen ${item.sizeClassesSub} ${item.className} text-end mix-blend-difference hue-rotate-150 text-white transition-all duration-500 ease-out`}
                                        style={{
                                            opacity: staticPrefixOpacity,
                                            top: '50%',
                                            transform: 'translate(-100%, -100%)',
                                            ...getLabelFontStyle(item.fontFamily, item.weight),
                                        }}
                                    >
                                        {item.staticPrefix}
                                    </span>
                                ) : null}

                                <span
                                    className={`absolute w-screen ${item.sizeClasses} ${item.className} text-end mix-blend-difference 
                                        hue-rotate-150 text-white transition-all duration-500 ease-out`}
                                    style={{
                                        ...getLabelStyle(angle, reveal, Boolean(item.staticPrefix)),
                                        ...getLabelFontStyle(item.fontFamily, item.weight),
                                    }}
                                >
                                    {item.content}
                                </span>
                            </Fragment>
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
                        draggable={false}
                        className="object-cover grayscale-0 hue-rotate-0 brightness-120 pointer-events-none select-none"
                    />
                </div>

                <div className="absolute inset-0 z-10" style={silhouetteMaskStyle}>
                    <div className="absolute z-10 top-[75%] right-0 h-2.5 w-2.5 md:top-[42%]">
                        {labelSettings.map((item) => {
                            const angle = getHeldAngle(item.baseAngle + circleRotation);
                            const reveal = getRevealProgress(angle);
                            const staticPrefixOpacity = getStaticPrefixOpacity(angle);

                            return (
                                <Fragment key={`${item.key}-outline`}>
                                    {item.staticPrefix ? (
                                        <span
                                            className={`absolute w-screen ${item.sizeClassesSub} ${item.className} text-end mix-blend-difference hue-rotate-150 text-white transition-all duration-500 ease-out`}
                                            style={{
                                                opacity: staticPrefixOpacity,
                                                top: '50%',
                                                transform: 'translate(-100%, -100%)',
                                                ...getLabelFontStyle(item.fontFamily, item.weight),
                                                color: 'transparent',
                                                WebkitTextStroke: `${outlineStrokeWidth} rgb(255 255 255)`,
                                            }}
                                        >
                                            {item.staticPrefix}
                                        </span>
                                    ) : null}
                                    <span
                                        className={`absolute w-screen ${item.sizeClasses} ${item.className}
                                            text-end transition-all duration-500 ease-out`}
                                        style={{
                                            ...getLabelStyle(angle, reveal, Boolean(item.staticPrefix)),
                                            ...getLabelFontStyle(item.fontFamily, item.weight),
                                            color: 'transparent',
                                            WebkitTextStroke: `${outlineStrokeWidth} rgb(255 255 255)`,
                                        }}
                                    >
                                        {item.content}
                                    </span>
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
