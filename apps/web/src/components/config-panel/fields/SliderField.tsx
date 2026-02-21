import React from 'react';

interface SliderFieldProps { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void; }

export const SliderField: React.FC<SliderFieldProps> = ({ label, value, min, max, step = 1, onChange }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label className="text-[11px] font-medium text-content-muted uppercase tracking-wider">{label}</label>
      <span className="text-xs font-semibold text-accent tabular-nums">{value}</span>
    </div>
    <input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
  </div>
);
