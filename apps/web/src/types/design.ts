import type { Node, Edge } from 'reactflow';
import type { ComponentConfig } from './component';
import type { ConnectionConfig } from './connection';

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export type DesignNode = Node<ComponentConfig>;

export type DesignEdge = Edge<ConnectionConfig>;

export interface Design {
  id: string;
  name: string;
  nodes: DesignNode[];
  edges: DesignEdge[];
  viewport: Viewport;
  createdAt: string;
  updatedAt: string;
}
