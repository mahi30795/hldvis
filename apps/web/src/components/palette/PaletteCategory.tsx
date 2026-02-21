import React, { useState } from 'react';

interface PaletteCategoryProps { title: string; children: React.ReactNode; }

export const PaletteCategory: React.FC<PaletteCategoryProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-0.5">
      <button
        className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-content-faint uppercase tracking-wider hover:text-content-secondary rounded-md hover:bg-content/[0.04] transition-colors duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && <div className="flex flex-col gap-1 mt-1 animate-slide-down">{children}</div>}
    </div>
  );
};
