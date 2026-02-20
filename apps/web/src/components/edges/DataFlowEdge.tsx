import React from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from 'reactflow';
import type { EdgeProps } from 'reactflow';
import type { ConnectionConfig } from '../../types/connection';

export const DataFlowEdge: React.FC<EdgeProps<ConnectionConfig>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={{ stroke: '#60a5fa', strokeWidth: 2 }} />
      {data?.protocol && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="px-1 py-0.5 text-xs bg-gray-800 text-blue-300 rounded border border-gray-600"
          >
            {data.protocol}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
