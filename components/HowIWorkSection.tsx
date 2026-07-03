"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Target, Ruler, RefreshCcw, CheckCircle2 } from "lucide-react";

const principles = [
    {
        icon: <Target className="w-8 h-8" />,
        title: "Automate First",
        desc: "Before building anything, I identify the highest-friction manual tasks and design automation to eliminate them completely.",
        gradient: "from-purple-500/20 to-transparent",
        color: "#6C63FF",
    },
    {
        icon: <Ruler className="w-8 h-8" />,
        title: "Build for Scale",
        desc: "Every system I build is designed to scale — whether it's 4 trackers or 400, the architecture remains clean and maintainable.",
        gradient: "from-cyan-500/20 to-transparent",
        color: "#00D4FF",
    },
    {
        icon: <RefreshCcw className="w-8 h-8" />,
        title: "Continuous Optimization",
        desc: "Automation is a starting point. I continuously monitor outputs for edge cases and refine rules to improve accuracy over time.",
        gradient: "from-violet-500/20 to-transparent",
        color: "#a78bfa",
    },
    {
        icon: <CheckCircle2 className="w-8 h-8" />,
        title: "Accuracy Above All",
        desc: "Speed means nothing without reliability. Every automated output goes through validation to maintain high data integrity.",
        gradient: "from-emerald-500/20 to-transparent",
        color: "#34d399",
    },
];

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (rect.height / 2)) * -10; // Max -10 to 10 degrees
        const rotateY = (mouseX / (rect.width / 2)) * 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                scale: isHovered ? 1.03 : 1,
            }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.5,
            }}
            className="w-full"
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
}

export default function HowIWorkSection() {
    const { ref, isVisible } = useScrollAnimation();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <section id="how-i-work" ref={containerRef} className="section-padding relative z-10 overflow-hidden">
            {/* Parallax background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: yBg }}
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%)",
                    }}
                />
            </motion.div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-10 md:mb-16 lg:mb-24"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-4">
                        Approach
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                        How I <span className="gradient-text">Work</span>
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto text-center leading-relaxed px-4">
                        My approach to solving operational problems through systematic automation
                    </p>
                </motion.div>

                {/* Cards with 3D tilt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto">
                    {principles.map((p, i) => (
                        <TiltCard key={p.title} color={p.color}>
                            <motion.div
                                className="glass rounded-2xl p-6 relative overflow-hidden group w-full flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                                style={{
                                    transform: "translateZ(0)",
                                }}
                            >
                                {/* Enhanced background gradient */}
                                <motion.div
                                    className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${p.gradient} pointer-events-none`}
                                    animate={{ opacity: isVisible ? 0.15 : 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                                />

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.1 }}
                                    style={{
                                        background: `radial-gradient(circle at 30% 30%, ${p.color} 0%, transparent 50%)`,
                                    }}
                                />

                                {/* 3D floating content */}
                                <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(30px)" }}>
                                    <motion.div
                                        className="text-2xl sm:text-3xl mb-3 sm:mb-4 flex justify-center w-full"
                                        animate={{
                                            scale: isVisible ? [0.8, 1.1, 1] : 1,
                                            rotate: isVisible ? [0, -5, 0] : 0,
                                        }}
                                        transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
                                    >
                                        {p.icon}
                                    </motion.div>
                                    <h3 className="text-base sm:text-lg font-bold text-white mb-3">{p.title}</h3>
                                    <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-[280px] sm:max-w-none">{p.desc}</p>
                                </div>

                                {/* Subtle shadow on hover */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                                    style={{ background: p.color }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                />
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>

                <div className="h-16 md:h-32" aria-hidden="true" />

                <div className="flex justify-center w-full">
                    <motion.div
                        className="mt-8 md:mt-24 glass-strong rounded-2xl p-6 text-center relative overflow-hidden max-w-3xl w-full mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.7 }}
                    >
                        {/* Background glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.1) 0%, transparent 60%)",
                            }}
                        />

                        <motion.p
                            className="text-white/70 text-sm sm:text-lg italic leading-relaxed max-w-2xl mx-auto relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            &ldquo;The best workflow is one that no one has to think about — it just happens, correctly, every time.&rdquo;
                        </motion.p>
                        <motion.p
                            className="text-purple-400/70 text-xs sm:text-sm mt-4 font-medium relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            — Himanshu Sharma
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
