export type ComponentType =
  | 'client'
  | 'load-balancer'
  | 'cdn'
  | 'api-gateway'
  | 'rest-service'
  | 'graphql-service'
  | 'grpc-service'
  | 'postgresql'
  | 'mongodb'
  | 'redis'
  | 'cassandra'
  | 'redis-cache'
  | 'memcached'
  | 'kafka'
  | 'rabbitmq'
  | 'sqs';

export interface PerformanceModel {
  maxRps: number;
  baseLatencyMs: number;
  latencyStdDevMs: number;
  errorRate: number;
}

export interface ServiceConfig {
  instances: number;
  protocol: 'http' | 'https' | 'grpc' | 'graphql';
  performance: PerformanceModel;
}

export interface DatabaseConfig {
  instances: number;
  replicationFactor: number;
  performance: PerformanceModel;
}

export interface LoadBalancerConfig {
  algorithm: 'round-robin' | 'least-connections' | 'random';
  performance: PerformanceModel;
}

export interface CacheConfig {
  hitRate: number;
  performance: PerformanceModel;
}

export interface QueueConfig {
  maxQueueDepth: number;
  processingRateRps: number;
  performance: PerformanceModel;
}

export type SpecificConfig =
  | ServiceConfig
  | DatabaseConfig
  | LoadBalancerConfig
  | CacheConfig
  | QueueConfig;

export interface ComponentConfig {
  componentType: ComponentType;
  label: string;
  instances?: number;
  maxRps?: number;
  baseLatencyMs?: number;
  specificConfig?: SpecificConfig;
}
