import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ComponentConfig } from '../../types/component';

interface BaseNodeProps extends NodeProps<ComponentConfig> {
  icon: string;
  color: string;
}

export const BaseNode: React.FC<BaseNodeProps> = ({ data, selected, icon, color }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 shadow-md transition-all ${
        selected ? 'ring-2 ring-blue-400' : ''
      }`}
      style={{ borderColor: color, backgroundColor: `${color}22` }}
    >
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-center font-medium mt-1 px-1 truncate w-full text-center" style={{ color }}>
        {data.label}
      </span>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
};
