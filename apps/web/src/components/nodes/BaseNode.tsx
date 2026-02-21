import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ComponentConfig } from '../../types/component';
import { useDesignStore } from '../../store/useDesignStore';

interface BaseNodeProps extends NodeProps<ComponentConfig> {
  icon: string;
  color: string;
}

export const BaseNode: React.FC<BaseNodeProps> = ({ id, data, selected, icon, color }) => {
  const removeNode = useDesignStore((s) => s.removeNode);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  };

  return (
    <div
      className={`group relative flex flex-col items-center justify-center w-32 h-24 rounded-xl
        shadow-lg transition-all duration-200
        ${selected ? 'ring-2 ring-accent/70 ring-offset-1 ring-offset-surface' : ''}
      `}
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
        border: `1.5px solid ${color}40`,
        backdropFilter: 'blur(8px)',
        boxShadow: selected
          ? `0 0 24px ${color}25, 0 4px 12px var(--node-shadow-selected)`
          : `0 4px 12px var(--node-shadow)`,
      }}
    >
      <button
        onClick={handleDelete}
        className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full
          bg-surface-alt/90 border border-red-500/40 text-red-400
          text-[10px] flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-all duration-200
          hover:bg-red-500 hover:text-white hover:border-red-500
          hover:shadow-lg hover:shadow-red-500/25 z-10"
        title="Remove node"
      >
        ✕
      </button>

      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5" />

      <div
        className="text-2xl mb-1 transition-transform duration-200 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
      >
        {icon}
      </div>

      <span className="text-[11px] text-center font-semibold px-2 truncate w-full leading-tight" style={{ color }}>
        {data.label}
      </span>

      <span className="text-[8px] uppercase tracking-wider text-content-faint mt-0.5 font-medium">
        {data.componentType}
      </span>

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5" />
    </div>
  );
};
