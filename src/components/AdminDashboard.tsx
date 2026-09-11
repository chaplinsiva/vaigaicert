'use client';

import React, { useState } from 'react';
import { Participant } from '../lib/types';
import { CertificateModal } from './CertificateModal';
import {
  ShieldCheck,
  Search,
  Download,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  Users,
  Building,
  GraduationCap,
  Eye,
  LogOut,
  CheckCircle,
  FileText,
  Upload,
} from 'lucide-react';
import Papa from 'papaparse';
import { parseCsvData } from '../lib/dataFetcher';

interface AdminDashboardProps {
  participants: Participant[];
  onUpdateParticipants: (updated: Participant[]) => void;
  onLogout: () => void;
  onRefreshSheet: () => void;
  isRefreshing: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  participants,
  onUpdateParticipants,
  onLogout,
  onRefreshSheet,
  isRefreshing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Participant Form State
  const [formData, setFormData] = useState({
    salutation: 'Mr.',
    name: '',
    designation: 'Student',
    branch: 'CSE',
    collegeName: 'Vaigai College of Engineering',
    email: '',
    mobileNumber: '',
  });

  const filtered = participants.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.collegeName.toLowerCase().includes(q) ||
      p.certificateId.toLowerCase().includes(q)
    );
  });

  const handleOpenCertificate = (p: Participant) => {
    setSelectedParticipant(p);
    setIsModalOpen(true);
  };

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const fullName = `${formData.salutation} ${formData.name.trim()}`;
    const newParticipant: Participant = {
      id: `manual-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      salutation: formData.salutation,
      name: formData.name.trim(),
      fullName,
      designation: formData.designation,
      branch: formData.branch,
      department: formData.branch,
      collegeName: formData.collegeName.trim() || 'Vaigai College of Engineering',
      email: formData.email.trim() || `user_${Date.now()}@vaigai.edu`,
      mobileNumber: formData.mobileNumber.trim(),
      certificateId: `VCE-AI26-${Math.floor(10000 + Math.random() * 90000)}`,
      issueDate: 'September 11, 2026',
      isUnlocked: true,
    };

    const updated = [newParticipant, ...participants];
    onUpdateParticipants(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vce_cached_participants', JSON.stringify(updated));
    }
    setIsAddModalOpen(false);
    setFormData({
      salutation: 'Mr.',
      name: '',
      designation: 'Student',
      branch: 'CSE',
      collegeName: 'Vaigai College of Engineering',
      email: '',
      mobileNumber: '',
    });
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        const parsed = parseCsvData(text);
        if (parsed.length > 0) {
          const merged = [...parsed, ...participants];
          // deduplicate by email or id
          const unique = Array.from(new Map(merged.map((item) => [item.certificateId, item])).values());
          onUpdateParticipants(unique);
          if (typeof window !== 'undefined') {
            localStorage.setItem('vce_cached_participants', JSON.stringify(unique));
          }
          alert(`Successfully imported ${parsed.length} participants from CSV.`);
        }
      }
    };
    reader.readAsText(file);
  };

  // Stats
  const totalCount = participants.length;
  const facultyCount = participants.filter((p) =>
    p.designation.toLowerCase().includes('prof') ||
    p.designation.toLowerCase().includes('faculty') ||
    p.salutation.toLowerCase().includes('dr')
  ).length;
  const studentCount = totalCount - facultyCount;
  const uniqueColleges = new Set(participants.map((p) => p.collegeName)).size;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
                  Admin Management Console
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Lock-Bypass Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Vaigai College of Engineering • 5-Day AI Webinar Series 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRefreshSheet}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Google Sheet</span>
            </button>

            <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import CSV</span>
              <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
            </label>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Participant</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Total Registered</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
              {totalCount}
            </p>
            <p className="text-[11px] text-emerald-400 mt-1">100% Certificate Ready</p>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Faculty / Delegates</span>
              <GraduationCap className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
              {facultyCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Professors & Researchers</p>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Students / Scholars</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
              {studentCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">UG / PG Attendees</p>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Colleges Represented</span>
              <Building className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
              {uniqueColleges}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Institutions & Universities</p>
          </div>
        </div>

        {/* Search and Table Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, email, college, cert ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Showing {filtered.length} of {totalCount} records</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Participant Name</th>
                  <th className="py-3 px-4">Designation / Branch</th>
                  <th className="py-3 px-4">College / Institution</th>
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{p.fullName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {p.designation} {p.branch ? `• ${p.branch}` : ''}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 truncate max-w-xs">
                        {p.collegeName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-400 text-[11px]">
                        {p.certificateId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        <div>{p.email}</div>
                        {p.mobileNumber && <div className="text-slate-500">{p.mobileNumber}</div>}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenCertificate(p)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect & Export</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No participants match your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Participant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-cinzel font-bold text-white mb-4">
              Add Participant Record
            </h3>
            <form onSubmit={handleAddParticipant} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Salutation</label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Assistant Professor / Student"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">College / Institution</label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="Vaigai College of Engineering"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="9876543210"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold shadow-md transition-all"
                >
                  Create Participant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal with Admin Bypass Active */}
      <CertificateModal
        participant={selectedParticipant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isAdmin={true}
        isUnlocked={true}
      />
    </div>
  );
};
