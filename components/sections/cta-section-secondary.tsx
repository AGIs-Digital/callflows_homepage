"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { CalEmbed } from "@/components/booking/cal-embed";

export function CTASectionSecondary() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);
  
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-section-light-blue dark:bg-[#F5F0FF]/5">
      <div className="container max-w-6xl" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-10"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-8"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-4">
                Bereit für die Zukunft der Kundenkommunikation?
              </h2>
              <p className="text-muted-foreground">
                Vereinbaren Sie ein unverbindliches Gespräch mit unseren Experten und erfahren Sie, wie callflows Ihr Unternehmen unterstützen kann.
              </p>
            </motion.div>
            
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
              <CalEmbed 
                buttonText="Beratungstermin sichern" 
                size="lg" 
                className="px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              />
              
              <p className="text-sm text-muted-foreground mt-4">
                Unverbindliches 50-Minuten Gespräch mit unseren Experten
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 