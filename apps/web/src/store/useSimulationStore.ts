import { create } from 'zustand';
import type { SimulationResult } from '../types/simulation';

interface SimulationConfig {
  requestsPerSec: number;
  durationSecs: number;
}

interface SimulationState {
  isRunning: boolean;
  results: SimulationResult | null;
  config: SimulationConfig;
  setRunning: (isRunning: boolean) => void;
  setResults: (results: SimulationResult | null) => void;
  setConfig: (config: Partial<SimulationConfig>) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isRunning: false,
  results: null,
  config: { requestsPerSec: 100, durationSecs: 30 },
  setRunning: (isRunning) => set({ isRunning }),
  setResults: (results) => set({ results }),
  setConfig: (config) =>
    set((state) => ({ config: { ...state.config, ...config } })),
}));
