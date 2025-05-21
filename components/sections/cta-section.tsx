"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { PhoneCall, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalEmbed } from "@/components/booking/cal-embed";

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const benefitVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
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
          ref={ref}
        >
          <motion.div variants={itemVariants}>
            <PhoneCall size={48} className="mx-auto text-primary mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für die Zukunft des Kundenkontakts?  
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie ein unverbindliches Gespräch mit unseren Experten und erfahren Sie, wie callflows Ihr Unternehmen unterstützen kann.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <CalEmbed 
              buttonText="Kostenlose Beratung" 
              size="lg" 
              className="gap-2 px-8 py-6 text-lg"
            />
            
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