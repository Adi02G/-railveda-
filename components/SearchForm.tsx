"use client";

import { useState } from "react";
import PNRResult from "./PNRResult";
import LiveStatusResult from "./LiveStatusResult";

export type SearchParams = {
  startTime: string;
  endTime: string;
  timezone: string;
  startLocation: string;
  endLocation: string;
};

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState<SearchParams>({
    startTime: new Date().toISOString().slice(0, 16),
    endTime: "",
    timezone: "IST",
    startLocation: "",
    endLocation: "",
  });

  const [activeTab, setActiveTab] = useState<'search' | 'pnr' | 'live'>('search');
  const [pnr, setPnr] = useState('');
  const [trainNo, setTrainNo] = useState('');

  const [pnrResult, setPnrResult] = useState(null);
  const [liveResult, setLiveResult] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'search') {
      onSearch(formData);
    }
  };

  const checkPnr = async () => {
    setLocalLoading(true);
    setPnrResult(null);
    try {
      // If no PNR entered, use a mock PNR for demo
      const pnrToSearch = pnr || '8901234567';
      const res = await fetch(`/api/proxy/pnr?pnr=${pnrToSearch}`);
      const data = await res.json();
      if (data.data) {
        setPnrResult(data.data);
      } else {
        // Fallback if API fails differently
        console.error("No data in PNR response", data);
      }
    } catch (e) {
      console.error("PNR Fetch Error", e);
    } finally {
      setLocalLoading(false);
    }
  };

  const checkLiveStatus = async () => {
    setLocalLoading(true);
    setLiveResult(null);
    try {
      const trainToSearch = trainNo || '12002';
      const res = await fetch(`/api/proxy/live?trainNo=${trainToSearch}`);
      const data = await res.json();
      if (data.success) {
        setLiveResult(data.data);
      }
    } catch (e) {
      console.error("Live Status Fetch Error", e);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'search' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-white/20 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/10'}`}
        >
          Book Tickets
        </button>
        <button
          onClick={() => setActiveTab('pnr')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'pnr' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-white/20 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/10'}`}
        >
          PNR Status
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'live' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-white/20 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/10'}`}
        >
          Live Status
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full p-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-50"></div>

        {activeTab === 'search' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">From Station</label>
              <input
                type="text"
                list="indian-stations"
                placeholder="e.g. NDLS, CSMT"
                className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                value={formData.startLocation}
                onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                required
              />
              <datalist id="indian-stations">
                <option value="NDLS">New Delhi</option>
                <option value="CSMT">Mumbai CSMT</option>
                <option value="HWH">Howrah</option>
                <option value="MAS">Chennai Central</option>
                <option value="SBC">KSR Bengaluru</option>
                <option value="ADI">Ahmedabad</option>
                <option value="PUNE">Pune</option>
                <option value="JP">Jaipur</option>
                <option value="LKO">Lucknow</option>
                <option value="CNB">Kanpur</option>
              </datalist>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">To Station</label>
              <input
                type="text"
                list="indian-stations"
                placeholder="e.g. BCT, HWH"
                className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                value={formData.endLocation}
                onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Class</label>
              <div className="relative">
                <select
                  className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm [&>option]:text-black"
                  value={formData.timezone} // Reusing timezone field for Class for now
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                >
                  <option value="ALL">All Classes</option>
                  <option value="1A">AC First Class (1A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="SL">Sleeper (SL)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Date</label>
              <input
                type="date"
                className="w-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
                value={formData.startTime.split('T')[0]} // Simple date handling
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-3 flex items-end">
              {/* Spacer */}
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching IRCTC...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span>Search Trains</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pnr' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <input
              type="text"
              placeholder="Enter 10-digit PNR Number"
              maxLength={10}
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              className="text-center text-3xl font-mono tracking-[0.5em] bg-transparent border-b-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 w-full max-w-lg pb-2 placeholder-gray-400 dark:placeholder-gray-700"
            />
            <button
              type="button"
              onClick={checkPnr}
              disabled={localLoading}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-white/10 dark:hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 shadow-md"
            >
              {localLoading ? 'Checking...' : 'Check Status'}
            </button>
            {pnrResult && <PNRResult data={pnrResult} />}
          </div>
        )}

        {activeTab === 'live' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <input
              type="text"
              placeholder="Enter Train No (e.g. 12951)"
              maxLength={5}
              value={trainNo}
              onChange={(e) => setTrainNo(e.target.value)}
              className="text-center text-3xl font-mono tracking-[0.5em] bg-transparent border-b-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 w-full max-w-lg pb-2 placeholder-gray-400 dark:placeholder-gray-700"
            />
            <button
              type="button"
              onClick={checkLiveStatus}
              disabled={localLoading}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-white/10 dark:hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md"
            >
              {localLoading ? 'Locating Train...' : 'Track Train'}
            </button>
            {liveResult && <LiveStatusResult data={liveResult} />}
          </div>
        )}
      </form>
    </div>
  );
}
