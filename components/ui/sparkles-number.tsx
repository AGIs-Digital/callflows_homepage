"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesNumberProps {
  number: number;
  className?: string;
}

interface Sparkle {
  id: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

export function SparklesNumber({ number, className }: SparklesNumberProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const generateSparkle = (): Sparkle => ({
    id: Date.now(),
    color: '#FFB703',
    size: Math.random() * 10 + 5,
    style: {
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      zIndex: 2,
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSparkles(sparkles => {
        const newSparkle = generateSparkle();
        const filtered = sparkles.filter(s => Date.now() - s.id < 700);
        return [...filtered, newSparkle].slice(-3);
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full h-full">
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="absolute inline-block pointer-events-none animate-fadeOut"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          ✨
        </span>
      ))}
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-accent">
        {number}
      </span>
    </div>
  );
}