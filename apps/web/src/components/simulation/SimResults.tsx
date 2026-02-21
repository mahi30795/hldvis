import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';

const StatCard: React.FC<{ label: string; value: string; accent?: string }> = ({
  label,
  value,
  accent = 'text-content',
}) => (
  <div className="bg-content/[0.04] border border-content/[0.06] rounded-xl p-3 min-w-[110px] transition-all hover:bg-content/[0.07] hover:border-accent/20">
    <div className="text-[10px] font-medium text-content-faint uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-base font-bold ${accent} tabular-nums`}>{value}</div>
  </div>
);

export const SimResults: React.FC = () => {
  const { results, isRunning } = useSimulationStore();

  if (isRunning) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 gap-3">
        <svg className="animate-spin h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-content-faint text-sm font-medium">Running simulation…</span>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-content-faint text-sm">
        No results yet — configure and run a simulation.
      </div>
    );
  }

  const { overallLatency, throughputRps, errorRate, totalRequests } = results;

  return (
    <div className="flex-1 p-4 overflow-x-auto">
      <div className="flex gap-3 text-sm animate-fade-in-up">
        <StatCard
          label="Throughput"
          value={`${throughputRps.toFixed(0)} RPS`}
          accent="text-emerald-500"
        />
        <StatCard
          label="Error Rate"
          value={`${(errorRate * 100).toFixed(1)}%`}
          accent={errorRate > 0.05 ? 'text-red-500' : 'text-emerald-500'}
        />
        <StatCard
          label="Total Requests"
          value={totalRequests.toLocaleString()}
        />
        <div className="bg-content/[0.04] border border-content/[0.06] rounded-xl p-3 min-w-[200px] transition-all hover:bg-content/[0.07] hover:border-accent/20">
          <div className="text-[10px] font-medium text-content-faint uppercase tracking-wider mb-2">Latency Percentiles</div>
          <div className="grid grid-cols-4 gap-2">
            {([
              ['p50', overallLatency.p50],
              ['p95', overallLatency.p95],
              ['p99', overallLatency.p99],
              ['max', overallLatency.max],
            ] as [string, number][]).map(([label, val]) => (
              <div key={label} className="text-center">
                <div className="text-[9px] text-content-faint uppercase font-medium">{label}</div>
                <div className="text-xs font-bold text-content tabular-nums">{val}ms</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
