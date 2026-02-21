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
      className={`group relative flex flex-col items-center justify-center w-28 h-20 rounded-lg border-2 shadow-md transition-all ${
        selected ? 'ring-2 ring-blue-400' : ''
      }`}
      style={{ borderColor: color, backgroundColor: `${color}22` }}
    >
      {/* Delete button – visible on hover */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10"
        title="Remove node"
      >
        ✕
      </button>

      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-center font-medium mt-1 px-1 truncate w-full text-center" style={{ color }}>
        {data.label}
      </span>
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </div>
  );
};
