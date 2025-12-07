"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  speed: number; // Individuelle Geschwindigkeit pro Sparkle
}

interface SparklesProps {
  className?: string;
  sparklesCount?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export function Sparkles({
  className,
  sparklesCount = 50,
  colors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--accent) / 0.8)",
  ],
  minSize = 2,
  maxSize = 6,
  speed = 1,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const generateSparkles = (): Sparkle[] => {
      return Array.from({ length: sparklesCount }, (_, i) => {
        // Individuelle Geschwindigkeit zwischen 0.3x und 2x der Basis-Geschwindigkeit
        const individualSpeed = Math.random() * 1.7 + 0.3; // 0.3 bis 2.0
        return {
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          duration: (Math.random() * 3 + 2) / (speed * individualSpeed),
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: individualSpeed,
        };
      });
    };

    setSparkles(generateSparkles());

    // Regeneriere Sparkles alle 6 Sekunden für kontinuierliche Bewegung
    const interval = setInterval(() => {
      setSparkles(generateSparkles());
    }, 6000);

    return () => clearInterval(interval);
  }, [dimensions, sparklesCount, colors, minSize, maxSize, speed]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            x: [
              sparkle.x,
              sparkle.x + (Math.random() - 0.5) * 80 * sparkle.speed,
              sparkle.x + (Math.random() - 0.5) * 120 * sparkle.speed,
            ],
            y: [
              sparkle.y,
              sparkle.y + (Math.random() - 0.5) * 80 * sparkle.speed,
              sparkle.y + (Math.random() - 0.5) * 120 * sparkle.speed,
            ],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: (Math.random() * 1.5 + 0.5) / sparkle.speed,
            ease: sparkle.speed > 1 ? "easeOut" : sparkle.speed < 0.7 ? "easeIn" : "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

