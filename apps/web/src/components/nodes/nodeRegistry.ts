import type { NodeTypes } from 'reactflow';
import { ClientNode } from './ClientNode';
import { LoadBalancerNode } from './LoadBalancerNode';
import { ServiceNode } from './ServiceNode';
import { DatabaseNode } from './DatabaseNode';
import { CacheNode } from './CacheNode';
import { QueueNode } from './QueueNode';

export const nodeTypes: NodeTypes = {
  client: ClientNode,
  'load-balancer': LoadBalancerNode,
  cdn: LoadBalancerNode,
  'api-gateway': LoadBalancerNode,
  'rest-service': ServiceNode,
  'graphql-service': ServiceNode,
  'grpc-service': ServiceNode,
  postgresql: DatabaseNode,
  mongodb: DatabaseNode,
  redis: DatabaseNode,
  cassandra: DatabaseNode,
  'redis-cache': CacheNode,
  memcached: CacheNode,
  kafka: QueueNode,
  rabbitmq: QueueNode,
  sqs: QueueNode,
};
