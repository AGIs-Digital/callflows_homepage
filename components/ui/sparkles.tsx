"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  id?: string;
  speed?: number;
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className,
  particleColor = "#FFFFFF",
  id,
  speed = 1,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Erstelle Partikel basierend auf Dichte - mehr oben, weniger unten
      const area = rect.width * rect.height;
      const baseParticleCount = Math.max(100, Math.floor((particleDensity / 1000) * (area / 10000)));
      
      particles = [];
      
      // Erzeuge Partikel mit höherer Dichte oben
      for (let i = 0; i < baseParticleCount; i++) {
        const y = Math.random() * rect.height;
        // Radialer Gradient: mehr Partikel oben (y < height/2)
        const densityFactor = y < rect.height / 2 
          ? 1 - (y / (rect.height / 2)) * 0.7  // 1.0 oben, 0.3 in der Mitte
          : 0.3 - ((y - rect.height / 2) / (rect.height / 2)) * 0.25; // 0.3 in der Mitte, 0.05 unten
        
        if (Math.random() < densityFactor) {
          particles.push({
            x: Math.random() * rect.width,
            y: y,
            size: Math.random() * (maxSize - minSize) + minSize,
            speedX: (Math.random() - 0.5) * 0.5 * speed,
            speedY: Math.random() * 0.3 * speed + 0.1, // Leicht nach unten driftend
            opacity: Math.random() * 0.7 + 0.3,
            life: Math.random(),
            maxLife: Math.random() * 2 + 1,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      particles.forEach((particle) => {
        // Update Position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges horizontal
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        
        // Wenn Partikel zu weit unten, reset oben
        if (particle.y > rect.height) {
          particle.y = Math.random() * (rect.height * 0.3); // Reset oben
          particle.x = Math.random() * rect.width;
        }
        if (particle.y < 0) {
          particle.y = 0;
        }

        // Update life cycle
        particle.life += 0.01 * speed;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * rect.width;
          particle.y = Math.random() * (rect.height * 0.4); // Meist oben spawnen
        }

        // Calculate opacity based on life cycle and position (weniger opacity unten)
        const lifeOpacity = Math.sin((particle.life / particle.maxLife) * Math.PI);
        const positionOpacity = 1 - (particle.y / rect.height) * 0.5; // Fade out nach unten
        const opacity = lifeOpacity * particle.opacity * positionOpacity;

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, opacity);
        ctx.shadowBlur = particle.size * 5;
        ctx.shadowColor = particleColor;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [background, minSize, maxSize, particleDensity, particleColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ background }}
    />
  );
}

