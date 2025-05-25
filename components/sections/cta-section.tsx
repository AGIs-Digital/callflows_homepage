"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ZohoEmbed } from "@/components/booking/zoho-embed";

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
            
            <ZohoEmbed 
              buttonText="Beratung buchen" 
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
            className="grid md:grid-cols-3 gap-6 text-left"
            variants={itemVariants}
          >
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Kostenlose Erstberatung</h3>
              <p className="text-sm text-muted-foreground">
                Unverbindliches Gespräch über Ihre Anforderungen und Möglichkeiten
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Individuelle Demo</h3>
              <p className="text-sm text-muted-foreground">
                Live-Demonstration angepasst an Ihre spezifischen Use Cases
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Maßgeschneidertes Angebot</h3>
              <p className="text-sm text-muted-foreground">
                Transparente Preisgestaltung basierend auf Ihren Anforderungen
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}