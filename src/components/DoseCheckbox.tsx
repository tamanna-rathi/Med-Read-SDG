import React from 'react';

interface DoseCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const DoseCheckbox: React.FC<DoseCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`group flex items-center gap-2.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2 rounded-lg cursor-pointer ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      <div
        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ease-out shrink-0 ${
          checked
            ? 'bg-[#0D9488] border border-[#0D9488] shadow-sm'
            : 'bg-white border border-[#CBD5E1] group-hover:border-[#94A3B8]'
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 text-white transition-transform duration-200 ease-out ${
            checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && (
        <span
          className={`text-sm font-medium transition-colors duration-200 ${
            checked ? 'text-slate-500 line-through' : 'text-slate-800'
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
};
