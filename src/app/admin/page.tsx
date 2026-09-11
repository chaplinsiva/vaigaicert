'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AdminDashboard } from '../../components/AdminDashboard';
import { Participant } from '../../lib/types';
import { fetchParticipantsFromSheet } from '../../lib/dataFetcher';
import { ShieldCheck, Lock, User, KeyRound, AlertCircle, ArrowLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session
    const sessionAuth = sessionStorage.getItem('vce_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = async () => {
    setIsRefreshing(true);
    const result = await fetchParticipantsFromSheet();
    setParticipants(result.participants);
    setIsRefreshing(false);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials: username: admin, password: Free@&Focus
    if (username.trim() === 'admin' && password === 'Free@&Focus') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vce_admin_auth', 'true');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials. Please check username and password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vce_admin_auth');
    setUsername('');
    setPassword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navbar isAdmin={true} />
        <AdminDashboard
          participants={participants}
          onUpdateParticipants={(updated) => setParticipants(updated)}
          onLogout={handleLogout}
          onRefreshSheet={loadData}
          isRefreshing={isRefreshing}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar isAdmin={false} />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-3 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-cinzel font-bold text-white">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Vaigai College of Engineering Certificate Control
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-white focus:outline-none transition-colors text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-white focus:outline-none transition-colors text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] text-xs uppercase tracking-wider mt-2"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Participant Portal</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
