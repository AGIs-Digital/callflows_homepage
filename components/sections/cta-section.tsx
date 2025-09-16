"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ZohoEmbed } from "@/components/booking/zoho-embed";
import { useI18n } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function CTASection() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section 
      className="py-20 bg-gradient-to-b from-tertiary/25 via-primary/90 to-tertiary/25"
    >
      <div className="container max-w-6xl">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          ref={ref}
        >
          <motion.div variants={itemVariants}>
            <PhoneCall size={48} className="mx-auto text-accent mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            
            <ZohoEmbed 
              buttonText={t('cta.bookingButton')} 
              size="lg" 
              className="bg-tertiary hover:bg-[#FFB703]/90 text-white font-semibold px-8 py-4 text-lg gap-2"
            />
            
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="gap-2">
                {t('cta.pricingButton')}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}