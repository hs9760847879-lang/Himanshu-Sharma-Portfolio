"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Wrench, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

const projects = [
    {
        id: 13,
        emoji: "👥",
        title: "Team Task Tracker",
        shortDesc: "Role-based task management system with dedicated admin & agent panels for streamlined team operations",
        impact: "Full visibility",
        impactMetric: "Task efficiency",
        color: "#6C63FF",
        problem: "No centralized system to assign, track, and manage team tasks — led to missed deadlines, unclear ownership, and lack of accountability.",
        solution: "Built a comprehensive task tracker with an admin panel for task creation/assignment/review, an agent panel for status updates, and a real-time dashboard for team-wide visibility.",
        tools: ["Supabase", "Vercel", "GitHub", "Google Sheets", "Apps Script"],
        fullImpact: [
            "Centralized task assignment with role-based access",
            "Real-time visibility into task progress for management",
            "Reduced missed deadlines and improved accountability"
        ],
    },
    {
        id: 1,
        emoji: "🧠",
        title: "Commission Tracker Automation",
        shortDesc: "Automated validation system for commission data across multiple trackers",
        impact: "2 hours → 5 minutes",
        impactMetric: "96% time reduction",
        color: "#6C63FF",
        problem: "Manual verification of each commission tracker took ~2 hours and was prone to inconsistencies and human errors.",
        solution: "Built a Google Sheets-based automation to validate data, flag inconsistencies, and streamline checks across multiple trackers.",
        tools: ["Google Sheets", "Apps Script", "Validation Logic", "Email Alerts"],
        fullImpact: ["Reduced processing time from ~2 hours to under 5 minutes", "Implemented across 4 trackers", "Significant reduction in manual errors"],
    },
    {
        id: 2,
        emoji: "🔍",
        title: "Commission QC Automation",
        shortDesc: "Rule-based automated quality checks ensuring accuracy across commission datasets",
        impact: "100% consistency",
        impactMetric: "Error-free QC",
        color: "#00D4FF",
        problem: "Manual QC was time-consuming and inconsistent across datasets, with errors slipping through.",
        solution: "Designed an automated QC workflow to validate commission entries, apply rule-based checks, and highlight discrepancies.",
        tools: ["Google Sheets", "Data Validation", "Rules Engine", "Reporting"],
        fullImpact: ["Faster and more reliable QC process", "Improved data accuracy", "Reduced repetitive manual checks"],
    },
    {
        id: 3,
        emoji: "🧾",
        title: "Duplicate Property Detection",
        shortDesc: "Automated duplicate detection and visual highlighting for inventory cleanup",
        impact: "0 duplicates",
        impactMetric: "Clean inventory",
        color: "#a78bfa",
        problem: "Duplicate entries caused data inconsistencies and operational inefficiencies across the inventory.",
        solution: "Developed an automated sheet that detects duplicate properties using matching logic and visually highlights them.",
        tools: ["Google Sheets", "Duplicate Logic", "Visual Highlighting", "Inventory Systems"],
        fullImpact: ["Reduced data duplication significantly", "Improved inventory accuracy", "Saved manual verification time"],
    },
    {
        id: 4,
        emoji: "⏰",
        title: "Commission Expiry Alert System",
        shortDesc: "Proactive email alerts for commissions expiring within 3 days",
        impact: "Zero missed expiries",
        impactMetric: "Proactive alerts",
        color: "#34d399",
        problem: "Missed commission expiry dates led to revenue and operational issues.",
        solution: "Built an automation that tracks commission end dates and automatically sends email alerts for expiring items.",
        tools: ["Google Sheets", "Apps Script", "Email Notifications", "Date Logic"],
        fullImpact: ["Prevented missed commission updates", "Improved operational responsiveness", "Reduced manual monitoring effort"],
    },
    {
        id: 5,
        emoji: "🤖",
        title: "Data Verification Agent",
        shortDesc: "n8n-powered multi-source data verification and enrichment agent",
        impact: "5× faster validation",
        impactMetric: "AI-powered",
        color: "#f59e0b",
        problem: "Manual verification across multiple sources was time-intensive and inconsistent.",
        solution: "Created an automated agent using n8n that performs Google searches, validates data, and performs intelligent matching.",
        tools: ["n8n", "AI APIs", "Web Search", "Data Matching"],
        fullImpact: ["Reduced manual research effort significantly", "Faster data verification pipeline", "Improved data reliability"],
    },
    {
        id: 6,
        emoji: "📊",
        title: "Team Performance Dashboard",
        shortDesc: "Centralized dashboard for team productivity and project tracking",
        impact: "Full visibility",
        impactMetric: "Management insights",
        color: "#f472b6",
        problem: "Lack of a unified view for team performance and workload tracking.",
        solution: "Built a dashboard that consolidates all project data with team workload visibility and centralized reporting.",
        tools: ["Google Sheets", "Dashboard Design", "Data Aggregation", "Reporting"],
        fullImpact: ["Improved visibility for management", "Better data-driven decision-making", "Reduced manual reporting effort"],
    },
    {
        id: 7,
        emoji: "📈",
        title: "Inventory Analytics Dashboard",
        shortDesc: "Advanced analytics with weekly/monthly/quarterly breakdowns",
        impact: "360° analytics",
        impactMetric: "Multi-period view",
        color: "#60a5fa",
        problem: "Data scattered across systems made tracking inefficient with no comparative insights.",
        solution: "Developed a comprehensive dashboard with inventory data, task assignment, and comparative team performance.",
        tools: ["Google Sheets", "Advanced Formulas", "Charts", "Issue Tracking"],
        fullImpact: ["Data-driven decision making", "Faster task allocation", "Improved team efficiency"],
    },
    {
        id: 8,
        emoji: "💰",
        title: "Bulk Commission Automation",
        shortDesc: "Bulk update commissions across multiple properties in one operation",
        impact: "4 hours → 10 minutes",
        impactMetric: "95% time saved",
        color: "#4ade80",
        problem: "Updating commissions manually across properties took up to 4 hours.",
        solution: "Created automation to perform bulk commission updates across multiple properties in a single operation.",
        tools: ["Google Sheets", "Bulk Processing", "Apps Script", "Data Validation"],
        fullImpact: ["Reduced update time from ~4 hours to ~10 minutes", "Massive efficiency improvement", "Reduced manual errors"],
    },
    {
        id: 9,
        emoji: "🔄",
        title: "Commission Update Automation",
        shortDesc: "Streamlined bulk update system for recurring commission structures",
        impact: "4 hours → 10 min",
        impactMetric: "Recurring savings",
        color: "#fb923c",
        problem: "Updating existing commissions manually was repetitive and time-consuming.",
        solution: "Built a system to update commission data in bulk with minimal effort.",
        tools: ["Google Sheets", "Automation", "Bulk Operations"],
        fullImpact: ["4 hours reduced to 10 minutes", "Streamlined recurring updates", "Improved consistency"],
    },
    {
        id: 10,
        emoji: "📌",
        title: "Commission Monitoring Dashboard",
        shortDesc: "POC tool for identifying expired/inactive commissions",
        impact: "Faster follow-ups",
        impactMetric: "POC enablement",
        color: "#c084fc",
        problem: "POCs lacked visibility into properties needing commission updates.",
        solution: "Developed a dashboard that highlights expired commissions with an actionable property list.",
        tools: ["Google Sheets", "Filtering Logic", "Dashboard", "Operational Reporting"],
        fullImpact: ["Enabled faster coordination with SPOCs", "Reduced delay in updates", "Improved tracking accuracy"],
    },
    {
        id: 11,
        emoji: "🌐",
        title: "FAQ Extraction Scraper",
        shortDesc: "Automated scraper that fetches and structures FAQ data",
        impact: "Manual effort → 0",
        impactMetric: "Fully automated",
        color: "#2dd4bf",
        problem: "Manual FAQ extraction was repetitive, time-consuming, and inconsistent.",
        solution: "Developed a scraper to automatically fetch and structure FAQ data from target websites.",
        tools: ["Web Scraping", "Data Parsing", "Automation", "Content Pipeline"],
        fullImpact: ["Eliminated manual extraction effort", "Faster content creation pipeline", "Improved efficiency at scale"],
    },
    {
        id: 12,
        emoji: "📜",
        title: "Policy Extraction & AI Tool",
        shortDesc: "Scraper + AI pipeline that extracts and enhances policy data",
        impact: "AI-enhanced output",
        impactMetric: "Standardized quality",
        color: "#e879f9",
        problem: "Policy extraction and formatting required significant manual effort.",
        solution: "Built a system that extracts policy data via scraping and enhances it using AI.",
        tools: ["Web Scraping", "AI APIs", "Dashboard Integration", "Content Enhancement"],
        fullImpact: ["Improved content quality with AI enhancement", "Reduced manual workload", "Standardized policy outputs"],
    },
];

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

function CardContent({ project, mini }: { project: typeof projects[0]; mini?: boolean }) {
    return (
        <div className={`relative z-10 flex flex-col h-full justify-between ${mini ? "gap-0" : ""}`} style={{ minHeight: mini ? "auto" : "500px" }}>
            <div className={mini ? "" : "flex-shrink-0"}>
                <div className="flex items-center justify-between mb-3">
                    <span className={mini ? "text-2xl" : "text-4xl"}>{project.emoji}</span>
                    <div className={`px-${mini ? "3" : "4"} py-1.5 rounded-full text-xs font-bold whitespace-nowrap leading-none`} style={{ background: `${project.color}20`, color: project.color }}>
                        {project.impact}
                    </div>
                </div>
                <h3 className={`font-bold text-white leading-tight mb-1 line-clamp-2 ${mini ? "text-sm" : "text-xl"}`}>{project.title}</h3>
                <p className={`text-white/60 leading-relaxed mb-2 ${mini ? "text-xs line-clamp-2" : "text-base line-clamp-2"}`}>{project.shortDesc}</p>
            </div>
            <div className={`flex flex-col ${mini ? "gap-1 mt-1" : "flex-grow py-4 gap-4"}`}>
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <AlertCircle size={mini ? 10 : 14} style={{ color: project.color }} />
                        <span className={`font-bold text-blue-400 uppercase tracking-wider ${mini ? "text-[8px]" : "text-xs"}`}>Problem</span>
                    </div>
                    <p className={`text-white/70 leading-relaxed ${mini ? "text-[10px] line-clamp-2" : "text-sm line-clamp-3"}`}>{project.problem}</p>
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-1">
                        <Lightbulb size={mini ? 10 : 14} style={{ color: project.color }} />
                        <span className={`font-bold text-blue-400 uppercase tracking-wider ${mini ? "text-[8px]" : "text-xs"}`}>Solution</span>
                    </div>
                    <p className={`text-white/70 leading-relaxed ${mini ? "text-[10px] line-clamp-2" : "text-sm line-clamp-3"}`}>{project.solution}</p>
                </div>
                <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <Wrench size={mini ? 10 : 14} style={{ color: project.color }} />
                        <span className={`font-semibold text-white/50 uppercase ${mini ? "text-[8px]" : "text-xs"}`}>Tools Used</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tools.map((tool) => (
                            <span key={tool} className={`rounded-lg font-semibold ${mini ? "px-2 py-0.5 text-[7px]" : "px-4 py-2 text-xs"}`} style={{ background: `${project.color}15`, color: project.color }}>
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`flex-shrink-0 pt-4 border-t border-white/10 ${mini ? "mt-1" : ""}`}>
                <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={mini ? 10 : 14} style={{ color: project.color }} />
                    <span className={`font-bold text-blue-400 uppercase tracking-wider ${mini ? "text-[8px]" : "text-xs"}`}>Impact</span>
                </div>
                <ul className="space-y-2">
                    {project.fullImpact.map((item, i) => (
                        <li key={i} className={`text-white/60 flex items-start gap-1.5 ${mini ? "text-[9px] line-clamp-1" : "text-sm line-clamp-2"}`}>
                            <span className={`${mini ? "text-xs" : "text-base"} mt-0.5`} style={{ color: project.color }}>•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function MiniCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
    return (
        <motion.button
            layoutId={`project-${project.id}`}
            onClick={onClick}
            className="relative flex-shrink-0 cursor-pointer hidden md:block"
            style={{ width: "320px" }}
        >
            <motion.div
                className="rounded-3xl p-6 relative overflow-hidden flex flex-col"
                style={{
                    background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                    border: "1px solid rgba(108, 99, 255, 0.15)",
                    opacity: 0.6,
                    filter: "blur(2px)",
                    minHeight: "560px",
                }}
                whileHover={{
                    scale: 1.02,
                    opacity: 0.7,
                    filter: "blur(1.5px)"
                }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at 30% 5%, ${project.color}10 0%, transparent 50%)` }} />
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
                <CardContent project={project} mini />
            </motion.div>
        </motion.button>
    );
}

function MainCard({ project }: { project: typeof projects[0] }) {
    return (
        <motion.div
            layoutId={`project-${project.id}`}
            className="relative flex-shrink-0"
            style={{ width: "320px" }}
        >
            <motion.div
                className="rounded-3xl p-6 relative overflow-hidden flex flex-col"
                style={{
                    background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                    border: `1px solid ${project.color}40`,
                    boxShadow: `0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px ${project.color}20`,
                    minHeight: "560px",
                }}
            >
                <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at 30% 5%, ${project.color}15 0%, transparent 50%)` }} />
                <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
                <CardContent project={project} />
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
        >
            <div
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                    border: `1px solid ${project.color}30`,
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px ${project.color}10`,
                }}
            >
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(circle at 30% 10%, ${project.color}10 0%, transparent 50%)` }} />
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{project.emoji}</span>
                        <div className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: `${project.color}20`, color: project.color }}>
                            {project.impact}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{project.shortDesc}</p>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <AlertCircle size={14} style={{ color: project.color }} />
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Problem</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Lightbulb size={14} style={{ color: project.color }} />
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Solution</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">{project.solution}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Wrench size={14} style={{ color: project.color }} />
                            <span className="text-[10px] font-semibold text-white/50 uppercase">Tools Used</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                                <span key={tool} className="px-3 py-1 rounded-lg text-[10px] font-semibold" style={{ background: `${project.color}12`, color: project.color }}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={14} style={{ color: project.color }} />
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Impact</span>
                        </div>
                        <ul className="space-y-1">
                            {project.fullImpact.map((item, j) => (
                                <li key={j} className="text-white/60 text-sm flex items-start gap-2">
                                    <span className="text-base mt-0.5" style={{ color: project.color }}>•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const yBg = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const goToPrev = useCallback(() => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    }, []);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }, []);

    const goToIndex = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const minSwipe = 50;
        if (Math.abs(diff) > minSwipe) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            goToPrev();
        } else {
            goToNext();
        }
    };

    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    const nextIndex = (activeIndex + 1) % projects.length;

    return (
        <section id="projects" ref={containerRef} className="section-padding relative z-10">
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute top-0 left-0 right-0 bottom-0" style={{ y: yBg }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full" style={{ background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />
                </motion.div>
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-16 mt-4 md:mt-0 flex flex-col items-center">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">Portfolio</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Projects & <span className="gradient-text">Automation Work</span></h2>
                    <p className="text-white/40 text-sm hidden md:block">Click side cards to navigate</p>
                    <p className="text-white/40 text-sm md:hidden mb-4">Swipe left or right to navigate</p>
                </motion.div>

                {/* Desktop: 3-card carousel */}
                <div className="hidden md:flex items-center justify-center gap-6 py-8 md:py-16 select-none">
                    <LayoutGroup>
                        <MiniCard project={projects[prevIndex]} onClick={() => goToIndex(prevIndex)} />
                        <MainCard project={projects[activeIndex]} />
                        <MiniCard project={projects[nextIndex]} onClick={() => goToIndex(nextIndex)} />
                    </LayoutGroup>
                </div>

                {/* Mobile: single card + dots */}
                <div className="md:hidden">
                    <div className="flex items-center justify-center py-8 select-none">
                        <div
                            className="flex-shrink-0 w-full max-w-[320px]"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onClick={handleCardClick}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={projects[activeIndex].id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="rounded-3xl p-6 relative overflow-hidden flex flex-col"
                                    style={{
                                        background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                                        border: `1px solid ${projects[activeIndex].color}40`,
                                        boxShadow: `0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px ${projects[activeIndex].color}20`,
                                        minHeight: "560px",
                                        height: "auto",
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at 30% 5%, ${projects[activeIndex].color}15 0%, transparent 50%)` }} />
                                    <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${projects[activeIndex].color}, transparent)` }} />
                                    <CardContent project={projects[activeIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === activeIndex
                                        ? "w-6 h-2 bg-purple-500"
                                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
