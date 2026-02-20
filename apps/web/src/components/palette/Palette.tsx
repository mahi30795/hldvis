import React from 'react';
import { PaletteCategory } from './PaletteCategory';
import { PaletteItem } from './PaletteItem';
import { useDragToCanvas } from '../../hooks/useDragToCanvas';

const PALETTE_ITEMS = [
  { category: 'Clients', items: [{ type: 'client' as const, label: 'Client', icon: '💻' }] },
  {
    category: 'Networking',
    items: [
      { type: 'load-balancer' as const, label: 'Load Balancer', icon: '⚖️' },
      { type: 'cdn' as const, label: 'CDN', icon: '🌐' },
      { type: 'api-gateway' as const, label: 'API Gateway', icon: '🚪' },
    ],
  },
  {
    category: 'Compute',
    items: [
      { type: 'rest-service' as const, label: 'REST Service', icon: '🔧' },
      { type: 'graphql-service' as const, label: 'GraphQL Service', icon: '◈' },
      { type: 'grpc-service' as const, label: 'gRPC Service', icon: '⚡' },
    ],
  },
  {
    category: 'Data',
    items: [
      { type: 'postgresql' as const, label: 'PostgreSQL', icon: '🐘' },
      { type: 'mongodb' as const, label: 'MongoDB', icon: '🍃' },
      { type: 'redis' as const, label: 'Redis', icon: '🔴' },
      { type: 'cassandra' as const, label: 'Cassandra', icon: '💾' },
    ],
  },
  {
    category: 'Caching',
    items: [
      { type: 'redis-cache' as const, label: 'Redis Cache', icon: '⚡' },
      { type: 'memcached' as const, label: 'Memcached', icon: '🗃️' },
    ],
  },
  {
    category: 'Messaging',
    items: [
      { type: 'kafka' as const, label: 'Kafka', icon: '📨' },
      { type: 'rabbitmq' as const, label: 'RabbitMQ', icon: '🐇' },
      { type: 'sqs' as const, label: 'SQS', icon: '📬' },
    ],
  },
];

export const Palette: React.FC = () => {
  const { onDragStart } = useDragToCanvas();
  return (
    <div className="w-56 flex flex-col bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-700">
        Components
      </div>
      <div className="flex-1 p-2">
        {PALETTE_ITEMS.map(({ category, items }) => (
          <PaletteCategory key={category} title={category}>
            {items.map((item) => (
              <PaletteItem
                key={item.type}
                label={item.label}
                componentType={item.type}
                icon={item.icon}
                onDragStart={onDragStart}
              />
            ))}
          </PaletteCategory>
        ))}
      </div>
    </div>
  );
};
