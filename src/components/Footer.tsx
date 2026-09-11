import React from 'react';
import { Award, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../lib/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* College & Department */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-base font-bold text-slate-100">
              VAIGAI COLLEGE OF ENGINEERING
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Jointly organized by the Department of Electronics and Communication Engineering & Department of Computer Science and Engineering.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            Approved by AICTE, Affiliated to Anna University.
          </p>
        </div>

        {/* Convener & Coordinators */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Organizing Committee
          </h4>
          <ul className="text-xs space-y-2 text-slate-300">
            <li>
              <span className="font-medium text-slate-100">{EVENT_DETAILS.convener.name}</span>
              <span className="text-slate-400 block text-[11px]">{EVENT_DETAILS.convener.title}</span>
            </li>
            {EVENT_DETAILS.coordinators.map((coord, i) => (
              <li key={i}>
                <span className="font-medium text-slate-100">{coord.name}</span>
                <span className="text-slate-400 block text-[11px]">{coord.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links & Verification */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Event & Certificates
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            e-Certificates will automatically unlock on <span className="text-amber-300 font-semibold">Sept 11, 2026</span> upon successful conclusion of the 5-Day AI Webinar Series.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={EVENT_DETAILS.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            >
              <span>Registration Form</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© 2026 Vaigai College of Engineering. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>AI Webinar Series 2026 Official Certificate Portal</span>
        </p>
      </div>
    </footer>
  );
};
