'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CountdownTimer } from '../components/CountdownTimer';
import { WebinarSchedule } from '../components/WebinarSchedule';
import { ParticipantSearch } from '../components/ParticipantSearch';
import { Participant } from '../lib/types';
import { fetchParticipantsFromSheet } from '../lib/dataFetcher';
import { EVENT_DETAILS } from '../lib/mockData';
import {
  Award,
  Download,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'google-sheets' | 'fallback' | 'cached'>('fallback');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    setIsLoading(true);
    const result = await fetchParticipantsFromSheet();
    setParticipants(result.participants);
    setDataSource(result.source);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-center">
          {/* Subtle glowing ambient lights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Vaigai College of Engineering • AI Webinar Series 2026</span>
          </div>

          {/* Main Titles */}
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-cinzel font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-tight">
            Official E-Certificate Portal & Validation System
          </h1>

          <p className="text-xs xs:text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto mt-4 font-normal leading-relaxed">
            Jointly organized by the <strong className="text-white font-semibold">Department of ECE & Department of CSE</strong>, 
            celebrating participant achievements across 5 comprehensive days of emerging Artificial Intelligence & Robotics.
          </p>

          {/* Key Event Highlights Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>September 7 – 11, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>7:00 PM – 8:00 PM Daily</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Automated QR Verification</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full max-w-md mx-auto xs:max-w-none">
            <a
              href="#search"
              className="w-full xs:w-auto justify-center flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </a>

            <a
              href={EVENT_DETAILS.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto justify-center flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-400/50 font-semibold text-xs transition-all active:scale-95"
            >
              <span>Registration Form</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Countdown & Time Lock Card */}
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto text-left">
            <CountdownTimer
              targetDate={EVENT_DETAILS.unlockDateTime}
              onUnlockedStateChange={(unlocked) => setIsUnlocked(unlocked)}
            />
          </div>
        </section>

        {/* PARTICIPANT SEARCH & CERTIFICATE SECTION */}
        <div id="search" className="scroll-mt-24">
          <ParticipantSearch
            participants={participants}
            isLoading={isLoading}
            onRefresh={loadParticipants}
            dataSource={dataSource}
            isUnlocked={isUnlocked}
          />
        </div>

        {/* WEBINAR SCHEDULE & SPEAKERS */}
        <div className="border-t border-slate-800/80 bg-slate-950/40">
          <WebinarSchedule />
        </div>

        {/* INSTITUTION TRUST & CERTIFICATION ACCREDITATION */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-base sm:text-lg font-cinzel font-bold text-white">
                Tamper-Proof Digital Verification
              </h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                Every certificate generated by Vaigai Certificate Provider is cryptographically signed and embeds an encrypted QR verification code ensuring instantaneous authenticity verification for employers and institutions.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-amber-400 w-full md:w-auto">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AICTE Approved</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Anna University Affiliated</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
