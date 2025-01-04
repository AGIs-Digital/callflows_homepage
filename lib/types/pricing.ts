// Pricing Types
import { LucideIcon } from "lucide-react";

export interface PricingPlan {
  name: string;
  type: 'inbound' | 'outbound' | 'enterprise';
  subtitle: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  highlights: string[];
  cta: string;
  popular: boolean;
}

export interface PricingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PricingTestimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}