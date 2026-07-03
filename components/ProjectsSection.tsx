"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, LayoutGroup } from "framer-motion";
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

function MiniCard({ project, position, onClick }: { project: typeof projects[0]; position: 'left' | 'right'; onClick: () => void }) {
    return (
        <motion.button
            layoutId={`project-${project.id}`}
            data-cursor="project"
            onClick={onClick}
            className="relative flex-shrink-0 cursor-pointer"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, stiffness: 200 }}
            style={{
                width: "288px", // 90% of MainCard (320px)
                height: "504px", // 90% of MainCard (560px)
                maxHeight: "504px",
                perspective: 1200
            }}
        >
            <motion.div
                className="rounded-2xl p-6 relative overflow-hidden h-full w-full flex flex-col"
                style={{
                    background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                    border: "1px solid rgba(108, 99, 255, 0.15)",
                    boxSizing: "border-box",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    opacity: 0.55,
                    filter: "blur(2.5px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
                whileHover={{
                    scale: 1.01,
                    opacity: 0.65,
                    filter: "blur(2px)"
                }}
                whileTap={{ scale: 0.78 }}
            >
                <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 30% 10%, ${project.color}10 0%, transparent 50%)` }} />
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{project.emoji}</span>
                            <div
                                className="px-4 py-2 rounded-full text-[9px] font-medium whitespace-nowrap leading-none"
                                style={{ background: `${project.color}15`, color: project.color }}
                                title={project.impact}
                            >
                                {project.impact}
                            </div>
                        </div>
                        <h3 className="font-semibold text-white text-lg leading-tight mb-2 line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="text-white/45 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-2">{project.shortDesc}</p>
                    </div>

                    <div className="flex-grow flex flex-col justify-between pt-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle size={16} style={{ color: project.color }} />
                                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                                        Problem
                                    </span>
                                </div>
                                <p className="text-white/70 text-[11px] leading-relaxed overflow-hidden text-ellipsis line-clamp-3">{project.problem}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb size={16} style={{ color: project.color }} />
                                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                                        Solution
                                    </span>
                                </div>
                                <p className="text-white/70 text-[11px] leading-relaxed overflow-hidden text-ellipsis line-clamp-3">{project.solution}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Wrench size={16} style={{ color: project.color }} />
                                <span className="text-[9px] font-semibold text-white/40 uppercase">
                                    Tools Used
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="px-4 py-2 rounded text-[8px] font-medium"
                                        style={{ background: `${project.color}12`, color: project.color }}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={16} style={{ color: project.color }} />
                                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                                        Impact
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {project.fullImpact.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-white/65 text-[11px] flex items-start gap-2 overflow-hidden text-ellipsis line-clamp-2"
                                        >
                                            <span className="text-base mt-0.5" style={{ color: project.color }}>
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.button>
    );
}

function MainCard({ project }: { project: typeof projects[0] }) {
    return (
        <motion.div
            layoutId={`project-${project.id}`}
            data-cursor="project"
            className="relative flex-shrink-0"
            style={{
                width: "320px",
                height: "560px",
                maxHeight: "560px",
                transform: "scale(1)",
                opacity: 1,
                filter: "blur(0px)"
            }}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, stiffness: 200 }}
        >
            <motion.div
                className="rounded-3xl p-6 relative overflow-hidden h-full w-full flex flex-col justify-between"
                style={{
                    background: "linear-gradient(145deg, #0d1b2a 0%, #1b263b 100%)",
                    border: `1px solid ${project.color}40`,
                    boxShadow: `0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px ${project.color}20`,
                    boxSizing: "border-box",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
            >
                <div className="absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(circle at 30% 5%, ${project.color}15 0%, transparent 50%)` }} />
                <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

                <div className="relative z-10 flex flex-col h-full justify-between" style={{ minHeight: "500px" }}>
                    {/* Header - Pinned to Top */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{project.emoji}</span>
                            <div
                                className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap leading-none"
                                style={{ background: `${project.color}20`, color: project.color }}
                                title={project.impact}
                            >
                                {project.impact}
                            </div>
                        </div>
                        <h3 className="font-bold text-white text-xl leading-tight mb-2 line-clamp-2">{project.title}</h3>
                        <p className="text-white/60 text-base leading-relaxed mb-4 overflow-hidden text-ellipsis line-clamp-2">{project.shortDesc}</p>
                    </div>

                    {/* Middle Sections - Problem & Solution */}
                    <div className="flex-grow flex flex-col justify-between py-4 gap-4">
                        {/* Problem */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <AlertCircle size={16} style={{ color: project.color }} />
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Problem</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-3">{project.problem}</p>
                        </div>

                        {/* Solution */}
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <Lightbulb size={16} style={{ color: project.color }} />
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Solution</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-3">{project.solution}</p>
                        </div>

                        {/* Tools */}
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <Wrench size={16} style={{ color: project.color }} />
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tools Used</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool) => (
                                    <span key={tool} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: `${project.color}15`, color: project.color }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Impact - Pinned to Bottom */}
                    <div className="flex-shrink-0 pt-4 border-t border-white/10 mt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} style={{ color: project.color }} />
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Impact</span>
                        </div>
                        <ul className="space-y-2">
                            {project.fullImpact.map((item, i) => (
                                <li key={i} className="text-white/60 text-sm flex items-start gap-2 overflow-hidden text-ellipsis line-clamp-2">
                                    <span className="text-base mt-0.5" style={{ color: project.color }}>•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
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

    const goToPrev = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    };

    const goToIndex = (index: number) => {
        setActiveIndex(index);
    };

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

    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    const nextIndex = (activeIndex + 1) % projects.length;

    return (
        <section id="projects" ref={containerRef} className="section-padding relative z-10 overflow-hidden md:min-h-screen flex flex-col justify-center">
            <motion.div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ y: yBg }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full" style={{ background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />
            </motion.div>

            <div className="container mx-auto relative z-10">
                <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16 flex flex-col items-center">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">Portfolio</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Projects & <span className="gradient-text">Automation Work</span></h2>
                    <p className="text-white/40 text-base">Click left/right cards to navigate</p>
                </motion.div>

                {/* Carousel Container */}
                <LayoutGroup>
                    <div
                        className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-6 py-8 md:py-16 overflow-x-auto md:overflow-visible px-2 sm:px-0 select-none"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="hidden sm:block flex-shrink-0">
                            <MiniCard
                                project={projects[prevIndex]}
                                position="left"
                                onClick={() => goToIndex(prevIndex)}
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <MainCard project={projects[activeIndex]} />
                        </div>
                        <div className="hidden sm:block flex-shrink-0">
                            <MiniCard
                                project={projects[nextIndex]}
                                position="right"
                                onClick={() => goToIndex(nextIndex)}
                            />
                        </div>
                    </div>
                    {/* Mobile nav dots */}
                    <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "w-6 bg-purple-500" : "bg-white/20"}`}
                            />
                        ))}
                    </div>
                </LayoutGroup>
            </div>
        </section>
    );
}