import React from 'react';
import { ShieldCheck, Plus, ScanLine, AlertCircle } from 'lucide-react';

export type NavTab = 'schedule' | 'cabinet' | 'scanner' | 'interactions' | 'adherence';

interface TopNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenScanner: () => void;
  onOpenAddModal: () => void;
  hasConflictAlert: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenScanner,
  onOpenAddModal,
  hasConflictAlert,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] clinical-card-shadow">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in Plus Jakarta Sans */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#00685f] flex items-center justify-center text-white shadow-sm shadow-[#0D9488]/20">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <button
            onClick={() => onSelectTab('schedule')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-lg font-bold tracking-tight text-[#0B1C30] font-display whitespace-nowrap block leading-tight">
              Clinical Clarity
            </span>
            <span className="text-[11px] text-[#64748B] font-medium tracking-wide block">
              Precision Medicine Safety
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (4-5 single-line clean controls) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            type="button"
            onClick={() => onSelectTab('schedule')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'schedule'
                ? 'bg-[#E5EEFF] text-[#00685f] font-semibold'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-slate-100/70'
            }`}
          >
            Daily Schedule
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('cabinet')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'cabinet'
                ? 'bg-[#E5EEFF] text-[#00685f] font-semibold'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-slate-100/70'
            }`}
          >
            Rx Cabinet
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('scanner')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'scanner'
                ? 'bg-[#E5EEFF] text-[#00685f] font-semibold'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-slate-100/70'
            }`}
          >
            <ScanLine className="w-4 h-4 text-[#0D9488]" />
            <span>Label Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('interactions')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'interactions'
                ? 'bg-[#E5EEFF] text-[#00685f] font-semibold'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-slate-100/70'
            }`}
          >
            {hasConflictAlert ? (
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            ) : null}
            <span>Safety & Interactions</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('adherence')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'adherence'
                ? 'bg-[#E5EEFF] text-[#00685f] font-semibold'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-slate-100/70'
            }`}
          >
            Adherence Report
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B1C30] bg-white border border-[#E2E8F0] rounded-[10px] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rx</span>
          </button>

          <button
            type="button"
            onClick={onOpenScanner}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0D9488] rounded-[10px] hover:bg-[#0F766E] hover:shadow-[0_4px_12px_rgba(13,148,136,0.25)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan Medicine</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for responsiveness */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 border-t border-[#E2E8F0] bg-[#F8FAFC] overflow-x-auto text-xs">
        <button
          onClick={() => onSelectTab('schedule')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
            currentTab === 'schedule' ? 'text-[#0D9488] font-bold' : 'text-[#64748B]'
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => onSelectTab('cabinet')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
            currentTab === 'cabinet' ? 'text-[#0D9488] font-bold' : 'text-[#64748B]'
          }`}
        >
          Cabinet
        </button>
        <button
          onClick={() => onSelectTab('scanner')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
            currentTab === 'scanner' ? 'text-[#0D9488] font-bold' : 'text-[#64748B]'
          }`}
        >
          Scanner
        </button>
        <button
          onClick={() => onSelectTab('interactions')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
            currentTab === 'interactions' ? 'text-[#0D9488] font-bold' : 'text-[#64748B]'
          }`}
        >
          Safety
        </button>
        <button
          onClick={() => onSelectTab('adherence')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
            currentTab === 'adherence' ? 'text-[#0D9488] font-bold' : 'text-[#64748B]'
          }`}
        >
          Report
        </button>
      </div>
    </header>
  );
};
