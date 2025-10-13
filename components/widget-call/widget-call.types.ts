export interface WidgetCallProps {
  className?: string;
}

export type CallStatus = 'idle' | 'calling' | 'success' | 'error';

export interface CallData {
  customer_name: string;
  customer_phonenumber: string;
}

export interface RateLimitData {
  calls: number[];
  resetTime: number;
}

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  countryCode?: string;
}

export interface StatusContent {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string;
}
