import React, { useState } from 'react';
import { Medication, ClinicalStatus } from '../types/clinical';
import { StatusBadge } from './StatusBadge';
import { Search, Plus, Filter, AlertTriangle, Pill, ArrowUpRight, Clock, Calendar, CheckCircle2, RotateCw } from 'lucide-react';

interface PrescriptionCabinetProps {
  medications: Medication[];
  onOpenMedicationDetail: (id: string) => void;
  onOpenAddModal: () => void;
  onRequestRefill: (id: string) => void;
  onOpenInteractionsModal: () => void;
}

export const PrescriptionCabinet: React.FC<PrescriptionCabinetProps> = ({
  medications,
  onOpenMedicationDetail,
  onOpenAddModal,
  onRequestRefill,
  onOpenInteractionsModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'caution' | 'conflict'>('all');

  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.rxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.prescriber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'verified') return med.status === 'verified' || med.status === 'safe';
    if (selectedFilter === 'caution') return med.status === 'caution';
    if (selectedFilter === 'conflict') return med.status === 'conflict';
    return true;
  });

  const conflictCount = medications.filter((m) => m.status === 'conflict').length;
  const cautionCount = medications.filter((m) => m.status === 'caution').length;

  return (
    <div className="space-y-6">
      {/* Title & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] tracking-wider uppercase mb-1">
            <span>Prescription Registry</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#64748B]">{medications.length} Monitored Formulations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1C30] font-display">
            Medicine & Prescription Cabinet
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Complete active dispensary records, dosage schedules, refill windows, and verified clinical safety statuses.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D9488] rounded-[10px] hover:bg-[#0F766E] shadow-[0_4px_12px_rgba(13,148,136,0.25)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Prescription</span>
        </button>
      </div>

      {/* Global Safety Alert Banner if conflicts exist */}
      {conflictCount > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#991B1B]">
                Drug-Drug Interaction Flagged: Warfarin + Aspirin
              </h2>
              <p className="text-xs text-[#991B1B] mt-0.5">
                Co-administration of antiplatelet and anticoagulant agents multiplies bleeding risks. Specialist review is required.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenInteractionsModal}
            className="px-3 py-1.5 rounded-[10px] bg-white border border-[#FECACA] text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Review Clinical Interaction Matrix &rarr;
          </button>
        </div>
      )}

      {/* Search Bar & Filter Tabs */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input adhering to design system tokens */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medications by brand name, generic name, Rx#, or prescriber..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-xs sm:text-sm text-[#0B1C30] placeholder-[#94A3B8] transition-all focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white text-[#0B1C30] font-semibold shadow-xs'
                : 'text-[#64748B] hover:text-[#0B1C30]'
            }`}
          >
            All ({medications.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('verified')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'verified'
                ? 'bg-white text-[#0B1C30] font-semibold shadow-xs'
                : 'text-[#64748B] hover:text-[#0B1C30]'
            }`}
          >
            Active & Verified
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('caution')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'caution'
                ? 'bg-white text-[#92400E] font-semibold shadow-xs'
                : 'text-[#64748B] hover:text-[#0B1C30]'
            }`}
          >
            Refill Soon ({cautionCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('conflict')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'conflict'
                ? 'bg-white text-[#DC2626] font-semibold shadow-xs'
                : 'text-[#64748B] hover:text-[#0B1C30]'
            }`}
          >
            Alerts ({conflictCount})
          </button>
        </div>
      </div>

      {/* MEDICINE & PRESCRIPTION CARDS GRID */}
      {/* Container has background #FFFFFF, border 1px solid #E2E8F0, border-radius 18px, padding 20px */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedications.map((med) => {
          const supplyPercent = Math.min(100, Math.round((med.remainingPills / med.totalPills) * 100));

          return (
            <div
              key={med.id}
              className="bg-white border border-[#E2E8F0] rounded-[18px] p-5 clinical-card-shadow clinical-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Upper Metadata Band: Drug Name, Strength, Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-3.5">
                  <div>
                    <h3
                      onClick={() => onOpenMedicationDetail(med.id)}
                      className="text-lg font-bold text-[#0B1C30] font-display hover:text-[#0D9488] transition-colors cursor-pointer"
                    >
                      {med.name}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {med.genericName} · <strong className="text-slate-800">{med.strength}</strong>
                    </p>
                    <span className="text-[11px] font-mono text-slate-500 block mt-1">
                      {med.rxNumber} · {med.form}
                    </span>
                  </div>

                  <StatusBadge status={med.status} />
                </div>

                {/* Central Administration Schedule: Morning / Evening tags */}
                <div className="py-3.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mr-1">
                      Schedule:
                    </span>
                    {med.scheduleSlots.map((slot) => (
                      <span
                        key={slot}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF4FF] text-[#006398] border border-[#DCE9FF]"
                      >
                        <Clock className="w-3 h-3" />
                        <span>{slot}</span>
                      </span>
                    ))}
                    <span className="text-xs font-mono text-slate-500">
                      ({med.timeDetails})
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0] leading-relaxed">
                    {med.instructions}
                  </p>

                  <div className="text-[11px] text-[#64748B] flex items-center justify-between">
                    <span>Prescriber: <strong className="text-slate-800">{med.prescriber.split('(')[0]}</strong></span>
                    <span className="font-mono">Exp: {med.expirationDate}</span>
                  </div>
                </div>
              </div>

              {/* Bottom-docked Status Indicator: Remaining pill counts & days until expiration */}
              <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#64748B]">Remaining Inventory:</span>
                    <span className="font-mono font-bold text-[#0B1C30] tabular-nums">
                      {med.remainingPills} / {med.totalPills} {med.form.toLowerCase()}s ({med.refillDaysLeft} days supply)
                    </span>
                  </div>
                  {/* Progress bar gauge */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        med.refillDaysLeft <= 10
                          ? 'bg-[#F59E0B]'
                          : med.status === 'conflict'
                          ? 'bg-[#EF4444]'
                          : 'bg-[#10B981]'
                      }`}
                      style={{ width: `${supplyPercent}%` }}
                    />
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenMedicationDetail(med.id)}
                    className="flex-1 py-2 px-3 rounded-[10px] bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all cursor-pointer text-center"
                  >
                    View Monograph
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestRefill(med.id)}
                    className={`py-2 px-3 rounded-[10px] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      med.refillDaysLeft <= 10
                        ? 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] hover:bg-amber-100'
                        : 'bg-white border border-[#E2E8F0] text-[#006398] hover:bg-[#F0F9FF]'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{med.refillDaysLeft <= 10 ? 'Refill Now' : 'Refill'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
