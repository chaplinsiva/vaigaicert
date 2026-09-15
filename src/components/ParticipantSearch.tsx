import React, { useState, useMemo } from 'react';
import { Participant } from '../lib/types';
import {
  Search,
  UserCheck,
  Lock,
  Award,
  Eye,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';

interface ParticipantSearchProps {
  participants: Participant[];
  isLoading: boolean;
  onRefresh: () => void;
  dataSource: 'google-sheets' | 'fallback' | 'cached';
  isUnlocked: boolean;
}

export const ParticipantSearch: React.FC<ParticipantSearchProps> = ({
  participants,
  isLoading,
  onRefresh,
  dataSource,
  isUnlocked,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter participants when searching
  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const rawQ = searchQuery.toLowerCase().trim();
    const cleanQ = rawQ.replace(/[^a-z0-9]/g, '');
    const digitsQ = rawQ.replace(/\D/g, '');

    return participants.filter((p) => {
      const checkFields = [
        p.name,
        p.fullName,
        p.email,
        p.collegeName,
        p.certificateId,
        p.designation,
        p.branch,
        p.department,
      ];

      // Match raw substring or alphanumeric stripped substring (handles S.MUTHUKUMAR vs S. MUTHUKUMAR)
      for (const field of checkFields) {
        if (!field) continue;
        const lower = field.toLowerCase();
        if (lower.includes(rawQ)) return true;
        if (cleanQ.length >= 2 && lower.replace(/[^a-z0-9]/g, '').includes(cleanQ)) return true;
      }

      // Mobile number matching (handles +91, leading 0, spaces)
      if (digitsQ.length >= 5 && p.mobileNumber) {
        const cleanMob = p.mobileNumber.replace(/\D/g, '');
        const cleanMob10 = cleanMob.slice(-10);
        const digitsQ10 = digitsQ.slice(-10);
        if (
          cleanMob.includes(digitsQ) ||
          cleanMob10.includes(digitsQ10) ||
          digitsQ.includes(cleanMob10)
        ) {
          return true;
        }
      }

      return false;
    });
  }, [participants, searchQuery]);

  // Select 12 student participants for the home screen showcase
  const showcaseStudents = useMemo(() => {
    if (!participants || participants.length === 0) return [];

    const students = participants.filter((p) => {
      const des = (p.designation || '').toLowerCase();
      return (
        des.includes('student') ||
        (!des.includes('faculty') &&
          !des.includes('prof') &&
          !des.includes('principal') &&
          !des.includes('dean') &&
          !des.includes('hod') &&
          !des.includes('assistant'))
      );
    });

    if (students.length >= 12) {
      return students.slice(0, 12);
    }
    const remaining = participants.filter((p) => !students.some((s) => s.id === p.id));
    return [...students, ...remaining].slice(0, 12);
  }, [participants]);

  const handleOpenCertificate = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2.5">
          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Participant Portal</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel font-extrabold text-white tracking-wide">
          Find Your Event Certificate
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2.5 max-w-xl mx-auto">
          Enter your Name, Email, or Mobile Number registered in Google Forms to preview your certificate, or click any student below.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 sm:left-4 w-4 sm:w-5 h-4 sm:h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your Name, Mobile Number, or Email..."
            className="w-full pl-10 sm:pl-12 pr-20 sm:pr-28 py-3.5 sm:py-4 bg-slate-900/90 border-2 border-slate-700 focus:border-amber-400 rounded-2xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm shadow-xl focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 sm:right-4 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sync Status Badge */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 mt-2.5 px-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Data Source: {dataSource === 'google-sheets' ? 'Live Google Sheets' : 'Sync Backup Dataset'}
            </span>
          </span>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 disabled:opacity-50 transition-colors self-start xs:self-auto"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Sheet</span>
          </button>
        </div>
      </div>

      {/* SEARCH RESULTS VIEW */}
      {searchQuery.trim() ? (
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Search Results ({filteredParticipants.length})</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Show 12 Featured Students
            </button>
          </div>

          {filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="group p-4 sm:p-5 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-950/95 border border-slate-800 hover:border-amber-500/50 rounded-2xl shadow-lg transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm sm:text-base flex-shrink-0 mt-0.5 sm:mt-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {participant.fullName || participant.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-0.5 line-clamp-2 sm:truncate">
                      {participant.designation ? `${participant.designation} • ` : ''}
                      {participant.collegeName}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px] text-slate-400 mt-1.5 font-mono">
                      <span>ID: {participant.certificateId}</span>
                      {participant.email && <span className="truncate max-w-[200px]">{participant.email}</span>}
                      {participant.mobileNumber && <span>{participant.mobileNumber}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <button
                    onClick={() => handleOpenCertificate(participant)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:scale-105 active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-300 font-medium">No registered participant found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">
                Please verify the spelling or check if you used a different name/email during Google Form registration.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* HOME SCREEN 12 STUDENTS SHOWCASE VIEW */
        <div className="space-y-6">
          {/* Quick Info Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong className="text-slate-200 font-semibold">{participants.length}</strong> registered participant records currently synced and verified.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <span>Quick search:</span>
              {showcaseStudents.slice(0, 4).map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(p.name)}
                  className="underline hover:text-amber-400 transition-colors"
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 12 Student Showcase Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-2 border-b border-slate-800/80 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Featured Registered Students (12 Certificates)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white">
                Student Certificates Showcase
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Click <span className="text-amber-300 font-semibold">&ldquo;View Certificate&rdquo;</span> to preview full certificate with signatures & QR
            </p>
          </div>

          {/* 12 Students Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {showcaseStudents.map((student, index) => {
              const displayName = student.fullName || student.name || `Student ${index + 1}`;
              const college = student.collegeName || 'Vaigai College of Engineering';
              const branch = student.branch || student.department || 'Engineering';
              const initials = (student.name || 'ST')
                .split(' ')
                .map((w) => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase();

              return (
                <div
                  key={student.id || index}
                  className="group relative p-4 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950/95 border border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar Initials + Status Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-blue-500/10 to-amber-500/30 border border-amber-500/30 flex items-center justify-center text-amber-300 font-extrabold text-xs tracking-wider shadow-inner group-hover:scale-105 transition-transform">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate max-w-[170px] sm:max-w-[180px]">
                            {displayName}
                          </h4>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Verified Student
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/80 shrink-0">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Department & College Details */}
                    <div className="space-y-1 my-2">
                      <p className="text-xs text-slate-200 font-medium truncate">
                        {branch}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {college}
                      </p>
                    </div>

                    {/* Certificate ID Pill */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>ID: {student.certificateId}</span>
                      <span className="text-amber-400/90 font-sans font-medium">5-Day AI 2026</span>
                    </div>
                  </div>

                  {/* View Certificate CTA Button */}
                  <button
                    onClick={() => handleOpenCertificate(student)}
                    className="w-full mt-3.5 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-400 text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        participant={selectedParticipant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdmin={false}
        isUnlocked={isUnlocked}
      />
    </section>
  );
};
