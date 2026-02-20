import React from 'react';

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export const SliderField: React.FC<SliderFieldProps> = ({ label, value, min, max, step = 1, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}: <span className="text-white">{value}</span></label>
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-blue-500"
    />
  </div>
);
