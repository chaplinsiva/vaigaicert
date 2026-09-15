'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Participant } from '../lib/types';
import { Certificate } from './Certificate';
import { downloadCertificateAsPdf, downloadCertificateAsPng } from '../lib/exportUtils';
import {
  X,
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ShieldAlert,
  Printer,
  Minimize2,
  ZoomIn,
  Smartphone,
} from 'lucide-react';

interface CertificateModalProps {
  participant: Participant | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  isUnlocked?: boolean;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  participant,
  isOpen,
  onClose,
  isAdmin = false,
  isUnlocked = false,
}) => {
  const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'fit' | 'full'>('fit');
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const CERT_BASE_WIDTH = 880;
  const CERT_BASE_HEIGHT = 622;

  // Compute responsive scale on mount and resize
  useEffect(() => {
    if (!isOpen) return;

    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      if (containerWidth <= 0) return;

      if (viewMode === 'full') {
        setScale(1);
      } else {
        const padding = containerWidth < 640 ? 16 : 32;
        const availableWidth = Math.max(260, containerWidth - padding);
        const computedScale = Math.min(1, availableWidth / CERT_BASE_WIDTH);
        setScale(computedScale);
      }
    };

    updateScale();
    const timer = setTimeout(updateScale, 50);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateScale();
      });
      ro.observe(el);
    } else {
      window.addEventListener('resize', updateScale);
    }

    return () => {
      clearTimeout(timer);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [isOpen, viewMode]);

  // Set default viewMode based on screen size on initial open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setViewMode('fit');
      } else {
        setViewMode('full');
      }
    }
  }, [isOpen]);

  if (!isOpen || !participant) return null;

  const canDownload = isUnlocked || isAdmin;
  const filename = `Vaigai_AI_2026_Certificate_${participant.name.replace(/\s+/g, '_')}`;

  const triggerConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#3b82f6', '#10b981'],
      });
    } catch (e) {}
  };

  const handleDownloadPng = async () => {
    if (!canDownload) return;
    try {
      setDownloading('png');
      triggerConfetti();
      await downloadCertificateAsPng('modal-certificate-canvas', filename);
      setDownloadSuccess('PNG certificate downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Error exporting PNG. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!canDownload) return;
    try {
      setDownloading('pdf');
      triggerConfetti();
      await downloadCertificateAsPdf('modal-certificate-canvas', filename);
      setDownloadSuccess('PDF certificate generated and saved!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scaledHeight = Math.round(CERT_BASE_HEIGHT * scale);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[96vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white font-cinzel truncate">
                {participant.fullName || participant.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono truncate">
                {participant.certificateId} • {participant.collegeName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Mode Toggle Button for Mobile / Small Screens */}
            <button
              onClick={() => setViewMode(viewMode === 'fit' ? 'full' : 'fit')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors"
              title={viewMode === 'fit' ? 'Zoom to 100%' : 'Fit to Screen'}
            >
              {viewMode === 'fit' ? (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xs:inline">100% Zoom</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xs:inline">Fit Screen</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Lock or Admin Banner Notice */}
        {!isUnlocked && (
          <div
            className={`px-4 sm:px-6 py-2.5 text-xs flex items-center justify-between border-b shrink-0 ${
              isAdmin
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                : 'bg-rose-950/60 text-rose-300 border-rose-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {isAdmin
                  ? 'Admin Mode: Lock bypassed. Export enabled.'
                  : 'Time-Locked: Unlocks automatically on Sept 11, 2026.'}
              </span>
            </div>
            {!isAdmin && (
              <span className="font-semibold text-amber-400 shrink-0 text-[11px]">Sept 11, 2026</span>
            )}
          </div>
        )}

        {/* Success toast notification */}
        {downloadSuccess && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Responsive Certificate View Container */}
        <div
          ref={containerRef}
          className="flex-1 p-2 sm:p-4 md:p-6 bg-slate-950/70 overflow-auto flex flex-col items-center justify-start min-h-[260px]"
        >
          {viewMode === 'fit' && scale < 1 && (
            <div className="mb-2 text-[11px] text-amber-400/90 flex items-center gap-1.5 shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Full certificate fitted to screen. Tap &quot;100% Zoom&quot; to inspect details.</span>
            </div>
          )}

          {viewMode === 'full' && (
            <div className="mb-2 text-[11px] text-slate-400 flex items-center gap-1.5 shrink-0">
              <span>Scroll horizontally or tap &quot;Fit Screen&quot; for complete overview.</span>
            </div>
          )}

          {/* Certificate Wrapper: items-start ensures top = 0 so no vertical clipping occurs */}
          <div
            className="w-full flex justify-center items-start overflow-hidden"
            style={{
              height: viewMode === 'fit' ? `${scaledHeight}px` : 'auto',
              minHeight: viewMode === 'fit' ? `${scaledHeight}px` : 'auto',
              position: 'relative',
            }}
          >
            <div
              id="modal-certificate-wrapper"
              style={{
                width: `${CERT_BASE_WIDTH}px`,
                height: `${CERT_BASE_HEIGHT}px`,
                transform: viewMode === 'fit' ? `scale(${scale})` : 'none',
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
                flexShrink: 0,
              }}
            >
              <Certificate
                participant={participant}
                elementId="modal-certificate-canvas"
                isWatermarked={!canDownload}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-slate-800 bg-slate-950/90 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left w-full sm:w-auto">
            {canDownload ? (
              <span className="text-emerald-400 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> High-Resolution Export Ready
              </span>
            ) : (
              <span className="text-amber-400">Locked until Sept 11, 2026</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors shrink-0"
            >
              Close
            </button>

            {canDownload ? (
              <>
                <button
                  onClick={handleDownloadPng}
                  disabled={downloading !== null}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{downloading === 'png' ? 'Exporting...' : 'Download PNG'}</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={downloading !== null}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>{downloading === 'pdf' ? 'Generating...' : 'Download PDF'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/80 rounded-xl cursor-not-allowed"
              >
                <span>Download Unlocks Sept 11, 2026</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
