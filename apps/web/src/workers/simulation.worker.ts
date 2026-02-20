import type { SimulationResult } from '../types/simulation';
import type { Design } from '../types/design';

interface RunSimulationPayload {
  design: Design;
  config: { requestsPerSec: number; durationSecs: number };
}

function generateMockResult(payload: RunSimulationPayload): SimulationResult {
  const { design, config } = payload;
  const totalRequests = config.requestsPerSec * config.durationSecs;
  const errorRate = 0.02;
  const failed = Math.floor(totalRequests * errorRate);
  const successful = totalRequests - failed;

  const nodeMetrics = design.nodes.map((node) => ({
    nodeId: node.id,
    requestsHandled: Math.floor(totalRequests / Math.max(design.nodes.length, 1)),
    avgLatencyMs: 20 + Math.random() * 80,
    errorRate: Math.random() * 0.05,
    utilization: 0.3 + Math.random() * 0.5,
    latencyPercentiles: {
      p50: 15 + Math.random() * 30,
      p95: 80 + Math.random() * 100,
      p99: 150 + Math.random() * 200,
      max: 400 + Math.random() * 300,
    },
  }));

  return {
    totalRequests,
    successfulRequests: successful,
    failedRequests: failed,
    durationSecs: config.durationSecs,
    overallLatency: {
      p50: 25,
      p95: 120,
      p99: 280,
      max: 650,
    },
    throughputRps: config.requestsPerSec * (1 - errorRate),
    errorRate,
    nodeMetrics,
    bottlenecks: [],
    timeline: Array.from({ length: 10 }, (_, i) => ({
      timestamp: i * (config.durationSecs / 10),
      rps: config.requestsPerSec * (0.8 + Math.random() * 0.4),
      avgLatencyMs: 20 + Math.random() * 60,
      errorRate: Math.random() * 0.05,
    })),
  };
}

self.onmessage = async (event: MessageEvent) => {
  const { type, payload } = event.data;
  switch (type) {
    case 'INIT':
      // TODO: await init() for WASM module
      self.postMessage({ type: 'READY' });
      break;
    case 'RUN_SIMULATION': {
      // Simulate async computation
      await new Promise((resolve) => setTimeout(resolve, 500));
      // TODO: Replace with WASM engine call
      const mockResult = generateMockResult(payload as RunSimulationPayload);
      self.postMessage({ type: 'SIMULATION_RESULT', payload: mockResult });
      break;
    }
    default:
      break;
  }
};
