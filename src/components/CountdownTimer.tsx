'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { EVENT_DETAILS } from '../lib/mockData';

interface CountdownTimerProps {
  targetDate?: string;
  onUnlockedStateChange?: (isUnlocked: boolean) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = EVENT_DETAILS.unlockDateTime,
  onUnlockedStateChange,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        const expired = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        setTimeLeft(expired);
        if (onUnlockedStateChange) onUnlockedStateChange(true);
        return;
      }

      const calculated = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };

      setTimeLeft(calculated);
      if (onUnlockedStateChange) onUnlockedStateChange(false);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onUnlockedStateChange]);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-emerald-950/80 border border-emerald-500/40 rounded-2xl p-6 text-center shadow-xl shadow-emerald-950/40 backdrop-blur-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-emerald-300">
          Certificates Unlocked!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
          The 5-Day AI Webinar Series has concluded. Participants can now verify and download their official certificate.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-amber-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left info column */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Time-Locked Portal</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wide">
            Certificates Unlock On
          </h3>
          <p className="text-sm font-medium text-amber-400 flex items-center justify-center md:justify-start gap-1.5 mt-1">
            <Clock className="w-4 h-4" />
            <span>September 11, 2026 • 8:00 PM IST</span>
          </p>
          <p className="text-xs text-slate-400 mt-2 max-w-sm">
            Certificates are automatically issued post-event. Admin credentials can preview & bypass this lock anytime.
          </p>
        </div>

        {/* Countdown digits grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-4 min-w-[65px] sm:min-w-[84px] shadow-inner"
            >
              <span className="text-2xl sm:text-4xl font-bold font-mono text-amber-400 tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400 tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
