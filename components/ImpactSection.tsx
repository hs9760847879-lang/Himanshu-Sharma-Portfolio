"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
    { value: 85, suffix: "%", label: "Workload Reduction", desc: "Avg. reduction in manual effort per project", color: "#6C63FF" },
    { value: 95, suffix: "%", label: "Time Saved", desc: "Commission update: 4 hours → 10 minutes", color: "#00D4FF" },
    { value: 12, suffix: "+", label: "Systems Built", desc: "Automation systems deployed in production", color: "#a78bfa" },
    { value: 4, suffix: "×", label: "Trackers Automated", desc: "Commission trackers running on autopilot", color: "#34d399" },
];

function CountUp({ target, suffix, isVisible, color }: { target: number; suffix: string; isVisible: boolean; color: string }) {
    const [count, setCount] = useState(0);
    const hasStarted = useRef(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isVisible || hasStarted.current) return;
        hasStarted.current = true;

        const duration = 2500;
        const steps = 80;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                setIsComplete(true);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <span className="relative inline-block">
            <motion.span
                animate={{
                    textShadow: isComplete
                        ? `0 0 30px ${color}80, 0 0 60px ${color}40`
                        : "none",
                }}
                transition={{ duration: 0.5 }}
            >
                {count}
                {suffix}
            </motion.span>
        </span>
    );
}

export default function ImpactSection() {
    const { ref, isVisible } = useScrollAnimation();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section id="impact" ref={containerRef} className="section-padding relative z-10 overflow-hidden">
            {/* Parallax background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: yBg }}
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
                    style={{
                        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(108,99,255,0.08) 0%, transparent 70%)",
                    }}
                />
            </motion.div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">
                        Numbers
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Real-World{" "}
                        <span className="gradient-text">Impact</span>
                    </h2>
                </motion.div>

                {/* Stats grid - centered */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="glass rounded-2xl p-6 text-center relative overflow-hidden group"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Glowing border on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    border: `1px solid ${stat.color}30`,
                                }}
                                animate={{
                                    boxShadow: isVisible
                                        ? `inset 0 0 20px ${stat.color}15, 0 0 0 transparent`
                                        : "none",
                                }}
                            />

                            {/* Background glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 70%)`,
                                }}
                            />

                            {/* Animated number with glow */}
                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    className="text-2xl sm:text-3xl md:text-4xl font-black mb-2"
                                    style={{ color: stat.color }}
                                    initial={{ opacity: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isVisible ? [1, 1.05, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.15 + 0.3,
                                        times: [0, 0.5, 1],
                                    }}
                                >
                                    <CountUp
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        isVisible={isVisible}
                                        color={stat.color}
                                    />
                                </motion.div>
                                <div className="text-xs sm:text-sm font-semibold text-white/80 mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-[10px] sm:text-xs text-white/35 leading-relaxed overflow-hidden text-ellipsis line-clamp-3">
                                    {stat.desc}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
