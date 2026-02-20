import React from 'react';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const NumberField: React.FC<NumberFieldProps> = ({ label, value, onChange, min, max }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:border-blue-500"
    />
  </div>
);
