import React from 'react';

interface NumberFieldProps { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; }

export const NumberField: React.FC<NumberFieldProps> = ({ label, value, onChange, min, max }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-content-muted uppercase tracking-wider">{label}</label>
    <input
      type="number" value={value} min={min} max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-content/[0.05] text-content text-sm rounded-lg px-3 py-2
        border border-content/[0.08] focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
        placeholder-content-faint transition-all duration-150"
    />
  </div>
);
