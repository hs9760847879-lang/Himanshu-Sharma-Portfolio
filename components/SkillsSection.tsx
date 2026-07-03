"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
    {
        icon: "🤖",
        label: "AI Automation",
        desc: "Building intelligent automation agents with n8n and AI tools",
        color: "#6C63FF",
    },
    {
        icon: "📊",
        label: "Google Sheets",
        desc: "Advanced formulas, scripts, and data pipelines",
        color: "#00D4FF",
    },
    {
        icon: "🔄",
        label: "Workflow Design",
        desc: "End-to-end automated workflow architecture",
        color: "#a78bfa",
    },
    {
        icon: "📈",
        label: "Data Processing",
        desc: "Validation, transformation, and enrichment at scale",
        color: "#34d399",
    },
    {
        icon: "✅",
        label: "QA Systems",
        desc: "Rule-based quality checks and error detection",
        color: "#f59e0b",
    },
    {
        icon: "🏢",
        label: "Inventory Mgmt",
        desc: "Property catalog management and deduplication",
        color: "#f472b6",
    },
    {
        icon: "📋",
        label: "Catalog Ops",
        desc: "Commission tracking, policy management, and more",
        color: "#60a5fa",
    },
    {
        icon: "🌐",
        label: "Web Scraping",
        desc: "Automated FAQ and policy extraction pipelines",
        color: "#4ade80",
    },
];

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export default function SkillsSection() {
    const { ref, isVisible } = useScrollAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHoveringDock, setIsHoveringDock] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Track mouse position relative to dock container
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("mouseenter", () => setIsHoveringDock(true));
        container.addEventListener("mouseleave", () => {
            setIsHoveringDock(false);
            setHoveredIndex(null);
        });
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mouseenter", () => setIsHoveringDock(true));
            container.removeEventListener("mouseleave", () => {
                setIsHoveringDock(false);
                setHoveredIndex(null);
            });
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Calculate scale based on cursor proximity (Apple Dock behavior)
    const getDockScale = (index: number) => {
        if (!containerRef.current || !isHoveringDock) return { scale: 1, y: 0 };

        const container = containerRef.current;
        const skillElements = container.querySelectorAll("[data-skill]");
        const skillElement = skillElements[index] as HTMLElement;

        if (!skillElement) return { scale: 1, y: 0 };

        const rect = skillElement.getBoundingClientRect();
        const skillCenterX = rect.left + rect.width / 2 - container.getBoundingClientRect().left;
        const skillCenterY = rect.top + rect.height / 2 - container.getBoundingClientRect().top;

        const distance = calculateDistance(mousePos.x, mousePos.y, skillCenterX, skillCenterY);
        const maxDistance = 200; // Distance at which effect stops

        if (distance > maxDistance) return { scale: 1, y: 0 };

        // Calculate scale based on proximity (closer = larger)
        const proximity = 1 - distance / maxDistance;
        const scale = 1 + proximity * 0.4; // Max scale 1.4x
        const y = -proximity * 15; // Move up up to 15px

        return { scale, y };
    };

    return (
        <section id="skills" className="section-padding relative z-10 pb-16 md:pb-24">
            {/* Parallax background element */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)",
                }}
                animate={{
                    y: isVisible ? [0, -30, 0] : 0,
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                        isVisible
                            ? { opacity: 1, y: hoveredIndex !== null ? -44 : 0 }
                            : {}
                    }
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">
                        Expertise
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Skills &{" "}
                        <span className="gradient-text">Capabilities</span>
                    </h2>
                </motion.div>

                {/* Apple Dock */}
                <motion.div
                    ref={containerRef}
                    className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-6 items-end h-[120px] md:h-[140px]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {skills.map((skill, i) => {
                        const { scale, y } = getDockScale(i);
                        const isHovered = hoveredIndex === i;

                        return (
                            <motion.div
                                key={skill.label}
                                data-skill
                                data-cursor="skills"
                                className="relative flex flex-col items-center cursor-pointer min-w-[64px]"
                                animate={{
                                    scale: isHoveringDock ? scale : isHovered ? 1.25 : 1,
                                    y: isHoveringDock ? y : isHovered ? -8 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 350,
                                    mass: 0.5
                                }}
                                onHoverStart={() => setHoveredIndex(i)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                {/* Tooltip */}
                                <motion.div
                                    className="absolute -top-16 left-1/2 -translate-x-1/2 glass-strong rounded-xl px-4 py-2 w-48 text-center pointer-events-none z-20"
                                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                    animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 5, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className="text-xs text-white/70">{skill.desc}</p>
                                    <div
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                                        style={{ background: "rgba(255,255,255,0.07)" }}
                                    />
                                </motion.div>

                                {/* Icon container with enhanced glow */}
                                <motion.div
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass flex items-center justify-center text-xl sm:text-2xl mb-2 relative overflow-hidden"
                                    style={{
                                        border: isHovered || (isHoveringDock && scale > 1.1)
                                            ? `1px solid ${skill.color}60`
                                            : "1px solid rgba(255,255,255,0.08)",
                                        boxShadow: isHovered || (isHoveringDock && scale > 1.1)
                                            ? `0 0 25px ${skill.color}40`
                                            : "none",
                                        background: isHoveringDock && scale > 1.1
                                            ? `${skill.color}08`
                                            : "transparent",
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Dynamic glow based on proximity */}
                                    {(isHoveringDock && scale > 1) && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{
                                                background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: scale > 1 ? (scale - 1) / 0.4 : 0 }}
                                        />
                                    )}
                                    <span className="relative z-10">{skill.icon}</span>
                                </motion.div>

                                {/* Label */}
                                <motion.span
                                    className="text-xs font-medium text-white/60 text-center whitespace-nowrap mt-2 leading-none"
                                    animate={{
                                        opacity: isHoveringDock && scale > 1.1 ? 0 : 0.6,
                                    }}
                                >
                                    {skill.label}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
