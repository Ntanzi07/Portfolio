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
        <div className="font-sk-modernist tracking-[.12em] text-[4vw] sm:text-[1.2rem] m-10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:w-[40vw] min-w-fit">

            <div className="space-y-3">
                {commands.slice(0, currentLine).map((cmd, idx) => (
                    <div key={idx} className=" space-y-1 mix-blend-difference">
                        <div className="flex items-center gap-1 flex-wrap">
                            <span className="">nath@MyDescktop:</span>
                            <span className="">~</span>
                            <span className="">{cmd.command}</span>
                        </div>
                        <div className="text-white/70">{cmd.output}</div>
                    </div>
                ))}

                {currentLine < commands.length && (
                    <div className="flex items-center gap-1 mix-blend-difference flex-wrap">
                        <span className="">nath@MyDescktop:</span>
                        <span className="">~</span>
                        <span className="">{currentText}</span>
                        {showCursor && <span className="">▌</span>}
                    </div>
                )}

                {currentLine >= commands.length && (
                    <div className="flex items-center gap-1 mix-blend-difference flex-wrap">
                        <span className="">nath@MyDescktop:</span>
                        <span className="">~</span>
                        {showCursor && <span className="">▌</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
