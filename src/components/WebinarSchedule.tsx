import React from 'react';
import { Calendar, User, Award, BookOpen, Clock, Sparkles } from 'lucide-react';
import { SPEAKERS_SCHEDULE, EVENT_DETAILS } from '../lib/mockData';

export const WebinarSchedule: React.FC = () => {
  return (
    <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Distinguished Expert Sessions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-white tracking-wide">
          5-Day AI Webinar Itinerary
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          From September 7th to 11th, 2026 • 7:00 PM to 8:00 PM IST
        </p>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPEAKERS_SCHEDULE.map((item) => (
          <div
            key={item.day}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            {/* Day Header Badge */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Day {item.day}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {item.date}
                </span>
              </div>

              {/* Topic Title */}
              <h3 className="text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug mb-3 min-h-[48px]">
                {item.topic}
              </h3>
            </div>

            {/* Speaker Info Box */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-sm shadow-inner group-hover:border-amber-500/40">
                <User className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-200 truncate">
                  {item.speaker}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* 6th Card: Organizing Leadership Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950/90 border border-amber-500/40 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Principal, Convener & Coordinators</span>
            </div>
            <h3 className="text-lg font-cinzel font-bold text-white mb-3">
              Leadership & Coordination
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <p className="font-bold text-amber-300">{EVENT_DETAILS.convener.name}</p>
                  <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                    Principal & Convener
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{EVENT_DETAILS.convener.title}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="font-bold text-slate-200 mb-1">Faculty Coordinators:</p>
                {EVENT_DETAILS.coordinators.map((c, idx) => (
                  <p key={idx} className="text-slate-300 text-[11px]">
                    • {c.name} ({c.title})
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400/90 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 7:00 PM – 8:00 PM Daily
            </span>
            <span>Online Mode</span>
          </div>
        </div>
      </div>
    </section>
  );
};
