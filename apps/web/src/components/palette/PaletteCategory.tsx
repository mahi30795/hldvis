import React, { useState } from 'react';

interface PaletteCategoryProps {
  title: string;
  children: React.ReactNode;
}

export const PaletteCategory: React.FC<PaletteCategoryProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mb-2">
      <button
        className="w-full flex items-center justify-between px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && <div className="flex flex-col gap-1 mt-1">{children}</div>}
    </div>
  );
};
