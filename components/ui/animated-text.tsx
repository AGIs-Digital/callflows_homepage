"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(1); // Start with second word
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentWordIndex((prev) => (prev === 1 ? 2 : 1)); // Toggle between 1 and 2
    }, 4000); // Complete cycle every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 * i },
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
    <div className={cn("flex flex-col space-y-2", className)}>
      {/* Static "Einfach." */}
      <div className="flex">
        <span className="text-inherit">{words[0]}</span>
      </div>

      {/* Animated words */}
      <AnimatePresence mode="wait">
        <motion.div
          key={words[currentWordIndex]}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex h-[1.2em]"
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