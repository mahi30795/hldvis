import React from 'react';
import { useDesignStore } from '../../store/useDesignStore';
import { NumberField } from './fields/NumberField';
import { SelectField } from './fields/SelectField';
import { SliderField } from './fields/SliderField';

const SettingsIcon = ({ className = '' }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const ConfigPanel: React.FC = () => {
  const { selectedNodeId, nodes, updateNode } = useDesignStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="w-60 glass glass-border border-t-0 border-b-0 border-r-0 flex flex-col items-center justify-center text-content-faint text-sm p-6 text-center gap-3">
        <SettingsIcon className="text-content-faint/50" />
        <span className="text-content-faint text-[13px] leading-relaxed">Select a node to<br />configure its properties</span>
      </aside>
    );
  }

  const { data } = selectedNode;
  const updateData = (updates: Partial<typeof data>) => {
    updateNode(selectedNode.id, { data: { ...data, ...updates } });
  };

  return (
    <aside className="w-60 glass glass-border border-t-0 border-b-0 border-r-0 overflow-y-auto animate-fade-in-up">
      <div className="px-4 py-3 flex items-center gap-2 border-b border-divider-subtle/10">
        <SettingsIcon className="text-accent !w-3.5 !h-3.5" />
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-widest truncate">{data.componentType}</span>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-content-muted uppercase tracking-wider">Label</label>
          <input
            value={data.label}
            onChange={(e) => updateData({ label: e.target.value })}
            className="bg-content/[0.05] text-content text-sm rounded-lg px-3 py-2
              border border-content/[0.08] focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
              placeholder-content-faint transition-all duration-150"
          />
        </div>
        <NumberField label="Instances" value={data.instances ?? 1} min={1} max={100} onChange={(v) => updateData({ instances: v })} />
        <NumberField label="Max RPS" value={data.maxRps ?? 1000} min={1} max={100000} onChange={(v) => updateData({ maxRps: v })} />
        <SliderField label="Base Latency (ms)" value={data.baseLatencyMs ?? 10} min={1} max={5000} step={1} onChange={(v) => updateData({ baseLatencyMs: v })} />
        <SelectField label="Protocol" value="http" options={[
          { value: 'http', label: 'HTTP' }, { value: 'https', label: 'HTTPS' },
          { value: 'grpc', label: 'gRPC' }, { value: 'graphql', label: 'GraphQL' },
        ]} onChange={() => {}} />
      </div>
    </aside>
  );
};
