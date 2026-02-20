import React from 'react';
import type { DragEvent } from 'react';
import type { ComponentType } from '../../types/component';

interface PaletteItemProps {
  label: string;
  componentType: ComponentType;
  icon?: string;
  onDragStart: (e: DragEvent<HTMLDivElement>, type: ComponentType, label: string) => void;
}

export const PaletteItem: React.FC<PaletteItemProps> = ({ label, componentType, icon = '⬜', onDragStart }) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded cursor-grab bg-gray-700 hover:bg-gray-600 text-white text-sm select-none"
      draggable
      onDragStart={(e) => onDragStart(e, componentType, label)}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};
