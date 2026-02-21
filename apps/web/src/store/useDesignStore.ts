import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import type { NodeChange, EdgeChange } from 'reactflow';
import type { DesignNode, DesignEdge } from '../types/design';

interface DesignState {
  nodes: DesignNode[];
  edges: DesignEdge[];
  selectedNodeId: string | null;
  addNode: (node: DesignNode) => void;
  updateNode: (id: string, data: Partial<DesignNode>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: DesignEdge) => void;
  removeEdge: (id: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setSelectedNodeId: (id: string | null) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === id ? { ...n, ...data } : n)),
    })),
  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  removeEdge: (id) =>
    set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes) as DesignNode[],
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges) as DesignEdge[],
    })),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));
