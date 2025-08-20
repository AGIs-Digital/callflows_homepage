// Pricing Types
import { DivideIcon as LucideIcon } from "lucide-react";

export interface PricingPlan {
  name: string;
  type: string;
  subtitle: string;
  price: number;
  minutesIncluded: number;
  highlights: string[];
  cta: string;
  popular: boolean;
  isCustom?: boolean;
  isPilot?: boolean;
}

export interface MinutePackage {
  name: string;
  minutes: number;
  pricePerMinute: number;
  totalPrice: number;
  savings: string;
  description: string;
  isCustom?: boolean;
  isUsageBased?: boolean;
}

export interface PricingTier {
  from: number;
  to: number;
  pricePerMinute: number;
  description: string;
}

export interface PricingFeature {
  icon: typeof LucideIcon;
  title: string;
  description: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}