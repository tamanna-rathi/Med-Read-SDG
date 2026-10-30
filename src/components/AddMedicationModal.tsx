import React, { useState } from 'react';
import { Medication, TimeSlot, ClinicalStatus } from '../types/clinical';
import { X, Plus, ShieldCheck, AlertCircle } from 'lucide-react';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMed: Medication) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [strength, setStrength] = useState('');
  const [form, setForm] = useState<'Tablet' | 'Capsule' | 'Liquid' | 'Inhaler'>('Tablet');
  const [rxNumber, setRxNumber] = useState(`RX-${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [prescriber, setPrescriber] = useState('Dr. Sarah Lin, MD');
  const [instructions, setInstructions] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>(['Morning']);
  const [timeDetails, setTimeDetails] = useState('8:00 AM');
  const [withFood, setWithFood] = useState(false);
  const [totalPills, setTotalPills] = useState(30);
  const [remainingPills, setRemainingPills] = useState(30);
  const [expirationDate, setExpirationDate] = useState('2027-06-30');

  if (!isOpen) return null;

  const handleToggleSlot = (slot: TimeSlot) => {
    if (slots.includes(slot)) {
      if (slots.length > 1) {
        setSlots(slots.filter((s) => s !== slot));
      }
    } else {
      setSlots([...slots, slot]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      genericName: genericName.trim() || name.trim(),
      strength: strength.trim() || '10 mg',
      form,
      rxNumber,
      ndc: '0071-0982-11',
      prescriber,
      pharmacy: 'MetroHealth Clinical Pharmacy',
      pharmacyPhone: '(555) 234-8900',
      instructions: instructions.trim() || `Take 1 ${form.toLowerCase()} daily as prescribed.`,
      scheduleSlots: slots,
      timeDetails,
      withFood,
      totalPills,
      remainingPills,
      dailyDoseCount: slots.length,
      refillDaysLeft: Math.round(remainingPills / slots.length),
      expirationDate,
      status: 'verified',
      pillAppearance: {
        shape: form === 'Capsule' ? 'capsule' : 'round',
        color: '#FFFFFF',
        imprint: 'RX',
        description: `White oral ${form.toLowerCase()} formulation`,
      },
      sideEffects: ['Mild gastrointestinal upset', 'Drowsiness'],
      contraindications: ['Known hypersensitivity'],
      clinicalNotes: 'Manually logged by clinical coordinator or patient.',
    };

    onAdd(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/45 backdrop-blur-[8px] animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-[20px] clinical-modal-shadow max-h-[90vh] overflow-y-auto p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#E2E8F0] pb-4 mb-5">
          <span className="text-[11px] font-mono text-[#0D9488] font-bold uppercase tracking-wider block">
            Prescription Intake
          </span>
          <h2 className="text-xl font-bold text-[#0B1C30] font-display mt-0.5">
            Add Prescription to Cabinet
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Record medication details, dosing schedules, and safety instructions for automated adherence tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Name and Generic Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Brand / Common Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lipitor, Cozaar, Synthroid"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Generic Active Ingredient
              </label>
              <input
                type="text"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                placeholder="e.g. Atorvastatin, Losartan"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>
          </div>

          {/* Row 2: Strength, Form, Rx Number */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Strength / Dosage *
              </label>
              <input
                type="text"
                required
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                placeholder="e.g. 25 mg, 500 mcg"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Formulation
              </label>
              <select
                value={form}
                onChange={(e: any) => setForm(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Liquid">Liquid</option>
                <option value="Inhaler">Inhaler</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Rx Number
              </label>
              <input
                type="text"
                value={rxNumber}
                onChange={(e) => setRxNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] font-mono text-xs focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>
          </div>

          {/* Row 3: Schedule Slots Multi-Selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Scheduled Dosing Slots
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Morning', 'Afternoon', 'Evening', 'Bedtime'] as TimeSlot[]).map((slot) => {
                const active = slots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleToggleSlot(slot)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0D9488] text-white font-semibold shadow-xs'
                        : 'bg-[#F8FAFC] text-slate-700 border border-[#E2E8F0] hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Food requirement & Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Inventory Pill Count
              </label>
              <input
                type="number"
                min="1"
                max="360"
                value={remainingPills}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 30;
                  setRemainingPills(val);
                  setTotalPills(val);
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] font-mono focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] font-mono focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={withFood}
                  onChange={(e) => setWithFood(e.target.checked)}
                  className="rounded text-[#0D9488] focus:ring-[#0D9488]"
                />
                <span className="font-medium text-slate-700 text-xs">Take with meal</span>
              </label>
            </div>
          </div>

          {/* Row 5: Instructions */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Patient Instructions / Auxiliary Labels
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Take 1 tablet once daily with water. Do not crush or chew."
              className="w-full px-3.5 py-2 bg-white border border-[#E2E8F0] rounded-[10px] text-[#0B1C30] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[#0D9488]/15"
            />
          </div>

          {/* Submit / Cancel */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[10px] border border-[#E2E8F0] text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-[10px] bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] shadow-[0_4px_12px_rgba(13,148,136,0.25)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save to Cabinet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
