'use client';

import React, { useState } from 'react';
import { Participant } from '../lib/types';
import { Certificate } from './Certificate';
import { downloadCertificateAsPdf, downloadCertificateAsPng } from '../lib/exportUtils';
import { X, Download, FileText, Image as ImageIcon, CheckCircle, ShieldAlert, Printer } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-cinzel">
                Certificate Preview: {participant.fullName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                ID: {participant.certificateId} • {participant.collegeName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock or Admin Banner Notice */}
        {!isUnlocked && (
          <div className={`px-6 py-3 text-xs flex items-center justify-between border-b ${
            isAdmin
              ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
              : 'bg-rose-950/60 text-rose-300 border-rose-500/30'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>
                {isAdmin
                  ? 'Admin Mode Active: Lock bypassed. Full certificate export enabled.'
                  : 'Time-Locked: Official download unlocks automatically on Sept 11, 2026.'}
              </span>
            </div>
            {!isAdmin && (
              <span className="font-semibold text-amber-400">Sept 11, 2026 Release</span>
            )}
          </div>
        )}

        {/* Success toast notification */}
        {downloadSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Certificate Render View */}
        <div className="p-4 sm:p-8 bg-slate-950/50 flex justify-center items-center overflow-x-auto">
          <div className="w-full max-w-4xl min-w-[700px]">
            <Certificate
              participant={participant}
              elementId="modal-certificate-canvas"
              isWatermarked={!canDownload}
            />
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <div className="text-xs text-slate-400">
            {canDownload ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Ready for High-Resolution Export
              </span>
            ) : (
              <span className="text-amber-400">Locked until Sept 11, 2026</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Close
            </button>

            {canDownload ? (
              <>
                <button
                  onClick={handleDownloadPng}
                  disabled={downloading !== null}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{downloading === 'png' ? 'Exporting...' : 'Download PNG'}</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={downloading !== null}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading === 'pdf' ? 'Generating...' : 'Download PDF (A4)'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </>
            ) : (
              <button
                disabled
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/80 rounded-xl cursor-not-allowed"
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
