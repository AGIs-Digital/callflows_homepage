"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ZohoEmbed } from "@/components/booking/zoho-embed";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function CTASectionSecondary() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

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
              className="flex justify-center"
              variants={itemVariants}
            >
              <ZohoEmbed 
                buttonText="Kostenlose Beratung buchen" 
                size="lg"
                className="px-8 py-4"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 