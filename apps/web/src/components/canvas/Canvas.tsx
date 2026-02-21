import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import type { Connection, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import { useDesignStore } from '../../store/useDesignStore';
import { nodeTypes } from '../nodes/nodeRegistry';
import { edgeTypes } from '../edges/edgeRegistry';
import type { ComponentType } from '../../types/component';
import type { DesignNode, DesignEdge } from '../../types/design';

let nodeIdCounter = 1;

export const Canvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge: storeAddEdge, addNode, setSelectedNodeId } = useDesignStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: DesignEdge = {
        ...connection,
        id: `e-${connection.source}-${connection.target}-${Date.now()}`,
        type: 'dataflow',
        source: connection.source ?? '',
        target: connection.target ?? '',
      };
      storeAddEdge(edge);
    },
    [storeAddEdge]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance.current) return;

      const componentType = event.dataTransfer.getData('application/reactflow/type') as ComponentType;
      const label = event.dataTransfer.getData('application/reactflow/label');
      if (!componentType) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: DesignNode = {
        id: `node-${nodeIdCounter++}`,
        type: componentType,
        position,
        data: { componentType, label },
      };
      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => { reactFlowInstance.current = instance; }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        deleteKeyCode={['Backspace', 'Delete']}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#374151" />
        <MiniMap nodeStrokeWidth={3} zoomable pannable className="!bg-gray-800" />
        <Controls className="!bg-gray-800 !border-gray-600" />
      </ReactFlow>
    </div>
  );
};
