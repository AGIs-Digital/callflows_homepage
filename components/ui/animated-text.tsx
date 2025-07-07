"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentWordIndex((prev) => (prev + 1) % words.length); // Durch alle Wörter rotieren
    }, 3000); // Complete cycle every 2 seconds

    return () => clearInterval(timer);
  }, [words.length]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className={cn("inline-block", className)}>
      {/* Alle Wörter werden animiert */}
      <AnimatePresence mode="wait">
        <motion.div
          key={words[currentWordIndex]}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="inline-flex h-[1.2em]"
        >
          {words[currentWordIndex].split("").map((char, index) => (
            <motion.span
              key={index}
              variants={child}
              className={cn(
                "text-inherit",
                char === " " ? "w-2" : ""
              )}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}