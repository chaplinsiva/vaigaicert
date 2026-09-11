'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../lib/mockData';

interface NavbarProps {
  isAdmin?: boolean;
  onAdminToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdmin, onAdminToggle }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & College Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-auto flex items-center justify-center p-1 rounded-xl bg-white/10 border border-amber-500/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="Vaigai Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/vce-logo.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
                  VAIGAI
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  AI 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-tight">
                Certificate Provider • College of Engineering
              </p>
            </div>
          </Link>

          {/* Quick Links & Admin Link */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <a
              href="#schedule"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/60"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>5-Day Schedule</span>
            </a>

            <a
              href={EVENT_DETAILS.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/60"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>Registration Form</span>
            </a>

            <Link
              href="/admin"
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                isAdmin
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isAdmin ? 'Admin Console' : 'Admin Portal'}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
