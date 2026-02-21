import React from 'react';
import type { NodeProps } from 'reactflow';
import type { ComponentConfig } from '../../types/component';
import { BaseNode } from './BaseNode';

export const QueueNode: React.FC<NodeProps<ComponentConfig>> = (props) => (
  <BaseNode {...props} icon="📨" color="#fb923c" />
);
