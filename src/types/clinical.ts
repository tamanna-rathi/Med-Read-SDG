export type ClinicalStatus = 'verified' | 'safe' | 'caution' | 'conflict';

export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  strength: string; // e.g. "20 mg"
  form: 'Tablet' | 'Capsule' | 'Liquid' | 'Inhaler' | 'Injection';
  rxNumber: string;
  ndc: string;
  prescriber: string;
  pharmacy: string;
  pharmacyPhone: string;
  instructions: string;
  scheduleSlots: TimeSlot[];
  timeDetails: string; // e.g. "8:00 AM & 8:00 PM"
  withFood: boolean;
  totalPills: number;
  remainingPills: number;
  dailyDoseCount: number;
  refillDaysLeft: number;
  expirationDate: string;
  status: ClinicalStatus;
  pillAppearance: {
    shape: 'round' | 'oval' | 'capsule' | 'oblong';
    color: string;
    imprint: string;
    description: string;
  };
  sideEffects: string[];
  contraindications: string[];
  clinicalNotes: string;
}

export interface DoseScheduleItem {
  id: string;
  medicationId: string;
  medicationName: string;
  strength: string;
  slot: TimeSlot;
  time: string;
  withFood: boolean;
  taken: boolean;
  takenAt?: string;
  remainingPills: number;
  status: ClinicalStatus;
  pillColor: string;
  pillShape: string;
}

export interface DrugInteraction {
  id: string;
  drugA: string;
  drugB: string;
  severity: 'danger' | 'caution' | 'moderate' | 'safe';
  title: string;
  summary: string;
  clinicalMechanism: string;
  actionRequired: string;
  evidenceRating: 'Class 1 (Severe)' | 'Class 2 (Moderate)' | 'Class 3 (Minor)';
}

export interface ScannedLabelData {
  drugName: string;
  genericName: string;
  strength: string;
  rxNumber: string;
  ndc: string;
  prescriber: string;
  directions: string;
  expirationDate: string;
  quantity: number;
  refillsRemaining: number;
  confidenceScore: number;
  detectedText: string[];
  status: ClinicalStatus;
}
