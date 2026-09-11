'use client';

import React from 'react';
import { Participant } from '../lib/types';
import { ShieldAlert, MapPin, Sparkles } from 'lucide-react';

interface CertificateProps {
  participant: Participant;
  elementId?: string;
  isWatermarked?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({
  participant,
  elementId = 'official-certificate-canvas',
  isWatermarked = false,
}) => {
  const recipientName = participant.fullName || participant.name || 'Participant';
  const collegeText = participant.collegeName || 'Vaigai College of Engineering';
  const designationText = participant.designation ? `${participant.designation}, ` : '';

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* 100% CODED PURE CSS/SVG ACADEMIC CERTIFICATE CANVAS */}
      <div
        id={elementId}
        className="relative bg-white text-slate-900 shadow-2xl rounded-sm overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
          backgroundColor: '#ffffff',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #fbfdff 65%, #f4f7fb 100%)',
          width: '100%',
          aspectRatio: '1.414 / 1', // Standard A4 Landscape
          minHeight: '640px',
          boxSizing: 'border-box',
          padding: '28px 34px 28px 34px', // Symmetrical top and bottom padding for exact vertical centering
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* ================= 1. CLEAN ELEGANT BORDER SYSTEM ================= */}
        {/* Outer Deep Navy Border */}
        <div
          className="absolute inset-3 pointer-events-none"
          style={{
            border: '4px solid #091e3e',
            borderRadius: '2px',
          }}
        />

        {/* Outer Gold Hairline */}
        <div
          className="absolute inset-5 pointer-events-none"
          style={{
            border: '1.5px solid #d4af37',
          }}
        />

        {/* Inner Delicate Gold Border */}
        <div
          className="absolute inset-6 pointer-events-none"
          style={{
            border: '1px solid #e8d082',
            opacity: 0.7,
          }}
        />

        {/* Subtle Guilloche Security Background Pattern */}
        <div
          className="absolute inset-7 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#091e3e 1px, transparent 1px), radial-gradient(#d4af37 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-5 left-5 w-8 h-8 pointer-events-none border-t-2 border-l-2 border-[#d4af37]" />
        <div className="absolute top-5 right-5 w-8 h-8 pointer-events-none border-t-2 border-r-2 border-[#d4af37]" />
        <div className="absolute bottom-5 left-5 w-8 h-8 pointer-events-none border-b-2 border-l-2 border-[#d4af37]" />
        <div className="absolute bottom-5 right-5 w-8 h-8 pointer-events-none border-b-2 border-r-2 border-[#d4af37]" />

        {/* ================= 2. CENTER-LEFT & CENTER-RIGHT AI VECTORS ================= */}
        {/* Center-Left: Glowing AI Neural Circuit Brain Vector */}
        <div
          className="absolute pointer-events-none z-10 hidden sm:flex items-center justify-center"
          style={{
            left: '28px',
            top: '48%',
            transform: 'translateY(-50%)',
            width: 'clamp(110px, 13.5vw, 150px)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rightimage.png"
            alt="AI Neural Brain Vector"
            className="w-full h-auto object-contain drop-shadow-md"
            crossOrigin="anonymous"
          />
        </div>

        {/* Center-Right: AI Robot Working on Hologram Vector */}
        <div
          className="absolute pointer-events-none z-10 hidden sm:flex items-center justify-center"
          style={{
            right: '28px',
            top: '48%',
            transform: 'translateY(-50%)',
            width: 'clamp(110px, 13.5vw, 150px)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/leftvector.png"
            alt="AI Robot Vector"
            className="w-full h-auto object-contain drop-shadow-md"
            crossOrigin="anonymous"
          />
        </div>

        {/* ================= 3. HEADER: LOGO, INSTITUTION & EVENT TITLE ================= */}
        <div className="relative z-10 text-center space-y-1 pt-1">
          {/* Centered Official College Logo */}
          <div className="flex items-center justify-center mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Vaigai College of Engineering"
              className="h-12 sm:h-14 w-auto object-contain max-w-[240px]"
              style={{ display: 'block', margin: '0 auto', maxHeight: '52px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/vce-logo.png';
              }}
            />
          </div>

          <h1
            className="font-cinzel tracking-wider text-[#091e3e]"
            style={{
              fontSize: 'clamp(18px, 2.3vw, 26px)',
              fontWeight: 900,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              margin: 0,
              letterSpacing: '0.04em',
            }}
          >
            Vaigai College of Engineering
          </h1>

          <p
            style={{
              fontSize: 'clamp(8px, 0.92vw, 10px)',
              fontWeight: 700,
              color: '#475569',
              margin: '1px 0 0 0',
              letterSpacing: '0.03em',
            }}
          >
            (Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai)
          </p>

          <p
            style={{
              fontSize: 'clamp(7.5px, 0.88vw, 9.5px)',
              fontWeight: 600,
              color: '#64748b',
              margin: '1px 0 0 0',
            }}
          >
            Madurai - 625122, Tamil Nadu, India.
          </p>

          {/* Gold Decorative Divider */}
          <div className="flex items-center justify-center gap-2 my-1">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Event Name */}
          <h2
            className="font-montserrat font-extrabold text-[#1e1b4b]"
            style={{
              fontSize: 'clamp(12px, 1.45vw, 17px)',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            5-Day AI Engineering Knowledge Webinar Series
          </h2>

          <p
            style={{
              fontSize: 'clamp(8.5px, 0.95vw, 11px)',
              fontWeight: 700,
              color: '#b45309',
              fontStyle: 'italic',
              margin: '1px 0 0 0',
            }}
          >
            Explore • Learn • Innovate with AI
          </p>
        </div>

        {/* ================= 4. CERTIFICATE TITLE RIBBON BANNER ================= */}
        <div className="relative z-10 flex items-center justify-center my-1">
          <div className="relative flex items-center justify-center">
            {/* Ribbon Fold Tails (Gold) */}
            <div className="absolute -left-4 top-2 w-6 h-6 bg-[#996515] -rotate-12 [clip-path:polygon(0_0,100%_0,75%_50%,100%_100%,0_100%)] shadow-sm" />
            <div className="absolute -right-4 top-2 w-6 h-6 bg-[#996515] rotate-12 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,25%_50%)] shadow-sm" />

            {/* Main Ribbon Center */}
            <div
              className="relative px-10 sm:px-14 rounded-sm shadow-md flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #10335e 0%, #091e3e 55%, #051329 100%)',
                borderTop: '2px solid #fbe282',
                borderBottom: '2px solid #c29124',
                paddingTop: '3px',
                paddingBottom: '9px',
              }}
            >
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{ transform: 'translateY(-5px)' }}
              >
                <span
                  className="font-cinzel text-white block"
                  style={{
                    fontSize: 'clamp(15px, 1.9vw, 21px)',
                    fontWeight: 900,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  Certificate
                </span>
                <span
                  className="font-montserrat text-[#fbe282] block"
                  style={{
                    fontSize: 'clamp(8px, 0.9vw, 10.5px)',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    marginTop: '2px',
                  }}
                >
                  ★ Of Participation ★
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5. RECIPIENT & CITATION BODY ================= */}
        <div
          className="relative z-10 text-center space-y-1 my-auto py-0.5"
          style={{
            paddingLeft: 'clamp(115px, 15vw, 160px)',
            paddingRight: 'clamp(115px, 15vw, 160px)',
            transform: 'translateY(-12px)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(10px, 1.15vw, 12.5px)',
              fontStyle: 'italic',
              color: '#475569',
              fontFamily: 'Georgia, serif',
              margin: 0,
            }}
          >
            This is to certify that
          </p>

          {/* Participant Full Name */}
          <div className="py-0.5">
            <h3
              className="font-cinzel text-[#091e3e]"
              style={{
                fontSize: 'clamp(18px, 2.3vw, 26px)',
                fontWeight: 900,
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              {recipientName}
            </h3>

            {/* Institution Line */}
            <p
              style={{
                fontSize: 'clamp(9px, 1.05vw, 12px)',
                fontWeight: 700,
                color: '#1e293b',
                marginTop: '2px',
                marginBottom: 0,
              }}
            >
              {designationText}
              <span style={{ fontWeight: 800, color: '#091e3e' }}>{collegeText}</span>
            </p>
          </div>

          {/* Citation Paragraphs */}
          <p
            style={{
              fontSize: 'clamp(8.5px, 0.92vw, 10.5px)',
              lineHeight: 1.45,
              color: '#334155',
              margin: '0 auto',
            }}
          >
            has successfully participated in the{' '}
            <strong style={{ color: '#1e1b4b', fontWeight: 800 }}>
              5-Day AI Engineering Knowledge Webinar Series
            </strong>{' '}
            organized by{' '}
            <strong style={{ color: '#831843', fontWeight: 800 }}>
              Vaigai College of Engineering
            </strong>{' '}
            from <strong style={{ color: '#091e3e', fontWeight: 800 }}>07-09-2026</strong> to{' '}
            <strong style={{ color: '#091e3e', fontWeight: 800 }}>11-09-2026</strong>.
          </p>

          <p
            style={{
              fontSize: 'clamp(8px, 0.85vw, 9.5px)',
              lineHeight: 1.35,
              color: '#64748b',
              fontStyle: 'italic',
              margin: '0 auto',
            }}
          >
            The participant actively attended the sessions and gained valuable knowledge in Artificial Intelligence,
            Machine Learning, Generative AI, AI Tools and Emerging Technologies.
          </p>
        </div>

        {/* ================= 6. FOOTER: METADATA CARD + 3 REAL SIGNATURES ================= */}
        <div className="relative z-10 flex items-end justify-between px-2 pt-2 border-t border-slate-200/90 mb-1">
          {/* Bottom-Left Metadata Card */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <div
              className="rounded-lg p-1.5 shadow-xs flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] text-slate-700 font-semibold"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
              }}
            >
              <MapPin className="w-3 h-3 text-rose-600" />
              <span>Place :</span>
              <span className="font-bold text-[#091e3e]">Madurai</span>
            </div>

            {/* Inspiring Pill: Knowledge Builds a Smarter Tomorrow */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#091e3e] to-[#12396b] text-white text-[7.5px] sm:text-[8.5px] font-semibold shadow-xs max-w-fit">
              <Sparkles className="w-2.5 h-2.5 text-[#fbe282]" />
              <span>Knowledge Builds a Smarter Tomorrow</span>
            </div>
          </div>

          {/* 3 Real Signatures with Equal Baseline Heights */}
          <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-3 items-end text-center pl-3 sm:pl-6">
            {/* Signature 1: Co-ordinator (Mrs. P. Kursheetha Begum) */}
            <div className="flex flex-col items-center justify-end h-full">
              <div className="h-[34px] sm:h-[38px] w-full flex items-center justify-center mb-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Kursheetha_Begum.png"
                  alt="Signature Mrs. P. Kursheetha Begum"
                  className="h-full w-auto max-w-[110px] object-contain"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/Kursheetha Begum.png';
                  }}
                />
              </div>
              <div style={{ width: '85%', maxWidth: '110px', height: '1.2px', backgroundColor: '#334155', margin: '0 auto 2px auto' }} />
              <p style={{ fontSize: 'clamp(8.5px, 0.95vw, 10.5px)', fontWeight: 800, color: '#091e3e', margin: 0, lineHeight: 1.15 }}>
                Mrs. P. Kursheetha Begum <span className="font-normal text-slate-500 text-[7px] sm:text-[8px]">– AP/ECE</span>
              </p>
              <p style={{ fontSize: 'clamp(8px, 0.85vw, 9.5px)', fontWeight: 800, color: '#091e3e', margin: '1px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Co-ordinator
              </p>
            </div>

            {/* Signature 2: Coordinators - Upper (Ms. N. Roobika) & Bottom (Ms. E. Selvamahalakshmi) */}
            <div className="flex flex-col items-center justify-end h-full">
              {/* Upper: Ms. N. Roobika */}
              <div className="w-full flex flex-col items-center mb-1">
                <div className="h-[22px] sm:h-[24px] w-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Roobika.png"
                    alt="Signature Ms. N. Roobika"
                    className="h-full w-auto max-w-[95px] object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
                <div style={{ width: '80%', maxWidth: '95px', height: '1px', backgroundColor: '#475569', margin: '1px auto' }} />
                <p style={{ fontSize: 'clamp(7.5px, 0.82vw, 9px)', fontWeight: 700, color: '#091e3e', margin: 0, lineHeight: 1.15 }}>
                  Ms. N. Roobika <span className="font-normal text-slate-500 text-[6.5px] sm:text-[7.5px]">– AP/CSE</span>
                </p>
              </div>

              {/* Bottom: Ms. E. Selvamahalakshmi */}
              <div className="w-full flex flex-col items-center">
                <div className="h-[22px] sm:h-[24px] w-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/selvamahashmi.png"
                    alt="Signature Ms. E. Selvamahalakshmi"
                    className="h-full w-auto max-w-[95px] object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
                <div style={{ width: '80%', maxWidth: '95px', height: '1px', backgroundColor: '#475569', margin: '1px auto' }} />
                <p style={{ fontSize: 'clamp(7.5px, 0.82vw, 9px)', fontWeight: 700, color: '#091e3e', margin: 0, lineHeight: 1.15 }}>
                  Ms. E. Selvamahalakshmi <span className="font-normal text-slate-500 text-[6.5px] sm:text-[7.5px]">– AP/ECE</span>
                </p>
              </div>

              <p style={{ fontSize: 'clamp(8px, 0.85vw, 9.5px)', fontWeight: 800, color: '#091e3e', margin: '1px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Co-ordinator(s)
              </p>
            </div>

            {/* Signature 3: Convener (Dr. R. Sivaranjani) */}
            <div className="flex flex-col items-center justify-end h-full">
              <div className="h-[34px] sm:h-[38px] w-full flex items-center justify-center mb-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sivaranjini.png"
                  alt="Signature Dr. R. Sivaranjani"
                  className="h-full w-auto max-w-[110px] object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              <div style={{ width: '85%', maxWidth: '110px', height: '1.2px', backgroundColor: '#334155', margin: '0 auto 2px auto' }} />
              <p style={{ fontSize: 'clamp(8.5px, 0.95vw, 10.5px)', fontWeight: 800, color: '#091e3e', margin: 0, lineHeight: 1.15 }}>
                Dr. R. Sivaranjani <span className="font-normal text-slate-500 text-[7px] sm:text-[8px]">– PRINCIPAL I/C</span>
              </p>
              <p style={{ fontSize: 'clamp(8px, 0.85vw, 9.5px)', fontWeight: 800, color: '#091e3e', margin: '1px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Convener
              </p>
            </div>
          </div>
        </div>

        {/* Watermark Overlay if Certificate is Locked */}
        {isWatermarked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 bg-slate-950/20 backdrop-blur-[1px]">
            <div className="transform -rotate-12 bg-amber-500/95 text-slate-950 border-2 border-amber-300 shadow-2xl px-6 py-2.5 rounded-xl flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-slate-950" />
              <span className="font-cinzel text-xs sm:text-base font-extrabold tracking-widest uppercase">
                Preview Copy • Unlocks Sept 11, 2026
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
