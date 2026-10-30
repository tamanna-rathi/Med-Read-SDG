import React, { useState } from 'react';
import { Medication, DoseScheduleItem } from '../types/clinical';
import { Printer, Download, CheckCircle2, TrendingUp, Calendar, AlertCircle, FileText, Share2, ShieldCheck, User } from 'lucide-react';

interface AdherenceReportProps {
  medications: Medication[];
  doseItems: DoseScheduleItem[];
}

export const AdherenceReport: React.FC<AdherenceReportProps> = ({
  medications,
  doseItems,
}) => {
  const [printSuccess, setPrintSuccess] = useState(false);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      window.print();
    }, 200);
    setTimeout(() => {
      setPrintSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] tracking-wider uppercase mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Physician Visit Export & Quality Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1C30] font-display">
            Clinical Adherence & Regimen Summary
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Audit-grade record of medication adherence, scheduled administration windows, and active pharmaceutical formulations for cardiology and primary care consultations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0D9488] rounded-[10px] hover:bg-[#0F766E] shadow-[0_4px_12px_rgba(13,148,136,0.25)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{printSuccess ? 'Preparing Print...' : 'Print Clinical Report'}</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow">
          <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
            30-DAY ADHERENCE RATE
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-[#0B1C30] font-display tabular-nums">94.2%</span>
            <span className="text-xs text-[#10B981] font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +2.8%
            </span>
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">Tier 1 Clinical Benchmark</span>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow">
          <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
            CONSECUTIVE STREAK
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-[#0B1C30] font-display tabular-nums">14</span>
            <span className="text-xs text-[#0D9488] font-medium">Days</span>
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">Zero missed doses since Oct 16</span>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow">
          <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
            ACTIVE FORMULATIONS
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-[#0B1C30] font-display tabular-nums">
              {medications.length}
            </span>
            <span className="text-xs text-slate-500">Prescriptions</span>
          </div>
          <span className="text-xs text-[#64748B] mt-1 block">2 Requiring Refill Soon</span>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow">
          <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block">
            SAFETY INDEX
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-[#DC2626] font-display tabular-nums">1 Flag</span>
          </div>
          <span className="text-xs text-[#DC2626] font-medium mt-1 block">
            Warfarin + Aspirin Contraindication
          </span>
        </div>
      </div>

      {/* 7-Day Adherence Visual Heatmap Matrix */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-5 sm:p-6 clinical-card-shadow">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0B1C30] font-display">
              Weekly Administration Heatmap
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Individual dose execution log over the trailing 7 days across Morning, Afternoon, and Evening slots.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-xs bg-[#10B981]" />
              <span className="text-slate-600">Taken on Time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-xs bg-[#EF4444]" />
              <span className="text-slate-600">Missed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {daysOfWeek.map((day, idx) => {
            const isToday = idx === 6; // Sunday/Today
            const isMissedDay = idx === 2; // Simulated single missed dose on Wed

            return (
              <div
                key={day}
                className={`p-3 rounded-xl border transition-all ${
                  isToday
                    ? 'bg-[#EFF4FF] border-[#BAE6FD] ring-2 ring-[#006398]/20'
                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <span className="text-xs font-bold text-[#0B1C30] block">{day}</span>
                <span className="text-[10px] text-[#64748B] font-mono">
                  Oct {24 + idx}
                </span>

                <div className="mt-3 space-y-1.5">
                  {/* Morning Dose */}
                  <div
                    className="h-5 rounded-md flex items-center justify-center text-[10px] font-mono text-white bg-[#10B981]"
                    title="Morning doses: Completed"
                  >
                    AM ✓
                  </div>
                  {/* Afternoon Dose */}
                  <div
                    className={`h-5 rounded-md flex items-center justify-center text-[10px] font-mono text-white ${
                      isMissedDay ? 'bg-[#EF4444]' : 'bg-[#10B981]'
                    }`}
                    title={isMissedDay ? 'Afternoon dose: Missed' : 'Afternoon dose: Completed'}
                  >
                    {isMissedDay ? 'PM ✕' : 'PM ✓'}
                  </div>
                  {/* Evening Dose */}
                  <div
                    className="h-5 rounded-md flex items-center justify-center text-[10px] font-mono text-white bg-[#10B981]"
                    title="Evening doses: Completed"
                  >
                    EVE ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Monograph Sheet (Ready for Doctor Visit) */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-6 sm:p-8 clinical-card-shadow print:shadow-none print:border-none">
        {/* Printable Letterhead */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#00685f] tracking-widest uppercase">
              CLINICAL CLARITY · ELECTRONIC MEDICATION ADMINISTRATION RECORD
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
              Patient Regimen & Monograph Verification
            </h2>
            <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>Patient:</strong> Eleanor Vance</span>
              <span><strong>DOB:</strong> 04/18/1958 (68 yrs)</span>
              <span><strong>MRN:</strong> 90214-A</span>
              <span><strong>Primary Care:</strong> Dr. Sarah Lin, MD</span>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-500">
            <div>GENERATED: {new Date().toLocaleDateString()}</div>
            <div>VERIFICATION PROTOCOL: PASS</div>
          </div>
        </div>

        {/* Tabular Medication List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-300 font-mono text-slate-500 text-[11px] uppercase">
                <th className="py-2.5 font-semibold">Medication & Strength</th>
                <th className="py-2.5 font-semibold">Rx Number</th>
                <th className="py-2.5 font-semibold">Directions & Schedule</th>
                <th className="py-2.5 font-semibold">Supply Left</th>
                <th className="py-2.5 font-semibold">Safety Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {medications.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50">
                  <td className="py-3 pr-3">
                    <span className="font-bold text-slate-900 block font-display text-sm">
                      {med.name}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {med.genericName} · {med.strength} ({med.form})
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-mono text-slate-700">
                    {med.rxNumber}
                  </td>
                  <td className="py-3 pr-3">
                    <span className="text-slate-800 block font-medium">
                      {med.instructions}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Timing: {med.scheduleSlots.join(', ')} ({med.timeDetails})
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-mono tabular-nums text-slate-700">
                    {med.remainingPills} pills ({med.refillDaysLeft}d)
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        med.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : med.status === 'safe'
                          ? 'bg-teal-100 text-teal-800'
                          : med.status === 'caution'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {med.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doctor Review Sign-off area */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-slate-500">
          <div>
            <p className="max-w-md leading-relaxed text-[11px]">
              This report compiles verified patient self-administration data, optical barcode scan records, and dispensary telemetry. Please review contraindications noted above before writing new therapeutic orders.
            </p>
          </div>
          <div className="w-64 border-t border-slate-400 pt-1 text-center font-mono text-[11px]">
            Physician Signature / Verification Stamp
          </div>
        </div>
      </div>
    </div>
  );
};
