"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail, Download } from "lucide-react";

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 2.8 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" as const }
    },
};

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms
    const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 pb-12 overflow-hidden"
        >
            {/* Parallax gradient orb */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
                    y: yText,
                    opacity: opacityBg,
                }}
            />

            {/* Floating micro-elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </motion.div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(108,99,255,0.5) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(108,99,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center justify-between">
                    {/* Right: Image with parallax - better centered */}
                    <motion.div
                        className="order-1 md:order-2 flex justify-center md:justify-end md:items-center"
                        style={{ y: yImage, scale: scaleImage }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3, duration: 1, ease: "easeOut" }}
                    >
                        <div className="relative">
                            {/* Outer glow ring with enhanced animation */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "linear-gradient(135deg, rgba(108,99,255,0.5), rgba(0,212,255,0.3))",
                                    padding: "4px",
                                    borderRadius: "50%",
                                }}
                                animate={{
                                    boxShadow: [
                                        "0 0 30px rgba(108,99,255,0.3)",
                                        "0 0 60px rgba(108,99,255,0.5)",
                                        "0 0 30px rgba(108,99,255,0.3)",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Profile image */}
                            <motion.div
                                className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden"
                                style={{
                                    border: "3px solid transparent",
                                    background:
                                        "linear-gradient(#0B0F19, #0B0F19) padding-box, linear-gradient(135deg, #6C63FF, #00D4FF) border-box",
                                }}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/profile.jpeg"
                                    alt="Himanshu Sharma"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            {/* Floating badges with enhanced animation */}
                            <motion.div
                                className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 glass-strong rounded-xl px-4 py-2"
                                initial={{ opacity: 0, scale: 0, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 3.5, duration: 0.6, type: "spring" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-[10px] sm:text-xs text-white/50 font-medium whitespace-nowrap">Currently at</p>
                                <p className="text-xs sm:text-sm font-bold gradient-text whitespace-nowrap">Amber</p>
                            </motion.div>

                            <motion.div
                                className="absolute -top-3 -left-2 sm:-top-4 sm:-left-4 glass-strong rounded-xl px-4 py-2"
                                initial={{ opacity: 0, scale: 0, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 3.7, duration: 0.6, type: "spring" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-[10px] sm:text-xs text-white/50 font-medium">Automation</p>
                                <p className="text-xs sm:text-sm font-bold" style={{ color: "#00D4FF" }}>
                                    Specialist
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Left: Content with staggered reveal - better spacing */}
                    <motion.div
                        className="order-2 md:order-1 flex flex-col justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/80">
                                Portfolio
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] mb-8"
                        >
                            <span className="text-white">Himanshu</span>
                            <br />
                            <span className="shimmer-text">Sharma</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg text-white/50 font-medium mb-2"
                        >
                            Catalog Management Executive
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-sm sm:text-base text-purple-400/70 font-medium mb-8 tracking-wide"
                        >
                            Automation & Process Optimization
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="text-sm sm:text-base text-white/60 leading-[1.75] max-w-[550px] mb-12 flex flex-col gap-4"
                        >
                            <p>
                                I design scalable automation systems and workflows that reduce
                                manual effort and improve operational efficiency — turning
                                hours of work into minutes.
                            </p>
                            <p>
                                With 3 years of experience in ecommerce and catalog operations, I've optimized 1,500+ product listings for conversion, reduced manual workload by 85% through AI-driven automation, and managed high-impact seasonal campaigns and stakeholder coordination.
                            </p>
                        </motion.div>

                        {/* CTA Buttons with enhanced interactions */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 mt-2"
                        >
                            <motion.a
                                href="#projects"
                                data-cursor="button"
                                className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm text-white transition-all whitespace-nowrap"
                                style={{ background: "linear-gradient(135deg, #6C63FF, #4f46e5)" }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 40px rgba(108,99,255,0.6)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work <ArrowRight size={16} />
                            </motion.a>

                            <motion.a
                                href="#contact"
                                data-cursor="button"
                                className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm text-white/80 hover:text-white glass transition-all whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail size={16} /> Contact Me
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/himanshu-sharma-814785250"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="link"
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/60 hover:text-blue-400 glass transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LinkedInIcon size={16} />
                            </motion.a>

                            <motion.a
                                href="/Himanshu_Sharma_Resume.pdf"
                                download
                                data-cursor="button"
                                className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white glass transition-all whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={16} /> Resume
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5, duration: 1 }}
                >
                    <span className="text-xs text-white/30 tracking-widest uppercase hidden sm:inline">Scroll</span>
                    <motion.div
                        className="w-px h-6 sm:h-8 bg-gradient-to-b from-purple-500/50 to-transparent"
                        animate={{ scaleY: [0, 1, 0], originY: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
