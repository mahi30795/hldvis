import { useCallback } from 'react';
import type { DragEvent } from 'react';
import type { ComponentType } from '../types/component';

export function useDragToCanvas() {
  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, componentType: ComponentType, label: string) => {
      event.dataTransfer.setData('application/reactflow/type', componentType);
      event.dataTransfer.setData('application/reactflow/label', label);
      event.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  return { onDragStart };
}
