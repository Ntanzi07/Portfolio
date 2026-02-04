"use client";

import { personalInfo } from "@/data/portfolio";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
            <div className="flex items-center justify-between mx-auto">
                <button 
                    className="cursor-magnetic flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Menu"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        className="text-white"
                    >
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
 
                <div className="cursor-magnetic text-white font-medium text-lg tracking-wide px-5 rounded-2xl ">
                    {personalInfo.name}
                </div>

                <div className="hidden md:flex relative cursor-magnetic  items-center gap-2 px-5 rounded-2xl text-white text-sm">
                    <span>{formatDate(currentTime)}</span>
                    <span className="font-mono">{formatTime(currentTime)}</span>
                </div>
            </div>
        </nav>
    );
}
