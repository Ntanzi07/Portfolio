'use client';

import Image from 'next/image';
import React, { type CSSProperties } from 'react';

export default function ScalableImage({ style, src, alt }: { style?: CSSProperties; src: string; alt: string }) {
    return (
        <div className="sticky top-0 inset-0 z-10 h-screen w-screen items-center mx-auto" style={style}>
            <Image
                src={src}
                alt={alt}
                fill
                quality={100}
                priority
                unoptimized
                draggable={false}
                className="object-cover grayscale-0 hue-rotate-0 brightness-120 pointer-events-none select-none"
            />
        </div>
    );
}
