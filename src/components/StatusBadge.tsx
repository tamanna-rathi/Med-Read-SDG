import React from 'react';
import { ClinicalStatus } from '../types/clinical';

interface StatusBadgeProps {
  status: ClinicalStatus | 'danger' | 'expiring';
  customLabel?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, customLabel, className = '' }) => {
  let bgClass = '';
  let textClass = '';
  let dotColor = '';
  let defaultLabel = '';

  switch (status) {
    case 'verified':
      bgClass = 'bg-[#ECFDF5] border border-[#A7F3D0]';
      textClass = 'text-[#065F46]';
      dotColor = 'bg-[#10B981]';
      defaultLabel = 'Verified Safe';
      break;
    case 'safe':
      bgClass = 'bg-[#F0FDFA] border border-[#99F6E4]';
      textClass = 'text-[#115E59]';
      dotColor = 'bg-[#0D9488]';
      defaultLabel = 'Regimen Active';
      break;
    case 'caution':
    case 'expiring':
      bgClass = 'bg-[#FFFBEB] border border-[#FDE68A]';
      textClass = 'text-[#92400E]';
      dotColor = 'bg-[#F59E0B]';
      defaultLabel = 'Refill Soon';
      break;
    case 'conflict':
    case 'danger':
      bgClass = 'bg-[#FEF2F2] border border-[#FECACA]';
      textClass = 'text-[#991B1B]';
      dotColor = 'bg-[#EF4444]';
      defaultLabel = 'Interaction Alert';
      break;
    default:
      bgClass = 'bg-[#F0F9FF] border border-[#BAE6FD]';
      textClass = 'text-[#075985]';
      dotColor = 'bg-[#0284C7]';
      defaultLabel = 'Prescription Active';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap shrink-0 ${bgClass} ${textClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />
      <span>{customLabel || defaultLabel}</span>
    </span>
  );
};
