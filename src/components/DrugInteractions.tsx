import React, { useState } from 'react';
import { DrugInteraction, Medication } from '../types/clinical';
import { DRUG_INTERACTIONS } from '../data/mockMedications';
import { AlertTriangle, ShieldCheck, ShieldAlert, AlertCircle, Info, Check, Search, PlusCircle, ExternalLink } from 'lucide-react';

interface DrugInteractionsProps {
  medications: Medication[];
  onOpenMedicationDetail: (medicationId: string) => void;
}

export const DrugInteractions: React.FC<DrugInteractionsProps> = ({
  medications,
  onOpenMedicationDetail,
}) => {
  const [interactions, setInteractions] = useState<DrugInteraction[]>(DRUG_INTERACTIONS);
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [candidateResult, setCandidateResult] = useState<DrugInteraction | null>(null);

  const candidateFormulations = [
    { name: 'Ibuprofen (Advil/Motrin)', class: 'NSAID 200-400mg' },
    { name: 'Potassium Chloride Supplement', class: 'Mineral Electrolyte 20 mEq' },
    { name: 'Ciprofloxacin', class: 'Fluoroquinolone 500mg' },
    { name: 'Clopidogrel (Plavix)', class: 'Antiplatelet 75mg' },
    { name: 'St. John’s Wort', class: 'Herbal Supplement' },
  ];

  const handleTestCandidate = (candidateName: string) => {
    setSelectedCandidate(candidateName);

    if (candidateName.includes('Ibuprofen')) {
      setCandidateResult({
        id: 'test-ibup',
        drugA: 'Warfarin Sodium',
        drugB: 'Ibuprofen (NSAID)',
        severity: 'danger',
        title: 'Severe Gastrointestinal Hemorrhage Risk',
        summary: 'Non-steroidal anti-inflammatory drugs cause gastric mucosal damage and inhibit platelet cyclooxygenase, compounding warfarin anticoagulation.',
        clinicalMechanism: 'Inhibition of COX-1 impairs cytoprotective gastric prostaglandin synthesis. Concurrent hypoprothrombinemia elevates ulceration bleeding severity by 400-500%.',
        actionRequired: 'Avoid systemic NSAIDs. Consider acetaminophen (under 2g/day) or topical analgesic alternatives.',
        evidenceRating: 'Class 1 (Severe)',
      });
    } else if (candidateName.includes('Potassium')) {
      setCandidateResult({
        id: 'test-potassium',
        drugA: 'Lisinopril',
        drugB: 'Potassium Chloride Supplement',
        severity: 'caution',
        title: 'Hyperkalemic Cardiac Dysrhythmia Precaution',
        summary: 'Exogenous potassium combined with ACE inhibitor-induced aldosterone reduction elevates serum potassium above 5.5 mEq/L.',
        clinicalMechanism: 'Lisinopril blunts distal tubule potassium excretion via renin-angiotensin-aldosterone axis suppression.',
        actionRequired: 'Check baseline serum K+ and creatinine. Do not initiate potassium supplementation without nephrologist/cardiologist order.',
        evidenceRating: 'Class 2 (Moderate)',
      });
    } else if (candidateName.includes('Clopidogrel')) {
      setCandidateResult({
        id: 'test-plavix',
        drugA: 'Aspirin (Low Dose)',
        drugB: 'Clopidogrel (Plavix)',
        severity: 'caution',
        title: 'Dual Antiplatelet Therapy (DAPT) Oversight',
        summary: 'Dual antiplatelet therapy requires verified post-PCI indication and strict timeline tracking.',
        clinicalMechanism: 'Simultaneous inhibition of platelet P2Y12 adenosine receptors and thromboxane A2.',
        actionRequired: 'Confirm cardiologist indication. Verify absence of concurrent triple-therapy with Warfarin.',
        evidenceRating: 'Class 2 (Moderate)',
      });
    } else {
      setCandidateResult({
        id: 'test-safe',
        drugA: 'Current Regimen',
        drugB: candidateName,
        severity: 'safe',
        title: 'No Significant Pharmacokinetic Conflicts Detected',
        summary: 'Standard therapeutic dosing does not exhibit verified CYP450 enzyme competition or synergistic toxicity with Eleanor’s active medications.',
        clinicalMechanism: 'Separate clearance pathways without receptor-level interference or clearance inhibition.',
        actionRequired: 'Safe for concurrent administration following standard dosing schedules.',
        evidenceRating: 'Class 3 (Minor)',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] tracking-wider uppercase mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Biochemical Conflict Analysis & Safety Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1C30] font-display">
          Drug Interaction & Contraindication Matrix
        </h1>
        <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
          Automated pairwise pharmacokinetic & pharmacodynamic screening across patient regimen, OTC supplements, and scheduled laboratory procedures.
        </p>
      </div>

      {/* Flagged Conflicts Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#0B1C30] font-display flex items-center justify-between">
          <span>Active Regimen Interactions ({interactions.length})</span>
          <span className="text-xs font-mono text-[#DC2626] font-semibold bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            1 High-Severity Conflict Requires Intervention
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {interactions.map((interaction) => {
            const isDanger = interaction.severity === 'danger';
            const isCaution = interaction.severity === 'caution' || interaction.severity === 'moderate';

            return (
              <div
                key={interaction.id}
                className={`bg-white rounded-[18px] border p-5 sm:p-6 clinical-card-shadow transition-all ${
                  isDanger
                    ? 'border-[#FECACA] ring-2 ring-[#EF4444]/20'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isDanger
                          ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                          : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                      }`}
                    >
                      {isDanger ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Info className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[#006398] bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#DCE9FF]">
                          {interaction.drugA}
                        </span>
                        <span className="text-xs font-bold text-[#64748B]">&times;</span>
                        <span className="text-xs font-mono font-bold text-[#006398] bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#DCE9FF]">
                          {interaction.drugB}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1C30] font-display mt-1.5">
                        {interaction.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                        {interaction.summary}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-start">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        isDanger
                          ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                          : 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isDanger ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'
                        }`}
                      />
                      <span>{interaction.evidenceRating}</span>
                    </span>
                  </div>
                </div>

                {/* Mechanism & Clinician Action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                      Biochemical Mechanism
                    </span>
                    <p className="text-[#334155] leading-relaxed">
                      {interaction.clinicalMechanism}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDanger
                        ? 'bg-[#FEF2F2]/60 border-[#FECACA] text-[#991B1B]'
                        : 'bg-[#FFFBEB]/60 border-[#FDE68A] text-[#92400E]'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase block mb-1">
                      Required Clinician Action
                    </span>
                    <p className="font-medium leading-relaxed">
                      {interaction.actionRequired}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Formulation Screening Tool */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-5 sm:p-6 clinical-card-shadow">
        <div className="border-b border-[#E2E8F0] pb-4">
          <span className="text-[11px] font-mono text-[#0D9488] font-bold uppercase tracking-wider block">
            Pre-Administration Simulator
          </span>
          <h2 className="text-xl font-bold text-[#0B1C30] font-display mt-0.5">
            Test Prospective Medication or OTC Formulation
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Evaluate potential interactions before introducing a new prescription, antibiotic, or over-the-counter remedy.
          </p>
        </div>

        {/* Quick Candidate Formulation Pills */}
        <div className="pt-4">
          <span className="text-xs font-semibold text-[#0B1C30] block mb-2">
            Select a candidate drug to simulate clinical screening:
          </span>
          <div className="flex flex-wrap gap-2">
            {candidateFormulations.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleTestCandidate(item.name)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer text-left ${
                  selectedCandidate === item.name
                    ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-sm'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0B1C30] hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold">{item.name}</div>
                <div className={`text-[10px] ${selectedCandidate === item.name ? 'text-teal-100' : 'text-[#64748B]'}`}>
                  {item.class}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Screening Result Output */}
        {candidateResult && (
          <div
            className={`mt-5 p-5 rounded-[16px] border animate-fadeIn ${
              candidateResult.severity === 'danger'
                ? 'bg-[#FEF2F2] border-[#FECACA]'
                : candidateResult.severity === 'caution'
                ? 'bg-[#FFFBEB] border-[#FDE68A]'
                : 'bg-[#ECFDF5] border-[#A7F3D0]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    candidateResult.severity === 'danger'
                      ? 'bg-rose-100 text-[#DC2626]'
                      : candidateResult.severity === 'caution'
                      ? 'bg-amber-100 text-[#D97706]'
                      : 'bg-emerald-100 text-[#065F46]'
                  }`}
                >
                  {candidateResult.severity === 'danger' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : candidateResult.severity === 'caution' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                    Screening Candidate: {selectedCandidate}
                  </div>
                  <h3
                    className={`text-base font-bold font-display mt-0.5 ${
                      candidateResult.severity === 'danger'
                        ? 'text-[#991B1B]'
                        : candidateResult.severity === 'caution'
                        ? 'text-[#92400E]'
                        : 'text-[#065F46]'
                    }`}
                  >
                    {candidateResult.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      candidateResult.severity === 'danger'
                        ? 'text-[#991B1B]'
                        : candidateResult.severity === 'caution'
                        ? 'text-[#92400E]'
                        : 'text-[#065F46]'
                    }`}
                  >
                    {candidateResult.summary}
                  </p>
                </div>
              </div>

              <span
                className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                  candidateResult.severity === 'danger'
                    ? 'bg-rose-200/80 text-rose-950'
                    : candidateResult.severity === 'caution'
                    ? 'bg-amber-200/80 text-amber-950'
                    : 'bg-emerald-200/80 text-emerald-950'
                }`}
              >
                {candidateResult.evidenceRating}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-300/40 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600 block">
                  Pathology Mechanism:
                </span>
                <p className="text-slate-800 mt-0.5 text-xs">
                  {candidateResult.clinicalMechanism}
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600 block">
                  Recommended Action:
                </span>
                <p className="text-slate-800 font-medium mt-0.5 text-xs">
                  {candidateResult.actionRequired}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
