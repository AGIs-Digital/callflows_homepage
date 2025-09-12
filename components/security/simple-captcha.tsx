"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onValidationChange: (isValid: boolean) => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export function SimpleCaptcha({ onValidationChange, difficulty = 'easy' }: SimpleCaptchaProps) {
  const [captchaValue, setCaptchaValue] = useState('');
  const [userInput, setUserInput] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const generateCaptcha = useCallback(() => {
    switch (difficulty) {
      case 'easy':
        // Simple math problems
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.random() > 0.5 ? '+' : '-';
        
        if (operation === '+') {
          setQuestion(`${num1} + ${num2} = ?`);
          setCorrectAnswer((num1 + num2).toString());
        } else {
          // Ensure positive result
          const larger = Math.max(num1, num2);
          const smaller = Math.min(num1, num2);
          setQuestion(`${larger} - ${smaller} = ?`);
          setCorrectAnswer((larger - smaller).toString());
        }
        break;
        
      case 'medium':
        // Word-based questions
        const questions = [
          { q: 'Wie viele Tage hat eine Woche?', a: '7' },
          { q: 'Hauptstadt von Deutschland?', a: 'berlin' },
          { q: 'Farbe der Sonne?', a: 'gelb' },
          { q: 'Wie viele Monate hat ein Jahr?', a: '12' },
          { q: 'Erste Farbe im Regenbogen?', a: 'rot' }
        ];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQ.q);
        setCorrectAnswer(randomQ.a.toLowerCase());
        break;
        
      case 'hard':
        // Image-based or complex math
        const complexNum1 = Math.floor(Math.random() * 50) + 10;
        const complexNum2 = Math.floor(Math.random() * 20) + 5;
        setQuestion(`${complexNum1} × ${complexNum2} = ?`);
        setCorrectAnswer((complexNum1 * complexNum2).toString());
        break;
    }
    setUserInput('');
    onValidationChange(false);
  }, [difficulty, onValidationChange]);

  useEffect(() => {
    generateCaptcha();
  }, [difficulty, generateCaptcha]);

  useEffect(() => {
    const isValid = userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    onValidationChange(isValid);
  }, [userInput, correctAnswer, onValidationChange]);

  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium">Sicherheitsprüfung:</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={generateCaptcha}
          className="h-6 w-6 p-0"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="text-center p-3 bg-background border rounded font-mono text-lg">
          {question}
        </div>
        
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ihre Antwort..."
          className="text-center"
        />
        
        {userInput && userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim() && (
          <div className="text-sm text-green-600 text-center">
            ✓ Korrekt!
          </div>
        )}
        
        {userInput && userInput.toLowerCase().trim() !== correctAnswer.toLowerCase().trim() && userInput.length > 0 && (
          <div className="text-sm text-red-600 text-center">
            Falsche Antwort. Versuchen Sie es erneut.
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced CAPTCHA for high-risk situations
export function AdvancedCaptcha({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
  const [isVerified, setIsVerified] = useState(false);
  
  // This would integrate with external services like hCaptcha, reCAPTCHA, etc.
  // For now, we'll use a placeholder
  
  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <div className="text-center space-y-3">
        <div className="text-sm font-medium">Erweiterte Sicherheitsprüfung</div>
        <div className="text-xs text-muted-foreground">
          Diese Funktion würde ein externes CAPTCHA-System wie hCaptcha integrieren
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsVerified(true);
            onValidationChange(true);
          }}
          disabled={isVerified}
        >
          {isVerified ? '✓ Verifiziert' : 'CAPTCHA lösen'}
        </Button>
      </div>
    </div>
  );
}
