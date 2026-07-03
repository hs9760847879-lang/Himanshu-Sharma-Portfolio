"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
    {
        title: "Catalog Management Executive",
        company: "Amber",
        location: "Remote",
        period: "December 2023 — Present",
        color: "#6C63FF",
        highlights: [
            "Developed advanced automation systems reducing manual effort by 85–90%",
            "Built dashboards to track team performance and inventory insights",
            "Implemented workflow optimizations improving efficiency and accuracy",
            "Led automation initiatives including commission systems and data validation",
            "Managed inventory data, listings, and quality checks with high precision",
        ],
    },
    {
        title: "Catalog Management Intern",
        company: "Amber",
        location: "Remote",
        period: "June 2023 — December 2023",
        color: "#00D4FF",
        highlights: [
            "Built and maintained property listings with accuracy",
            "Supported commission updates and inventory tracking",
            "Assisted in quality checks and data validation processes",
        ],
    },
];

const educations = [
    {
        title: "Bachelor of Science (B.Sc.), Mathematics",
        institution: "R.S.S. (P.G.) College, Hapur",
        period: "August 2020 — August 2023",
        color: "#a78bfa",
    },
    {
        title: "Diploma in Information Technology",
        institution: "Lal Bahadur Shastri Computer Institute, Hapur",
        period: "June 2021 — June 2022",
        color: "#34d399",
    },
];

function GlassCard({ children, color }: { children: React.ReactNode; color: string }) {
    return (
        <motion.div
            className="glass rounded-2xl p-5 md:p-8 relative overflow-hidden"
            style={{ border: `1px solid ${color}20` }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 30% 10%, ${color}10 0%, transparent 50%)`,
                }}
            />
            <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

export default function ExperienceSection() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    return (
        <section id="experience" className="section-padding relative z-10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="container mx-auto relative z-10">
                {/* Work Experience Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-12 md:mb-16"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">
                        Career
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                </motion.div>

                {/* Experience Cards */}
                <div className="flex flex-col gap-8 md:gap-10 max-w-3xl mx-auto">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                        >
                            <GlassCard color={exp.color}>
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ background: `${exp.color}15`, color: exp.color }}
                                    >
                                        {exp.company}
                                    </span>
                                    <div className="flex items-center gap-1 text-white/40 text-xs">
                                        <MapPin size={12} />
                                        <span>{exp.location}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                                    {exp.title}
                                </h3>

                                <div className="flex items-center gap-1 text-white/40 text-xs mb-5">
                                    <Calendar size={12} />
                                    <span>{exp.period}</span>
                                </div>

                                <ul className="space-y-2">
                                    {exp.highlights.map((item, j) => (
                                        <li
                                            key={j}
                                            className="text-white/60 text-sm leading-relaxed flex items-start gap-2"
                                        >
                                            <span className="text-base mt-0.5" style={{ color: exp.color }}>
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Education Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mt-20 md:mt-24 mb-12 md:mb-16 w-full"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">
                        Academic
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        <span className="gradient-text">Education</span>
                    </h2>
                </motion.div>

                {/* Education Cards */}
                <div className="flex flex-col gap-8 md:gap-10 max-w-3xl mx-auto">
                    {educations.map((edu, i) => (
                        <motion.div
                            key={edu.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                        >
                            <GlassCard color={edu.color}>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                                    {edu.title}
                                </h3>
                                <div className="flex items-center gap-1 text-white/60 text-sm font-medium mb-2">
                                    <MapPin size={14} className="text-white/40" />
                                    <span>{edu.institution}</span>
                                </div>
                                <div className="flex items-center gap-1 text-white/40 text-xs">
                                    <Calendar size={12} />
                                    <span>{edu.period}</span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
