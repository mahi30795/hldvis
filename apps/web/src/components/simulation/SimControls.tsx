import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useSimulation } from '../../hooks/useSimulation';
import { Button } from '../ui/Button';
import { NumberField } from '../config-panel/fields/NumberField';

export const SimControls: React.FC = () => {
  const { config, setConfig, isRunning } = useSimulationStore();
  const { runSimulation } = useSimulation();

  return (
    <div className="flex items-end gap-4 p-4">
      <NumberField
        label="Requests/sec"
        value={config.requestsPerSec}
        min={1}
        max={100000}
        onChange={(v) => setConfig({ requestsPerSec: v })}
      />
      <NumberField
        label="Duration (sec)"
        value={config.durationSecs}
        min={1}
        max={3600}
        onChange={(v) => setConfig({ durationSecs: v })}
      />
      <Button
        onClick={runSimulation}
        disabled={isRunning}
        className="mb-0.5"
      >
        {isRunning ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Running…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Run Simulation
          </>
        )}
      </Button>
    </div>
  );
};
