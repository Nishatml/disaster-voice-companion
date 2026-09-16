'use client';

import { useState, useEffect } from 'react';
import { fetchDisasterForecast } from '../services/api';
import { ShieldAlert, Mic, Wind, Droplets, Volume2, Radio } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    async function loadData() {
      const forecast = await fetchDisasterForecast();
      setData(forecast);
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleVoiceAssistant = () => {
    setIsListening(!isListening);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background Glowing Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-5xl flex justify-between items-center py-4 mb-8 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <ShieldAlert size={26} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              VoiceAlert Companion
            </h1>
            <p className="text-xs text-slate-400">Dhaka Region • Early Warning Active</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <Radio size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">Live System</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Voice Assistant Hero Section */}
        <div className="md:col-span-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative shadow-2xl">
          <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">Voice-First Emergency Control</p>
          <h2 className="text-3xl font-extrabold mb-6">Press to Activate Emergency AI</h2>

          {/* Glowing Animated Mic Button */}
          <button
            onClick={toggleVoiceAssistant}
            className={`relative p-8 rounded-full transition-all duration-300 shadow-xl ${
              isListening 
                ? 'bg-red-600 shadow-red-500/50 scale-110 animate-bounce' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 hover:scale-105'
            }`}
          >
            <Mic size={40} className="text-white" />
            {isListening && (
              <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75" />
            )}
          </button>

          <p className="mt-4 text-sm text-slate-400">
            {isListening ? 'Listening for your emergency query...' : 'Tap the microphone to speak'}
          </p>

          {/* Soundwave Simulation when Active */}
          {isListening && (
            <div className="flex items-center gap-1 mt-4">
              <span className="w-1 h-6 bg-red-400 animate-pulse rounded-full" />
              <span className="w-1 h-10 bg-red-500 animate-pulse delay-75 rounded-full" />
              <span className="w-1 h-4 bg-red-400 animate-pulse delay-150 rounded-full" />
            </div>
          )}
        </div>

        {/* Live Risk Status Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-400">Risk Assessment</span>
            <ShieldAlert size={18} className="text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400 mb-2">
            {loading ? 'Analyzing...' : data?.risk_level || 'Low Risk'}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {loading ? 'Fetching satellite forecast...' : data?.summary || 'Weather parameters are currently stable.'}
          </p>
        </div>

        {/* Weather Metrics Card - Wind */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-400">Max Wind Speed</span>
            <Wind size={18} className="text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100 mb-2">
            {loading ? '--' : `${data?.weather?.max_wind_speed || 0} km/h`}
          </div>
          <p className="text-xs text-slate-400">Measured from Open-Meteo Dhaka API station.</p>
        </div>

        {/* Weather Metrics Card - Precipitation */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-400">Precipitation</span>
            <Droplets size={18} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-slate-100 mb-2">
            {loading ? '--' : `${data?.weather?.precipitation || 0} mm`}
          </div>
          <p className="text-xs text-slate-400">Expected rainfall volume over the next 24h.</p>
        </div>

      </div>
    </main>
  );
}