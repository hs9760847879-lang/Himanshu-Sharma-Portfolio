"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9990] flex items-center justify-center"
                    style={{ background: "#0B0F19" }}
                >
                    {/* Animated background orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute w-96 h-96 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)",
                                top: "20%",
                                left: "20%",
                            }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-64 h-64 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
                                bottom: "20%",
                                right: "20%",
                            }}
                            animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="text-center z-10 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        >
                            <p className="text-lg text-purple-400/70 font-light tracking-[0.3em] uppercase mb-4">
                                Welcome
                            </p>
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
                                Hi, I&apos;m{" "}
                                <span className="gradient-text">Himanshu</span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="mt-4 text-base md:text-lg text-white/50 font-light max-w-lg mx-auto"
                            >
                                I build automation systems that reduce operational workload
                            </motion.p>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="mt-12"
                        >
                            <div className="w-48 h-px bg-white/10 mx-auto overflow-hidden rounded-full">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: "linear-gradient(90deg, #6C63FF, #00D4FF)" }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
