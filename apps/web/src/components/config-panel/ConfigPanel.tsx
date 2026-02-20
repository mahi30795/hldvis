import React from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { NumberField } from './fields/NumberField';
import { SelectField } from './fields/SelectField';
import { SliderField } from './fields/SliderField';

export const ConfigPanel: React.FC = () => {
  const { selectedNodeId, nodes, updateNode } = useDesignStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-56 bg-gray-800 border-l border-gray-700 flex items-center justify-center text-gray-500 text-sm p-4 text-center">
        Select a node to configure it
      </div>
    );
  }

  const { data } = selectedNode;

  const updateData = (updates: Partial<typeof data>) => {
    updateNode(selectedNode.id, { data: { ...data, ...updates } });
  };

  return (
    <div className="w-56 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-700">
        Configure: {data.componentType}
      </div>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Label</label>
          <input
            value={data.label}
            onChange={(e) => updateData({ label: e.target.value })}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <NumberField
          label="Instances"
          value={data.instances ?? 1}
          min={1}
          max={100}
          onChange={(v) => updateData({ instances: v })}
        />
        <NumberField
          label="Max RPS"
          value={data.maxRps ?? 1000}
          min={1}
          max={100000}
          onChange={(v) => updateData({ maxRps: v })}
        />
        <SliderField
          label="Base Latency (ms)"
          value={data.baseLatencyMs ?? 10}
          min={1}
          max={5000}
          step={1}
          onChange={(v) => updateData({ baseLatencyMs: v })}
        />
        <SelectField
          label="Protocol"
          value="http"
          options={[
            { value: 'http', label: 'HTTP' },
            { value: 'https', label: 'HTTPS' },
            { value: 'grpc', label: 'gRPC' },
            { value: 'graphql', label: 'GraphQL' },
          ]}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
