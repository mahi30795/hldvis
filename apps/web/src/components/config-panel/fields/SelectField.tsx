import React from 'react';

interface SelectFieldProps { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void; }

export const SelectField: React.FC<SelectFieldProps> = ({ label, value, options, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-content-muted uppercase tracking-wider">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-content/[0.05] text-content text-sm rounded-lg px-3 py-2
        border border-content/[0.08] focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
        transition-all duration-150 cursor-pointer appearance-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-surface text-content">{opt.label}</option>
      ))}
    </select>
  </div>
);
