"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: Date;
  onEnd?: () => void;
  size?: "sm" | "md" | "lg";
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer({
  endTime,
  onEnd,
  size = "md",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  useEffect(() => {
    function update() {
      const now = Date.now();
      const diff = endTime.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        onEnd?.();
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds, total: diff });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime, onEnd]);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const labelClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  const isUrgent = timeLeft.total < 300000 && timeLeft.total > 0;

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEC" },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`${sizeClasses[size]} font-mono font-bold tracking-wider tabular-nums ${
                isUrgent ? "text-destructive animate-pulse" : "text-foreground"
              }`}
            >
              {pad(unit.value)}
            </span>
            <span
              className={`${labelClasses[size]} text-muted-foreground font-medium tracking-widest uppercase`}
            >
              {unit.label}
            </span>
          </div>
          {i < 2 && (
            <span
              className={`${sizeClasses[size]} font-mono font-bold ${
                isUrgent ? "text-destructive" : "text-muted-foreground"
              } -mt-4`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
