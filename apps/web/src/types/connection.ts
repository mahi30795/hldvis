export type Protocol = 'http' | 'https' | 'grpc' | 'amqp' | 'kafka' | 'tcp';

export interface ConnectionConfig {
  protocol: Protocol;
  bandwidthMbps?: number;
  latencyMs?: number;
  async: boolean;
}
