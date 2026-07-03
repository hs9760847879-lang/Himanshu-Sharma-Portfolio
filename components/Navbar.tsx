"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "About", href: "#hero" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div
                className={`w-full py-4 transition-all duration-500 ${scrolled
                    ? "glass border-b border-white/10 shadow-lg shadow-black/20"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.a
                            href="#hero"
                            className="text-lg font-bold gradient-text tracking-tight"
                            whileHover={{ scale: 1.05 }}
                            data-cursor="link"
                        >
                            HS<span className="text-white/30">.</span>
                        </motion.a>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-medium tracking-wide"
                                    whileHover={{ y: -1 }}
                                    data-cursor="link"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/Himanshu_Sharma_Resume.pdf"
                                download
                                data-cursor="button"
                                className="px-4 py-2 rounded-full text-sm font-semibold gradient-border text-white/90 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background:
                                        "linear-gradient(#0f1526, #0f1526) padding-box, linear-gradient(135deg, #6C63FF, #00D4FF) border-box",
                                    border: "1px solid transparent",
                                }}
                            >
                                Resume
                            </motion.a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden text-white/70 hover:text-white p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="py-4 flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="text-white/70 hover:text-white text-sm font-medium py-1"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
}
