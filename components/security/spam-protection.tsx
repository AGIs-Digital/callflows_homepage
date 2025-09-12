"use client";

import { useState, useEffect, useRef } from 'react';

interface SpamProtectionProps {
  children: React.ReactNode;
  onValidationChange: (isValid: boolean) => void;
  formData?: Record<string, any>;
}

export function SpamProtection({ children, onValidationChange, formData }: SpamProtectionProps) {
  const [isValid, setIsValid] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState('');
  const [startTime] = useState(Date.now());
  const [mouseMovements, setMouseMovements] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const interactionRef = useRef<HTMLDivElement>(null);

  // Honeypot trap - should always be empty
  const handleHoneypotChange = (value: string) => {
    setHoneypotValue(value);
  };

  // Track mouse movements for human behavior detection
  useEffect(() => {
    const handleMouseMove = () => {
      setMouseMovements(prev => prev + 1);
    };

    const handleKeyPress = () => {
      setKeystrokes(prev => prev + 1);
    };

    const currentRef = interactionRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, []);

  // Validate human behavior
  useEffect(() => {
    const timeSpent = Date.now() - startTime;
    
    // Check validation criteria
    const isValidBehavior = 
      honeypotValue === '' && // Honeypot not filled
      timeSpent > 3000 && // At least 3 seconds spent
      mouseMovements > 5 && // Some mouse movement
      keystrokes > 3; // Some typing

    // Additional spam detection for form data
    let isValidContent = true;
    if (formData) {
      const { name = '', email = '', message = '' } = formData;
      
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /https?:\/\/[^\s]+/i, // URLs
        /\b(viagra|cialis|casino|lottery|bitcoin)\b/i, // Spam keywords
        /[A-Z]{10,}/, // Excessive caps
        /(.)\1{10,}/, // Character repetition
      ];

      const allText = `${name} ${email} ${message}`;
      isValidContent = !suspiciousPatterns.some(pattern => pattern.test(allText));
      
      // Check for reasonable content length
      if (message.length > 0) {
        const words = message.split(/\s+/).filter((word: string) => word.length > 0);
        if (words.length < 3 || words.length > 500) {
          isValidContent = false;
        }
      }
    }

    const finalValid = isValidBehavior && isValidContent;
    setIsValid(finalValid);
    onValidationChange(finalValid);
  }, [honeypotValue, mouseMovements, keystrokes, formData, onValidationChange, startTime]);

  return (
    <div ref={interactionRef} className="relative">
      {/* Honeypot field - hidden from users but visible to bots */}
      <div className="absolute -left-9999px opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="website-url">Website (leave empty):</label>
        <input
          type="text"
          id="website-url"
          name="website-url"
          value={honeypotValue}
          onChange={(e) => handleHoneypotChange(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      
      {children}
      
      {/* Hidden fields for behavior tracking */}
      <input type="hidden" name="behavioral_data" value={JSON.stringify({
        timeSpent: Date.now() - startTime,
        mouseMovements,
        keystrokes,
        timestamp: Date.now()
      })} />
    </div>
  );
}

// Rate limiting hook for frontend
export function useRateLimit(maxRequests: number = 3, timeWindow: number = 10 * 60 * 1000) {
  const [attempts, setAttempts] = useState<number[]>([]);
  
  const isAllowed = () => {
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < timeWindow);
    
    if (recentAttempts.length >= maxRequests) {
      return false;
    }
    
    setAttempts([...recentAttempts, now]);
    return true;
  };
  
  const getRemainingTime = () => {
    if (attempts.length === 0) return 0;
    const oldestAttempt = Math.min(...attempts);
    const remainingTime = timeWindow - (Date.now() - oldestAttempt);
    return Math.max(0, remainingTime);
  };
  
  return { isAllowed, getRemainingTime, attempts: attempts.length };
}
