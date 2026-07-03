"use client";

import LoadingScreen from "@/components/LoadingScreen";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ImpactSection from "@/components/ImpactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HowIWorkSection from "@/components/HowIWorkSection";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Animated canvas background */}
      <AnimatedBackground />

      {/* Loading screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <div className="relative z-10">
        <HeroSection />

        {/* Divider */}
        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        <SkillsSection />

        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <ProjectsSection />

        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        <ImpactSection />

        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <ExperienceSection />

        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        <HowIWorkSection />

        <div className="container mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        <ContactSection />

        {/* Footer */}
        <footer className="py-8 text-center relative z-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">
              © 2025 Himanshu Sharma. Built with Next.js & Framer Motion.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                href="https://www.linkedin.com/in/himanshu-sharma-814785250"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 hover:text-white/60 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                data-cursor="link"
                title="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </motion.a>
              <motion.a
                href="mailto:hs1385944@gmail.com"
                className="text-white/25 hover:text-white/60 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                data-cursor="link"
                title="Email"
              >
                <Mail size={18} />
              </motion.a>
              <motion.a
                href="tel:+918650226021"
                className="text-white/25 hover:text-white/60 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                data-cursor="link"
                title="Phone"
              >
                <Phone size={18} />
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
