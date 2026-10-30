import React, { useState } from 'react';
import { DoseScheduleItem, TimeSlot, Medication } from '../types/clinical';
import { DoseCheckbox } from './DoseCheckbox';
import { StatusBadge } from './StatusBadge';
import { Calendar, Clock, CheckCircle2, AlertCircle, Utensils, Pill, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface DailyScheduleProps {
  doseItems: DoseScheduleItem[];
  onToggleDose: (id: string) => void;
  onOpenMedicationDetail: (medicationId: string) => void;
}

export const DailySchedule: React.FC<DailyScheduleProps> = ({
  doseItems,
  onToggleDose,
  onOpenMedicationDetail,
}) => {
  const [selectedDateOffset, setSelectedDateOffset] = useState<number>(0);

  // Compute adherence stats
  const totalDoses = doseItems.length;
  const takenDoses = doseItems.filter((d) => d.taken).length;
  const adherencePercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  // Format today's date
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + selectedDateOffset);
  const dateFormatted = baseDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeSlots: { slot: TimeSlot; label: string; timeWindow: string; icon: string }[] = [
    { slot: 'Morning', label: 'Morning Administration', timeWindow: '07:00 AM – 11:00 AM', icon: '🌅' },
    { slot: 'Afternoon', label: 'Afternoon Administration', timeWindow: '12:00 PM – 04:00 PM', icon: '☀️' },
    { slot: 'Evening', label: 'Evening Administration', timeWindow: '06:00 PM – 09:00 PM', icon: '🌆' },
    { slot: 'Bedtime', label: 'Bedtime Administration', timeWindow: '09:30 PM – 11:30 PM', icon: '🌙' },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Header & Adherence KPI Bar */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-5 sm:p-6 clinical-card-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] tracking-wider uppercase mb-1">
              <span>Patient Regimen</span>
              <span className="text-slate-300">/</span>
              <span className="text-[#64748B]">Eleanor Vance, 68 yrs</span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-[#00685f]">MRN-90214</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1C30] font-display">
              Daily Medication Schedule
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Synchronized clinical timing protocol with food instructions and pill inventory depletion tracking.
            </p>
          </div>

          {/* Date Selector Navigation */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setSelectedDateOffset((prev) => prev - 1)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 text-center">
              <span className="text-xs font-bold text-[#0B1C30] block">
                {selectedDateOffset === 0 ? 'Today' : selectedDateOffset === -1 ? 'Yesterday' : 'Tomorrow'}
              </span>
              <span className="text-[11px] text-[#64748B] font-mono whitespace-nowrap">
                {dateFormatted}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDateOffset((prev) => prev + 1)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Next day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress & Metrics Strip */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1 */}
          <div className="flex items-center gap-4 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0D9488] transition-all duration-500 ease-out"
                  strokeDasharray={`${adherencePercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold font-mono text-[#0B1C30]">
                {adherencePercent}%
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B1C30] block">Today's Adherence</span>
              <span className="text-xs text-[#64748B] tabular-nums">
                {takenDoses} of {totalDoses} doses logged
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#64748B] block font-mono">NEXT SCHEDULED DOSE</span>
              <span className="text-sm font-bold text-[#0B1C30] mt-0.5 block">
                Warfarin Sodium · 5 mg
              </span>
              <span className="text-xs text-[#0D9488] font-mono font-medium">6:00 PM (In ~5 hours)</span>
            </div>
            <Clock className="w-5 h-5 text-[#0D9488]" />
          </div>

          {/* Metric 3 */}
          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#64748B] block font-mono">CURRENT STREAK</span>
              <span className="text-lg font-bold text-[#0B1C30] mt-0.5 block tabular-nums">
                14 Consecutive Days
              </span>
              <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                <span>●</span> Regimen In Full Compliance
              </span>
            </div>
            <Pill className="w-5 h-5 text-[#006398]" />
          </div>
        </div>
      </div>

      {/* Grouped Time Slots */}
      <div className="space-y-6">
        {timeSlots.map(({ slot, label, timeWindow, icon }) => {
          const itemsInSlot = doseItems.filter((item) => item.slot === slot);
          if (itemsInSlot.length === 0) return null;

          const slotComplete = itemsInSlot.every((item) => item.taken);

          return (
            <div key={slot} className="space-y-3">
              {/* Slot Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-base" role="img" aria-label={slot}>{icon}</span>
                  <div>
                    <h2 className="text-base font-bold text-[#0B1C30] font-display">
                      {label}
                    </h2>
                    <span className="text-xs text-[#64748B] font-mono">
                      {timeWindow}
                    </span>
                  </div>
                </div>

                {slotComplete && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#065F46] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Slot Completed</span>
                  </span>
                )}
              </div>

              {/* Dose Items in Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsInSlot.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-[18px] border transition-all duration-200 p-5 clinical-card-shadow flex flex-col justify-between ${
                      item.taken
                        ? 'border-[#E2E8F0] bg-slate-50/60'
                        : item.status === 'conflict'
                        ? 'border-[#FECACA] ring-1 ring-[#EF4444]/20'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div>
                      {/* Top Row: Scheduled Time + Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#006398] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-[#BAE6FD]">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>

                        <StatusBadge
                          status={item.status}
                          customLabel={
                            item.status === 'conflict'
                              ? 'Conflict Alert'
                              : item.status === 'caution'
                              ? 'Low Supply'
                              : undefined
                          }
                        />
                      </div>

                      {/* Drug Name & Strength */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <button
                            type="button"
                            onClick={() => onOpenMedicationDetail(item.medicationId)}
                            className="text-left font-bold text-base text-[#0B1C30] font-display hover:text-[#0D9488] transition-colors cursor-pointer"
                          >
                            {item.medicationName}
                          </button>
                          <span className="text-xs font-mono text-[#64748B] block mt-0.5">
                            Strength: <strong className="text-slate-800">{item.strength}</strong>
                          </span>
                        </div>

                        {/* Pill visual graphic indicator */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-300 shadow-inner shrink-0"
                          style={{ backgroundColor: item.pillColor }}
                          title={`Appearance: ${item.pillShape}`}
                        >
                          <span className="text-[9px] font-mono font-bold text-slate-800 opacity-70">
                            Rx
                          </span>
                        </div>
                      </div>

                      {/* Instructions tag: with food / water */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
                        {item.withFood ? (
                          <span className="inline-flex items-center gap-1 text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD] font-medium">
                            <Utensils className="w-3 h-3" />
                            <span>Take with meal</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                            <span>With water (empty stomach)</span>
                          </span>
                        )}
                        <span className="text-slate-300">·</span>
                        <span className="font-mono tabular-nums">{item.remainingPills} left</span>
                      </div>
                    </div>

                    {/* Bottom Action: Custom Dose Checkbox */}
                    <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <DoseCheckbox
                        checked={item.taken}
                        onChange={() => onToggleDose(item.id)}
                        label={item.taken ? `Taken at ${item.takenAt || 'Logged'}` : 'Mark as Taken'}
                      />

                      <button
                        type="button"
                        onClick={() => onOpenMedicationDetail(item.medicationId)}
                        className="text-xs text-[#0D9488] font-medium hover:underline cursor-pointer"
                      >
                        Info
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
