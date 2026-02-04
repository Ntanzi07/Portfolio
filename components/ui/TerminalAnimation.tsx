"use client";

import { useState, useEffect } from "react";
import { personalInfo } from "@/data/portfolio";

export default function TerminalAnimation() {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [userIP, setUserIP] = useState("Loading...");

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setUserIP(data.ip))
            .catch(() => setUserIP("Unknown"));
    }, []);

    const commands = [
        { command: "whoami", output: personalInfo.name },
        { command: "hostname -I", output: userIP },
        { command: "pwd", output: "/home/developer/projects" },
        { command: "cat about.txt", output: personalInfo.title },
        { command: "ls skills/", output: "React • Next.js • TypeScript • Node.js" },
    ];

    useEffect(() => {
        if (currentLine >= commands.length) return;

        const currentCommand = commands[currentLine];
        const fullText = currentCommand.command;

        if (currentText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setCurrentText(fullText.slice(0, currentText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else {

            const timeout = setTimeout(() => {
                setCurrentText("");
                setCurrentLine(currentLine + 1);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentText, currentLine]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-sk-modernist tracking-[.12em] text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] 
        xl:text-[1.5rem] m-3 md:m-10 backdrop-blur-md border border-white/20 rounded-2xl py-6 px-2 md:px-6 
        w-full max-w-[90vw] lg:max-w-[40vw]">

            <div className="flex flex-col-reverse space-y-reverse space-y-3 min-h-[200px] overflow-hidden">
                {currentLine >= commands.length && (
                    <div className="cursor-magnetic flex items-center gap-1 px-5 mix-blend-difference break-words flex-wrap">
                        <span className="">nath@MyDescktop:</span>
                        <span className="">~</span>
                        {showCursor && <span className="">▌</span>}
                    </div>
                )}

                {currentLine < commands.length && (
                    <div className="cursor-magnetic flex items-center gap-1 px-5 mix-blend-difference break-words flex-wrap">
                        <span className="">nath@MyDescktop:</span>
                        <span className="">~</span>
                        <span className="break-all">{currentText}</span>
                        {showCursor && <span className="">▌</span>}
                    </div>
                )}

                {commands.slice(0, currentLine).reverse().map((cmd, idx) => (
                    <div key={idx} className="cursor-magnetic space-y-1 px-5 mix-blend-difference w-full">
                        <div className="flex items-center gap-1 flex-wrap w-full overflow-hidden">
                            <span className="shrink-0">nath@MyDescktop:</span>
                            <span className="shrink-0">~</span>
                            <span className="break-all overflow-wrap-anywhere">{cmd.command}</span>
                        </div>
                        <div className="text-white/70 break-words overflow-wrap-anywhere">{cmd.output}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
