import React from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from 'reactflow';
import type { EdgeProps } from 'reactflow';
import type { ConnectionConfig } from '../../types/connection';
import { useDesignStore } from '../../store/useDesignStore';

export const DataFlowEdge: React.FC<EdgeProps<ConnectionConfig>> = ({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd,
}) => {
  const removeEdge = useDesignStore((s) => s.removeEdge);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); removeEdge(id); };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: 'url(#edge-gradient)',
          strokeWidth: 2,
          filter: `drop-shadow(0 0 3px var(--edge-glow))`,
        }}
      />
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--edge-start)" />
            <stop offset="100%" stopColor="var(--edge-end)" />
          </linearGradient>
        </defs>
      </svg>
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="flex items-center gap-1.5 group"
        >
          {data?.protocol && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider glass glass-border rounded-full text-accent shadow-sm">
              {data.protocol}
            </span>
          )}
          <button
            onClick={handleDelete}
            className="w-5 h-5 rounded-full bg-surface-alt/80 border border-content/10 text-content-faint
              text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100
              transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500
              hover:shadow-lg hover:shadow-red-500/25"
            title="Remove edge"
          >
            ✕
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
