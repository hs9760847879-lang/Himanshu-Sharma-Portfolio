"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactSection() {
    const { ref, isVisible } = useScrollAnimation();
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("sent");
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const contactLinks = [
        {
            icon: <Mail size={16} />,
            label: "Email",
            value: "hs1385944@gmail.com",
            href: "mailto:hs1385944@gmail.com",
            color: "#6C63FF",
        },
        {
            icon: <LinkedInIcon size={16} />,
            label: "LinkedIn",
            value: "himanshu-sharma-814785250",
            href: "https://www.linkedin.com/in/himanshu-sharma-814785250",
            color: "#0077B5",
        },
        {
            icon: <Phone size={16} />,
            label: "Phone",
            value: "+91 86502 26021",
            href: "tel:+918650226021",
            color: "#34d399",
        },
    ];

    return (
        <section id="contact" className="section-padding relative z-10">
            {/* Top gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(108,99,255,0.07) 0%, transparent 70%)",
                }}
            />

            <div className="container mx-auto relative z-10 focus:outline-none">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-400/70 mb-2">
                        Get In Touch
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-white/40 text-sm sm:text-base max-w-sm mx-auto text-center leading-relaxed">
                        Have a project idea or want to discuss automation? I&apos;d love to talk.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {/* Contact links */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        {contactLinks.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.label !== "Phone" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                data-cursor="link"
                                className="flex items-center gap-3 sm:gap-4 group transition-all duration-300"
                                whileHover={{
                                    scale: 1.05,
                                    filter: "brightness(1.2)",
                                    boxShadow: "0 0 20px rgba(108,99,255,0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                                    style={{
                                        background: `rgba(255,255,255,0.05)`,
                                        backdropFilter: "blur(20px)",
                                        border: `1px solid rgba(255,255,255,0.1)`,
                                        transform: "translateZ(0)",
                                        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                                    }}
                                    whileHover={{
                                        background: `rgba(255,255,255,0.08)`,
                                        backdropFilter: "blur(25px)",
                                        transform: "scale(1.05) translateZ(0)",
                                        boxShadow: "0 0 30px rgba(108,99,255,0.3)"
                                    }}
                                >
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {link.icon}
                                    </div>
                                </motion.div>
                                <div className="flex flex-col items-start text-left">
                                    <p className="text-xs text-white/40 font-medium mb-2">{link.label}</p>
                                    <p className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors font-medium whitespace-nowrap">
                                        {link.value}
                                    </p>
                                </div>
                            </motion.a>
                        ))}

                        {/* Quick note */}
                        <div className="glass rounded-2xl p-6 text-center md:text-left">
                            <p className="text-white/40 text-xs sm:text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-3">
                                Currently open to consulting on automation projects, workflow optimization, and operational efficiency improvements.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="glass rounded-2xl p-6 space-y-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        <div>
                            <label className="text-xs text-white/40 font-medium mb-2 block">Your Name</label>
                            <input
                                type="text"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-white/40 font-medium mb-2 block">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-white/40 font-medium mb-2 block">Message</label>
                            <textarea
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                placeholder="Tell me about your project..."
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            data-cursor="button"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                            style={{ background: "linear-gradient(135deg, #6C63FF, #4f46e5)" }}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(108,99,255,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? (
                                <>Sending...</>
                            ) : status === "sent" ? (
                                <><CheckCircle size={16} /> Message Sent!</>
                            ) : status === "error" ? (
                                <><Send size={16} /> Failed — Try Again</>
                            ) : (
                                <><Send size={16} /> Send Message</>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
