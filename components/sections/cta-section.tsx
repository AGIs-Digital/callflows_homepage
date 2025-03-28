"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { PhoneCall, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("cta-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const phoneVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0, 0.7],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  const benefitVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <section 
      id="cta-section"
      className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background"
    >
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="inline-block mb-6 p-3 bg-primary/10 rounded-full relative"
            variants={phoneVariants}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/5"
              variants={pulseVariants}
              animate="visible"
              initial="hidden"
            />
            <PhoneCall size={32} className="text-primary" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Bereit, Ihre Kundenkommunikation zu revolutionieren?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            variants={itemVariants}
          >
            Starten Sie noch heute mit KI Voice Agents und erleben Sie den Unterschied.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <Link href="https://cal.com/callflows/55min" target="_blank">
                <Button size="lg" className="gap-2 px-8 py-6 text-lg">
                  Kostenlose Beratung
                  <ArrowRight size={18} />
                </Button>
              </Link>
            
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2">
                Preise ansehen
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <motion.div className="flex items-center gap-2" variants={benefitVariants}>
              <CheckCircle size={16} className="text-primary" />
              <span>Schnelle Implementierung</span>
            </motion.div>
            
            <motion.div className="flex items-center gap-2" variants={benefitVariants}>
              <CheckCircle size={16} className="text-primary" />
              <span>Keine Grundgebühr</span>
            </motion.div>
            
            <motion.div className="flex items-center gap-2" variants={benefitVariants}>
              <CheckCircle size={16} className="text-primary" />
              <span>Persönliche Betreuung</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}