import React from 'react';
import { PaletteCategory } from './PaletteCategory';
import { PaletteItem } from './PaletteItem';
import { useDragToCanvas } from '../../hooks/useDragToCanvas';

const PALETTE_ITEMS = [
  { category: 'Clients', items: [{ type: 'client' as const, label: 'Client', icon: '💻' }] },
  { category: 'Networking', items: [
    { type: 'load-balancer' as const, label: 'Load Balancer', icon: '⚖️' },
    { type: 'cdn' as const, label: 'CDN', icon: '🌐' },
    { type: 'api-gateway' as const, label: 'API Gateway', icon: '🚪' },
  ]},
  { category: 'Compute', items: [
    { type: 'rest-service' as const, label: 'REST Service', icon: '🔧' },
    { type: 'graphql-service' as const, label: 'GraphQL Service', icon: '◈' },
    { type: 'grpc-service' as const, label: 'gRPC Service', icon: '⚡' },
  ]},
  { category: 'Data', items: [
    { type: 'postgresql' as const, label: 'PostgreSQL', icon: '🐘' },
    { type: 'mongodb' as const, label: 'MongoDB', icon: '🍃' },
    { type: 'redis' as const, label: 'Redis', icon: '🔴' },
    { type: 'cassandra' as const, label: 'Cassandra', icon: '💾' },
  ]},
  { category: 'Caching', items: [
    { type: 'redis-cache' as const, label: 'Redis Cache', icon: '⚡' },
    { type: 'memcached' as const, label: 'Memcached', icon: '🗃️' },
  ]},
  { category: 'Messaging', items: [
    { type: 'kafka' as const, label: 'Kafka', icon: '📨' },
    { type: 'rabbitmq' as const, label: 'RabbitMQ', icon: '🐇' },
    { type: 'sqs' as const, label: 'SQS', icon: '📬' },
  ]},
];

export const Palette: React.FC = () => {
  const { onDragStart } = useDragToCanvas();
  return (
    <aside className="w-60 flex flex-col glass glass-border border-t-0 border-b-0 border-l-0 overflow-y-auto animate-fade-in-up">
      <div className="px-4 py-3 flex items-center gap-2 border-b border-divider-subtle/10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-widest">Components</span>
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-1">
        {PALETTE_ITEMS.map(({ category, items }) => (
          <PaletteCategory key={category} title={category}>
            {items.map((item) => (
              <PaletteItem key={item.type} label={item.label} componentType={item.type} icon={item.icon} onDragStart={onDragStart} />
            ))}
          </PaletteCategory>
        ))}
      </div>
    </aside>
  );
};
