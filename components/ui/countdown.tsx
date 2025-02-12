import { useEffect, useState } from "react";

interface CountdownProps {
  endDate: string;
  remainingSpots?: number;
}

export function Countdown({ endDate, remainingSpots }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000); // Update jede Sekunde

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
      <div className="flex items-center justify-center gap-4 text-sm font-medium">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">Tage</span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">{timeLeft.hours}</span>
          <span className="text-xs text-muted-foreground">Std</span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">{timeLeft.minutes}</span>
          <span className="text-xs text-muted-foreground">Min</span>
        </div>
        <span className="text-primary font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">{timeLeft.seconds}</span>
          <span className="text-xs text-muted-foreground">Sek</span>
        </div>
      </div>
      {remainingSpots && (
        <div className="text-center mt-2 text-sm text-primary font-medium">
          Nur noch {remainingSpots} Plätze verfügbar!
        </div>
      )}
    </div>
  );
}