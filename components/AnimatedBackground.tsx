"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Particle configuration - more particles for denser network
        const particles: {
            x: number; y: number; vx: number; vy: number;
            radius: number; opacity: number; color: string; baseOpacity: number;
        }[] = [];

        const colors = ["rgba(108,99,255,", "rgba(0,212,255,", "rgba(167,139,250,", "rgba(52,211,153,"];

        // Create more particles (80 for richer background)
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                baseOpacity: Math.random() * 0.3 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        // Mouse interaction
        let mouseX = -1000;
        let mouseY = -1000;
        
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        
        window.addEventListener("mousemove", handleMouseMove);

        let animId: number;
        let time = 0;

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines with subtle animation
            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    const connectionDist = 150;
                    
                    if (dist < connectionDist) {
                        const opacity = 0.08 * (1 - dist / connectionDist);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(108,99,255,${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
                
                // Mouse interaction - particles near mouse glow
                const mouseDist = Math.hypot(p.x - mouseX, p.y - mouseY);
                if (mouseDist < 150) {
                    const glowOpacity = 0.15 * (1 - mouseDist / 150);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(108,99,255,${glowOpacity})`;
                    ctx.fill();
                }
            });

            // Draw particles with subtle pulse
            particles.forEach((p) => {
                const pulse = Math.sin(time + p.x * 0.01) * 0.1 + 0.9;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.opacity * pulse})`;
                ctx.fill();
                
                // Add subtle glow to larger particles
                if (p.radius > 1.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `${p.color}${p.opacity * 0.3 * pulse})`;
                    ctx.fill();
                }

                // Move particles
                p.x += p.vx;
                p.y += p.vy;

                // Boundary check with smooth bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            animId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            resizeCanvas();
            // Reinitialize particles on resize
            particles.length = 0;
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    radius: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.3 + 0.1,
                    baseOpacity: Math.random() * 0.3 + 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}
