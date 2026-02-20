import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';

export const SimResults: React.FC = () => {
  const { results, isRunning } = useSimulationStore();

  if (isRunning) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-400 text-sm">
        Running simulation...
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500 text-sm">
        No results yet. Configure and run a simulation.
      </div>
    );
  }

  const { overallLatency, throughputRps, errorRate, totalRequests } = results;

  return (
    <div className="flex-1 p-3 overflow-x-auto">
      <div className="flex gap-4 text-sm">
        <div className="bg-gray-700 rounded p-2 min-w-[100px]">
          <div className="text-gray-400 text-xs">Throughput</div>
          <div className="text-white font-bold">{throughputRps.toFixed(0)} RPS</div>
        </div>
        <div className="bg-gray-700 rounded p-2 min-w-[100px]">
          <div className="text-gray-400 text-xs">Error Rate</div>
          <div className="text-white font-bold">{(errorRate * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-gray-700 rounded p-2 min-w-[100px]">
          <div className="text-gray-400 text-xs">Total Requests</div>
          <div className="text-white font-bold">{totalRequests.toLocaleString()}</div>
        </div>
        <div className="bg-gray-700 rounded p-2 min-w-[180px]">
          <div className="text-gray-400 text-xs">Latency Percentiles</div>
          <div className="text-white text-xs grid grid-cols-4 gap-1 mt-1">
            <span>p50: {overallLatency.p50}ms</span>
            <span>p95: {overallLatency.p95}ms</span>
            <span>p99: {overallLatency.p99}ms</span>
            <span>max: {overallLatency.max}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
