import React from 'react';
import type { DragEvent } from 'react';
import type { ComponentType } from '../../types/component';

interface PaletteItemProps {
  label: string;
  componentType: ComponentType;
  icon?: string;
  onDragStart: (e: DragEvent<HTMLDivElement>, type: ComponentType, label: string) => void;
}

export const PaletteItem: React.FC<PaletteItemProps> = ({ label, componentType, icon = '⬜', onDragStart }) => (
  <div
    className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-grab
      bg-content/[0.04] border border-transparent
      hover:bg-content/[0.08] hover:border-accent/20
      text-content-secondary hover:text-content text-sm select-none
      transition-all duration-150 active:scale-[0.97] active:cursor-grabbing"
    draggable
    onDragStart={(e) => onDragStart(e, componentType, label)}
  >
    <span className="text-base flex-shrink-0">{icon}</span>
    <span className="font-medium text-[13px] truncate">{label}</span>
  </div>
);
