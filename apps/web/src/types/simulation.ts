export interface LatencyPercentiles {
  p50: number;
  p95: number;
  p99: number;
  max: number;
}

export interface NodeMetrics {
  nodeId: string;
  requestsHandled: number;
  avgLatencyMs: number;
  errorRate: number;
  utilization: number;
  latencyPercentiles: LatencyPercentiles;
}

export interface Bottleneck {
  nodeId: string;
  nodeLabel: string;
  utilization: number;
  suggestion: string;
}

export interface TimelinePoint {
  timestamp: number;
  rps: number;
  avgLatencyMs: number;
  errorRate: number;
}

export interface SimulationResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  durationSecs: number;
  overallLatency: LatencyPercentiles;
  throughputRps: number;
  errorRate: number;
  nodeMetrics: NodeMetrics[];
  bottlenecks: Bottleneck[];
  timeline: TimelinePoint[];
}
