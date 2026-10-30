import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';
import { Medication, ScannedLabelData } from '../types/clinical';
import { SAMPLE_SCAN_LABELS } from '../data/mockMedications';
import { StatusBadge } from './StatusBadge';

interface ScannerViewfinderProps {
  onAddScannedMedication: (scanned: ScannedLabelData) => void;
  activeMedications: Medication[];
  onOpenInteractionsModal?: () => void;
}

export const ScannerViewfinder: React.FC<ScannerViewfinderProps> = ({
  onAddScannedMedication,
  activeMedications,
  onOpenInteractionsModal,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState<'aligning' | 'analyzing' | 'complete'>('complete');
  const [scannedResult, setScannedResult] = useState<ScannedLabelData>(SAMPLE_SCAN_LABELS[0]);
  const [statusMessage, setStatusMessage] = useState<string>('Align text within box');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Trigger scan sequence on preset change
  const triggerScan = (index: number) => {
    setSelectedPresetIndex(index);
    setIsScanning(true);
    setScanStep('aligning');
    setStatusMessage('Align text within box');
    setIsAdded(false);

    // Step 1: Aligning
    setTimeout(() => {
      setScanStep('analyzing');
      setStatusMessage('Scanning optical barcode & label text...');
    }, 700);

    // Step 2: Recognized
    setTimeout(() => {
      setScanStep('complete');
      setScannedResult(SAMPLE_SCAN_LABELS[index]);
      setStatusMessage('Label verified · Regimen checked');
      setIsScanning(false);
    }, 1500);
  };

  // Camera handling
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
      return;
    }

    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this device/browser');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      triggerScan(selectedPresetIndex);
    } catch (err: any) {
      setCameraError(err.message || 'Could not start camera feed.');
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Check if scanned medication has contraindication with active cabinet
  const checkConflicts = (scannedDrug: string) => {
    const isAspirin = scannedDrug.toLowerCase().includes('aspirin');
    const hasWarfarin = activeMedications.some((m) =>
      m.name.toLowerCase().includes('warfarin')
    );

    if (isAspirin && hasWarfarin) {
      return {
        hasConflict: true,
        conflictingWith: 'Warfarin Sodium 5 mg',
        severity: 'danger' as const,
        description:
          'CRITICAL CONTRAINDICATION: High risk of severe hemorrhage due to synergistic platelet inhibition and anticoagulation.',
      };
    }

    return { hasConflict: false };
  };

  const conflictInfo = checkConflicts(scannedResult.drugName);

  return (
    <div className="space-y-6">
      {/* Header section with clinical typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488] tracking-wider uppercase mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Optical Label Recognition & Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1C30] font-display">
            Medicine Scanner Viewfinder
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Position a prescription bottle, blister pack, or auxiliary label in the target reticle. Real-time OCR extracts NDC identifiers, instructions, and verifies patient contraindications immediately.
          </p>
        </div>

        {/* Viewfinder mode controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleCamera}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-[10px] transition-all cursor-pointer ${
              cameraActive
                ? 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                : 'bg-white border border-[#E2E8F0] text-[#0B1C30] hover:bg-slate-50'
            }`}
          >
            <Camera className="w-4 h-4 text-[#0D9488]" />
            <span>{cameraActive ? 'Stop Live Camera' : 'Use Live Camera'}</span>
          </button>

          <button
            type="button"
            onClick={() => triggerScan(selectedPresetIndex)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0D9488] rounded-[10px] hover:bg-[#0F766E] shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>Re-Scan</span>
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{cameraError}. Using high-resolution simulated optical scanning feed.</span>
        </div>
      )}

      {/* Main 2-column layout: Scanner Stage (Left) & Extracted Clinical Monograph (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Viewfinder & Presets */}
        <div className="lg:col-span-7 space-y-4">
          {/* THE MEDICINE SCANNER VIEWFINDER */}
          <div className="relative w-full aspect-[4/3] bg-[#0B111A] rounded-[20px] overflow-hidden border border-slate-700 shadow-xl flex items-center justify-center select-none">
            {/* Background Feed (Camera or High-detail simulated bottle) */}
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6">
                {/* Simulated Prescription Bottle Container Graphic */}
                <div className="relative w-64 h-80 rounded-2xl bg-amber-900/40 border-2 border-amber-700/60 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
                  {/* Bottle Cap */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/90 rounded-t-lg border border-slate-300 shadow-md flex items-center justify-center text-[10px] font-bold text-slate-700 tracking-wider">
                    PUSH & TURN
                  </div>

                  {/* White Prescription Label on Bottle */}
                  <div className="w-full h-full bg-white rounded-lg p-3 text-slate-900 shadow-inner flex flex-col justify-between overflow-hidden">
                    <div className="border-b border-slate-200 pb-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500">
                        <span>METROHEALTH PHARMACY</span>
                        <span>{scannedResult.rxNumber}</span>
                      </div>
                      <div className="text-xs font-bold text-[#00685f] mt-1 font-display uppercase tracking-tight">
                        {scannedResult.drugName}
                      </div>
                      <div className="text-[11px] font-mono text-slate-600">
                        {scannedResult.strength} · {scannedResult.genericName}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-700 font-medium leading-relaxed my-1">
                      {scannedResult.directions}
                    </div>

                    <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>QTY: {scannedResult.quantity}</span>
                      <span>EXP: {scannedResult.expirationDate}</span>
                    </div>

                    {/* Barcode graphic */}
                    <div className="h-6 w-full flex items-center justify-between gap-0.5 mt-1 opacity-80">
                      {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2].map((w, i) => (
                        <div
                          key={i}
                          className="bg-slate-900 h-full"
                          style={{ width: `${w * 2}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEMI-OPAQUE #0F172A VIGNETTE (40% OPACITY) */}
            <div className="absolute inset-0 bg-[#0F172A]/40 pointer-events-none" />

            {/* TARGET RETICLE BOX WITH CLEAN WHITE CORNER MARKERS */}
            {/* Radius 8px, border-width 3px */}
            <div className="relative w-[78%] h-[74%] pointer-events-none flex items-center justify-center">
              {/* Corner 1: Top-Left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-white rounded-tl-[8px] shadow-sm" />
              {/* Corner 2: Top-Right */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-white rounded-tr-[8px] shadow-sm" />
              {/* Corner 3: Bottom-Left */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-white rounded-bl-[8px] shadow-sm" />
              {/* Corner 4: Bottom-Right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-white rounded-br-[8px] shadow-sm" />

              {/* GENTLE HORIZONTAL ANIMATED LASER SWEEP */}
              {/* #10B981 at 70% opacity with a 4px blur */}
              <div
                className="absolute left-2 right-2 h-[2px] bg-[#10B981] opacity-70 blur-[4px] shadow-[0_0_8px_#10B981] animate-laser-sweep pointer-events-none"
              />
              <div
                className="absolute left-4 right-4 h-[1px] bg-white opacity-90 animate-laser-sweep pointer-events-none"
              />

              {/* Optical recognition overlay indicators */}
              {scanStep === 'analyzing' && (
                <div className="text-center font-mono text-xs text-[#10B981] bg-slate-900/80 px-3 py-1.5 rounded-md border border-[#10B981]/40 backdrop-blur-sm shadow-md animate-pulse">
                  READING NDC · VERIFYING CHECKSUM
                </div>
              )}

              {scanStep === 'complete' && (
                <div className="absolute inset-4 border border-emerald-400/40 rounded-lg pointer-events-none bg-emerald-500/5">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    MATCH CONFIDENCE: {scannedResult.confidenceScore}%
                  </div>
                </div>
              )}
            </div>

            {/* REAL-TIME STATUS PILL BELOW: "Align text within box" */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <span
                  className={`w-2 h-2 rounded-full ${
                    scanStep === 'complete' ? 'bg-[#10B981]' : 'bg-[#0D9488] animate-pulse'
                  }`}
                />
                <span className="tracking-wide">{statusMessage}</span>
              </div>
            </div>
          </div>

          {/* Preset Bottle Switcher */}
          <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 clinical-card-shadow">
            <div className="text-xs font-semibold text-[#0B1C30] mb-2 flex items-center justify-between">
              <span>Select Sample Medicine Bottle to Test Scanner:</span>
              <span className="text-[11px] text-[#64748B] font-mono">4 Presets Loaded</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_SCAN_LABELS.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => triggerScan(index)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPresetIndex === index
                      ? 'border-[#0D9488] bg-[#F0FDFA] shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-[#0B1C30] truncate">
                    {item.drugName}
                  </div>
                  <div className="text-[11px] font-mono text-[#0D9488] mt-0.5">
                    {item.strength}
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-1 truncate">
                    {item.status === 'conflict' ? (
                      <span className="text-[#EF4444] font-semibold">Conflict Test</span>
                    ) : item.status === 'caution' ? (
                      <span className="text-[#F59E0B] font-semibold">Expiring Alert</span>
                    ) : (
                      'Verified Safe'
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Optical Recognition Readout & Verification Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-5 sm:p-6 clinical-card-shadow">
            {/* Upper Metadata Band */}
            <div className="flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                  Scanned Prescription Label
                </span>
                <h3 className="text-xl font-bold text-[#0B1C30] font-display mt-0.5">
                  {scannedResult.drugName}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {scannedResult.genericName} · {scannedResult.strength}
                </p>
              </div>

              <StatusBadge
                status={conflictInfo.hasConflict ? 'conflict' : scannedResult.status}
                customLabel={
                  conflictInfo.hasConflict
                    ? 'Conflict Detected'
                    : scannedResult.status === 'verified'
                    ? 'Verified Valid'
                    : scannedResult.status === 'caution'
                    ? 'Expiring Soon'
                    : 'Active'
                }
              />
            </div>

            {/* Contraindication Warning Banner if conflict exists */}
            {conflictInfo.hasConflict && (
              <div className="mt-4 p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-[#991B1B]">
                  <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0" />
                  <span>SAFETY HAZARD WITH EXISTING CABINET</span>
                </div>
                <p className="text-[#991B1B] leading-relaxed">
                  {conflictInfo.description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-rose-950">
                    Conflicting Drug: {conflictInfo.conflictingWith}
                  </span>
                  {onOpenInteractionsModal && (
                    <button
                      type="button"
                      onClick={onOpenInteractionsModal}
                      className="font-bold underline text-[#DC2626] hover:text-[#991B1B] cursor-pointer"
                    >
                      View Clinical Mechanism &rarr;
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Detailed Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-[#E2E8F0]">
              <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block font-mono">RX NUMBER</span>
                <span className="font-mono font-semibold text-[#0B1C30]">{scannedResult.rxNumber}</span>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block font-mono">NATIONAL DRUG CODE</span>
                <span className="font-mono font-semibold text-[#0B1C30]">{scannedResult.ndc}</span>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block font-mono">PRESCRIBER</span>
                <span className="font-medium text-[#0B1C30]">{scannedResult.prescriber}</span>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block font-mono">EXPIRATION DATE</span>
                <span className="font-mono font-semibold text-[#0B1C30]">{scannedResult.expirationDate}</span>
              </div>
            </div>

            {/* Administration Directions */}
            <div className="py-3">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                Directions for Patient
              </span>
              <p className="text-xs text-[#0B1C30] bg-[#F0F9FF] border border-[#BAE6FD] p-3 rounded-lg leading-relaxed font-medium">
                {scannedResult.directions}
              </p>
            </div>

            {/* Extracted OCR Raw Text Stream */}
            <div className="py-2">
              <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1">
                <span className="font-semibold uppercase tracking-wider">OCR Extracted Text Lines</span>
                <span className="font-mono text-[10px] text-[#0D9488]">CONFIDENCE: {scannedResult.confidenceScore}%</span>
              </div>
              <div className="bg-[#0B111A] text-emerald-400 font-mono text-[11px] p-2.5 rounded-lg max-h-24 overflow-y-auto space-y-0.5 border border-slate-700">
                {scannedResult.detectedText.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500 select-none">{idx + 1}.</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                disabled={isAdded}
                onClick={() => {
                  onAddScannedMedication(scannedResult);
                  setIsAdded(true);
                }}
                className={`w-full py-2.5 px-4 rounded-[10px] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : conflictInfo.hasConflict
                    ? 'bg-[#EF4444] text-white hover:bg-rose-700 shadow-sm'
                    : 'bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-[0_4px_12px_rgba(13,148,136,0.25)] active:scale-[0.98]'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Added to Clinical Cabinet</span>
                  </>
                ) : conflictInfo.hasConflict ? (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    <span>Acknowledge Warning & Save</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify & Add to Medication Cabinet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
