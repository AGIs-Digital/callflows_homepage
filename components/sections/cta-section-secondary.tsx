"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { Calendar, ArrowRight, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export function CTASectionSecondary() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("cta-section-secondary");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const calendarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const pulseVariants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section 
      id="cta-section-secondary"
      className="py-24 bg-primary/10 dark:bg-primary/5 relative overflow-hidden"
    >
      {/* Hintergrund-Elemente */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12 border border-primary/20">
            <div className="text-center mb-8">
              <motion.div 
                className="inline-block mb-6 p-3 bg-primary/10 rounded-full relative"
                variants={calendarVariants}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/5"
                  variants={pulseVariants}
                  animate="visible"
                  initial="hidden"
                />
                <Calendar size={32} className="text-primary" />
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                variants={itemVariants}
              >
                Jetzt handeln und Vorsprung sichern!
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-6"
                variants={itemVariants}
              >
                Die KI-Revolution in der Telefonie hat begonnen. Sichern Sie sich jetzt Ihren Wettbewerbsvorteil, bevor Ihre Konkurrenz es tut.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6 mb-8"
              variants={itemVariants}
            >
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-primary h-5 w-5" />
                  <h3 className="font-semibold">Warum jetzt?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Frühe Anwender profitieren am meisten: Optimieren Sie Ihre Prozesse, reduzieren Sie Kosten und verbessern Sie die Kundenerfahrung, während andere noch zögern.
                </p>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <h3 className="font-semibold">Unverbindlich starten</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keine Vorabkosten, keine Mindestlaufzeit. Testen Sie unsere KI Voice Agents unter realen Bedingungen und überzeugen Sie sich selbst.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <Link href="https://cal.com/callflows/55min" target="_blank">
                <Button size="lg" className="gap-2 px-8 py-6 text-lg">
                  Jetzt Beratungstermin sichern
                  <ArrowRight size={18} />
                </Button>
              </Link>
              
              <p className="text-sm text-muted-foreground mt-4">
                Unverbindliches 30-Minuten Gespräch mit einem unserer Experten
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 