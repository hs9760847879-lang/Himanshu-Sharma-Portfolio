"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [cursorState, setCursorState] = useState<"default" | "button" | "project" | "link" | "skills">("default");
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Main cursor - fast follow
    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Trail ring - smooth delay
    const trailConfig = { damping: 25, stiffness: 180, mass: 0.8 };
    const trailX = useSpring(cursorX, trailConfig);
    const trailY = useSpring(cursorY, trailConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-cursor='project']")) setCursorState("project");
            else if (target.closest("[data-cursor='skills']")) setCursorState("skills");
            else if (target.closest("[data-cursor='button']")) setCursorState("button");
            else if (target.closest("a") || target.closest("button")) setCursorState("link");
            else setCursorState("default");
        };

        document.addEventListener("mouseover", handleHover);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleHover);
        };
    }, [isMobile, cursorX, cursorY]);

    if (isMobile) return null;

    const scaleMap = { 
        default: 1, 
        button: 2.2, 
        project: 3, 
        link: 1.5,
        skills: 1.8 
    };
    const labelMap = { 
        default: "", 
        button: "Click", 
        project: "View", 
        link: "",
        skills: "" 
    };

    return (
        <>
            {/* Main dot - super fast follow */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{ 
                    x: springX, 
                    y: springY, 
                    translateX: "-50%", 
                    translateY: "-50%" 
                }}
                animate={{ opacity: isVisible ? 1 : 0, scale: cursorState === "default" ? 1 : 0.8 }}
            >
                <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ 
                        background: cursorState === "default" ? "#fff" : "rgba(108,99,255,0.9)",
                        boxShadow: cursorState !== "default" ? "0 0 20px rgba(108,99,255,0.6)" : "none"
                    }}
                />
            </motion.div>

            {/* Outer ring - smooth trail */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
                style={{ 
                    x: trailX, 
                    y: trailY, 
                    translateX: "-50%", 
                    translateY: "-50%" 
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: scaleMap[cursorState],
                    rotate: cursorState === "project" ? 45 : 0,
                }}
                transition={{ 
                    scale: { type: "spring", damping: 18, stiffness: 280 },
                    rotate: { duration: 0.3 }
                }}
            >
                <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                    style={{
                        background: cursorState !== "default" ? "rgba(108,99,255,0.12)" : "transparent",
                        borderColor: cursorState !== "default" 
                            ? "rgba(108,99,255,0.9)" 
                            : "rgba(255,255,255,0.3)",
                        backdropFilter: cursorState !== "default" ? "blur(4px)" : "none",
                        transition: "all 0.2s ease",
                    }}
                >
                    {labelMap[cursorState] && (
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[8px] font-bold text-purple-300 tracking-[0.15em] uppercase"
                        >
                            {labelMap[cursorState]}
                        </motion.span>
                    )}
                </div>
            </motion.div>
        </>
    );
}
