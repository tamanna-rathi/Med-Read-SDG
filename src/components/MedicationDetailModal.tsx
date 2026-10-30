import React from 'react';
import { Medication } from '../types/clinical';
import { StatusBadge } from './StatusBadge';
import { X, Clock, AlertTriangle, ShieldCheck, Phone, MapPin, Pill, RotateCw, Calendar, FileText } from 'lucide-react';

interface MedicationDetailModalProps {
  medication: Medication | null;
  onClose: () => void;
  onRequestRefill: (id: string) => void;
}

export const MedicationDetailModal: React.FC<MedicationDetailModalProps> = ({
  medication,
  onClose,
  onRequestRefill,
}) => {
  if (!medication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/45 backdrop-blur-[8px] animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-[20px] clinical-modal-shadow max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-5 pr-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-semibold text-[#006398] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
                {medication.rxNumber}
              </span>
              <span className="text-xs text-[#64748B]">NDC: {medication.ndc}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B1C30] font-display">
              {medication.name}
            </h2>
            <p className="text-sm text-[#64748B] mt-0.5">
              {medication.genericName} · <strong className="text-slate-800">{medication.strength}</strong> ({medication.form})
            </p>
          </div>

          <StatusBadge status={medication.status} />
        </div>

        {/* Pill Appearance Visual Box */}
        <div className="my-5 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border border-slate-300 shadow-inner flex items-center justify-center text-xs font-mono font-bold text-slate-800 shrink-0"
            style={{ backgroundColor: medication.pillAppearance.color }}
          >
            {medication.pillAppearance.imprint}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
              Physical Pill Appearance
            </span>
            <p className="text-xs font-medium text-[#0B1C30] mt-0.5">
              {medication.pillAppearance.description}
            </p>
            <span className="text-[11px] text-[#64748B] font-mono">
              Imprint: "{medication.pillAppearance.imprint}" · Shape: {medication.pillAppearance.shape}
            </span>
          </div>
        </div>

        {/* Administration Instructions */}
        <div className="space-y-4 py-2 text-xs">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase text-[#64748B] block mb-1">
              Patient Administration Protocol
            </span>
            <p className="bg-[#F0FDFA] border border-[#99F6E4] p-3.5 rounded-xl text-slate-800 leading-relaxed font-medium">
              {medication.instructions}
            </p>
          </div>

          {/* Schedule and Depletion Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">DOSING SLOTS</span>
              <span className="font-bold text-[#0B1C30] text-sm block mt-0.5">
                {medication.scheduleSlots.join(', ')}
              </span>
              <span className="text-[11px] text-[#64748B] font-mono">{medication.timeDetails}</span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">REMAINING SUPPLY</span>
              <span className="font-bold text-[#0B1C30] text-sm block mt-0.5 tabular-nums">
                {medication.remainingPills} / {medication.totalPills}
              </span>
              <span className="text-[11px] text-[#0D9488] font-mono">{medication.refillDaysLeft} days left</span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">EXPIRATION DATE</span>
              <span className="font-bold text-[#0B1C30] text-sm block mt-0.5 font-mono">
                {medication.expirationDate}
              </span>
              <span className="text-[11px] text-[#64748B]">Batch active</span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">MEAL REQUIREMENT</span>
              <span className="font-bold text-[#0B1C30] text-sm block mt-0.5">
                {medication.withFood ? 'With Meals' : 'Empty Stomach'}
              </span>
              <span className="text-[11px] text-[#64748B]">8oz water</span>
            </div>
          </div>

          {/* Prescriber & Pharmacy Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="border border-[#E2E8F0] rounded-xl p-3 bg-white">
              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
                Prescribing Physician
              </span>
              <div className="font-bold text-slate-900 text-xs mt-1">
                {medication.prescriber}
              </div>
              <span className="text-[11px] text-[#64748B] block mt-0.5">
                Hospital Affiliation: MetroHealth System
              </span>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-3 bg-white">
              <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
                Fulfilling Dispensary
              </span>
              <div className="font-bold text-slate-900 text-xs mt-1">
                {medication.pharmacy}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#006398] font-mono mt-0.5">
                <Phone className="w-3 h-3" />
                <span>{medication.pharmacyPhone}</span>
              </div>
            </div>
          </div>

          {/* Contraindications & Side Effects */}
          <div className="border-t border-[#E2E8F0] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#DC2626] block mb-1">
                Known Contraindications
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {medication.contraindications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#64748B] block mb-1">
                Common Side Effects to Monitor
              </span>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {medication.sideEffects.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="bg-[#EFF4FF] border border-[#BAE6FD] p-3 rounded-xl">
            <span className="text-[10px] font-mono font-bold uppercase text-[#006398] block mb-0.5">
              Physician Consultation Notes
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {medication.clinicalNotes}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[10px] border border-[#E2E8F0] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close Monograph
          </button>

          <button
            type="button"
            onClick={() => {
              onRequestRefill(medication.id);
              onClose();
            }}
            className="px-4 py-2 rounded-[10px] bg-[#0D9488] text-white text-xs font-semibold hover:bg-[#0F766E] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Submit Refill Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
