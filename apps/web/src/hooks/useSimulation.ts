import { useEffect, useRef, useCallback } from 'react';
import { useDesignStore } from '../store/useDesignStore';
import { useSimulationStore } from '../store/useSimulationStore';

export function useSimulation() {
  const workerRef = useRef<Worker | null>(null);
  const { nodes, edges } = useDesignStore();
  const { config, setRunning, setResults } = useSimulationStore();

  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/simulation.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;
    worker.postMessage({ type: 'INIT' });
    worker.onmessage = (event: MessageEvent) => {
      const { type, payload } = event.data;
      if (type === 'SIMULATION_RESULT') {
        setResults(payload);
        setRunning(false);
      }
    };
    return () => {
      worker.terminate();
    };
  }, [setResults, setRunning]);

  const runSimulation = useCallback(() => {
    if (!workerRef.current) return;
    setRunning(true);
    setResults(null);
    workerRef.current.postMessage({
      type: 'RUN_SIMULATION',
      payload: {
        design: { id: 'current', name: 'Current Design', nodes, edges, viewport: { x: 0, y: 0, zoom: 1 }, createdAt: '', updatedAt: '' },
        config,
      },
    });
  }, [nodes, edges, config, setRunning, setResults]);

  return { runSimulation };
}
