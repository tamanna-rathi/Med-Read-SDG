import React, { useState } from 'react';
import { Medication, DoseScheduleItem, ScannedLabelData } from './types/clinical';
import { INITIAL_MEDICATIONS, INITIAL_DOSE_ITEMS } from './data/mockMedications';
import { TopNav, NavTab } from './components/TopNav';
import { DailySchedule } from './components/DailySchedule';
import { PrescriptionCabinet } from './components/PrescriptionCabinet';
import { ScannerViewfinder } from './components/ScannerViewfinder';
import { DrugInteractions } from './components/DrugInteractions';
import { AdherenceReport } from './components/AdherenceReport';
import { MedicationDetailModal } from './components/MedicationDetailModal';
import { AddMedicationModal } from './components/AddMedicationModal';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('schedule');
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [doseItems, setDoseItems] = useState<DoseScheduleItem[]>(INITIAL_DOSE_ITEMS);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' } | null>(null);

  const showToast = (text: string, type: 'success' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Toggle dose taken state
  const handleToggleDose = (doseId: string) => {
    setDoseItems((prev) =>
      prev.map((item) => {
        if (item.id === doseId) {
          const nextTaken = !item.taken;
          const nowStr = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          // Also decrement medication remaining pills count if marked taken
          setMedications((meds) =>
            meds.map((m) => {
              if (m.id === item.medicationId) {
                const nextRemaining = nextTaken
                  ? Math.max(0, m.remainingPills - 1)
                  : m.remainingPills + 1;
                return {
                  ...m,
                  remainingPills: nextRemaining,
                  refillDaysLeft: Math.round(nextRemaining / m.dailyDoseCount),
                  status: nextRemaining <= 8 ? 'caution' : m.status,
                };
              }
              return m;
            })
          );

          if (nextTaken) {
            showToast(`Dose recorded: ${item.medicationName} (${item.strength}) taken at ${nowStr}`);
          }

          return {
            ...item,
            taken: nextTaken,
            takenAt: nextTaken ? nowStr : undefined,
          };
        }
        return item;
      })
    );
  };

  // Refill request
  const handleRequestRefill = (medicationId: string) => {
    const med = medications.find((m) => m.id === medicationId);
    if (!med) return;

    setMedications((prev) =>
      prev.map((m) =>
        m.id === medicationId
          ? {
              ...m,
              remainingPills: m.totalPills,
              refillDaysLeft: Math.round(m.totalPills / m.dailyDoseCount),
              status: m.status === 'caution' ? 'verified' : m.status,
            }
          : m
      )
    );

    showToast(`Refill approved & dispensed for ${med.name} (${med.totalPills} units). Inventory updated.`);
  };

  // Add new scanned medication
  const handleAddScannedMedication = (scanned: ScannedLabelData) => {
    const isAlreadyPresent = medications.some(
      (m) => m.name.toLowerCase() === scanned.drugName.toLowerCase()
    );

    if (isAlreadyPresent) {
      showToast(`${scanned.drugName} is already verified in Eleanor's active cabinet.`, 'alert');
      return;
    }

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: scanned.drugName,
      genericName: scanned.genericName,
      strength: scanned.strength,
      form: scanned.strength.includes('mg') ? 'Tablet' : 'Capsule',
      rxNumber: scanned.rxNumber,
      ndc: scanned.ndc,
      prescriber: scanned.prescriber,
      pharmacy: 'MetroHealth Clinical Pharmacy',
      pharmacyPhone: '(555) 234-8900',
      instructions: scanned.directions,
      scheduleSlots: ['Morning'],
      timeDetails: '8:00 AM',
      withFood: false,
      totalPills: scanned.quantity,
      remainingPills: scanned.quantity,
      dailyDoseCount: 1,
      refillDaysLeft: scanned.quantity,
      expirationDate: scanned.expirationDate,
      status: scanned.status,
      pillAppearance: {
        shape: 'round',
        color: '#FFFFFF',
        imprint: 'RX',
        description: 'Pharmaceutical oral formulation verified by OCR scan',
      },
      sideEffects: ['Standard therapeutic monitoring indicated'],
      contraindications: ['Known hypersensitivity'],
      clinicalNotes: `Scanned and verified on ${new Date().toLocaleDateString()} with ${scanned.confidenceScore}% OCR confidence.`,
    };

    setMedications((prev) => [newMed, ...prev]);

    // Also add to dose schedule
    const newDose: DoseScheduleItem = {
      id: `dose-${Date.now()}`,
      medicationId: newMed.id,
      medicationName: newMed.name,
      strength: newMed.strength,
      slot: 'Morning',
      time: '8:00 AM',
      withFood: false,
      taken: false,
      remainingPills: newMed.remainingPills,
      status: newMed.status,
      pillColor: '#0D9488',
      pillShape: 'round',
    };

    setDoseItems((prev) => [...prev, newDose]);
    showToast(`Added ${newMed.name} to Prescription Cabinet & Daily Schedule.`);
  };

  // Add medication from manual modal
  const handleAddMedication = (newMed: Medication) => {
    setMedications((prev) => [newMed, ...prev]);

    const newDoses: DoseScheduleItem[] = newMed.scheduleSlots.map((slot, index) => ({
      id: `dose-${Date.now()}-${index}`,
      medicationId: newMed.id,
      medicationName: newMed.name,
      strength: newMed.strength,
      slot,
      time: slot === 'Morning' ? '8:00 AM' : slot === 'Afternoon' ? '1:00 PM' : slot === 'Evening' ? '7:00 PM' : '10:00 PM',
      withFood: newMed.withFood,
      taken: false,
      remainingPills: newMed.remainingPills,
      status: newMed.status,
      pillColor: '#0D9488',
      pillShape: 'round',
    }));

    setDoseItems((prev) => [...prev, ...newDoses]);
    showToast(`Prescription saved: ${newMed.name} added to Eleanor's active regimen.`);
  };

  const selectedMedication = medications.find((m) => m.id === selectedMedicationId) || null;
  const hasConflictAlert = medications.some((m) => m.status === 'conflict');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#0D9488]/20 selection:text-[#0D9488]">
      {/* Top Navigation conforming to Top Bar Contract */}
      <TopNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenScanner={() => setCurrentTab('scanner')}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        hasConflictAlert={hasConflictAlert}
      />

      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-bounce duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold ${
              toastMessage.type === 'alert'
                ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                : 'bg-white border-[#A7F3D0] text-[#065F46]'
            }`}
          >
            {toastMessage.type === 'alert' ? (
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'schedule' && (
          <DailySchedule
            doseItems={doseItems}
            onToggleDose={handleToggleDose}
            onOpenMedicationDetail={(id) => setSelectedMedicationId(id)}
          />
        )}

        {currentTab === 'cabinet' && (
          <PrescriptionCabinet
            medications={medications}
            onOpenMedicationDetail={(id) => setSelectedMedicationId(id)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onRequestRefill={handleRequestRefill}
            onOpenInteractionsModal={() => setCurrentTab('interactions')}
          />
        )}

        {currentTab === 'scanner' && (
          <ScannerViewfinder
            onAddScannedMedication={handleAddScannedMedication}
            activeMedications={medications}
            onOpenInteractionsModal={() => setCurrentTab('interactions')}
          />
        )}

        {currentTab === 'interactions' && (
          <DrugInteractions
            medications={medications}
            onOpenMedicationDetail={(id) => setSelectedMedicationId(id)}
          />
        )}

        {currentTab === 'adherence' && (
          <AdherenceReport
            medications={medications}
            doseItems={doseItems}
          />
        )}
      </main>

      {/* Quiet Clinical Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-6 mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0B1C30]">Clinical Clarity</span>
            <span>·</span>
            <span>Electronic Medication Administration & Verification Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>FDA NDC DIRECTORY COMPLIANT</span>
            <span>·</span>
            <span>PATIENT PRIVACY PROTECTED</span>
          </div>
        </div>
      </footer>

      {/* Clinical Monograph Drawer/Modal (Level 3/4 elevation) */}
      <MedicationDetailModal
        medication={selectedMedication}
        onClose={() => setSelectedMedicationId(null)}
        onRequestRefill={handleRequestRefill}
      />

      {/* Add Medication Modal */}
      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedication}
      />
    </div>
  );
}
