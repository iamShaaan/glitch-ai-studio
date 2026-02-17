"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticleNetworkProps {
    className?: string;
    particleColor?: string;
    lineColor?: string;
    particleCount?: number;
    interactionRadius?: number;
    speed?: number;
}

export function ParticleNetwork({
    className,
    particleColor = "rgba(16, 185, 129, 0.5)", // Emerald-500 with opacity
    lineColor = "rgba(16, 185, 129, 0.15)",   // Emerald-500 with lower opacity
    particleCount = 50,
    interactionRadius = 150,
    speed = 0.5,
}: ParticleNetworkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            // Adjust particle count based on screen size density if strict count not desired
            // But for now use strict count or scale slightly
            const count = window.innerWidth < 768 ? Math.floor(particleCount / 2) : particleCount;

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Connect
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < interactionRadius) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - distance / interactionRadius;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize(); // Init
        draw(); // Start loop

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColor, lineColor, particleCount, interactionRadius, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 block w-full h-full pointer-events-none", className)}
        />
    );
}
