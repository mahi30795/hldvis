import React from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useSimulation } from '../../hooks/useSimulation';
import { Button } from '../ui/Button';
import { NumberField } from '../config-panel/fields/NumberField';

export const SimControls: React.FC = () => {
  const { config, setConfig, isRunning } = useSimulationStore();
  const { runSimulation } = useSimulation();

  return (
    <div className="flex items-end gap-4 p-3">
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
        {isRunning ? 'Running...' : 'Run Simulation'}
      </Button>
    </div>
  );
};
