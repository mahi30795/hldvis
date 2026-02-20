import React from 'react';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store/useUIStore';
import { useDesignStore } from '../../store/useDesignStore';

export const Toolbar: React.FC = () => {
  const { togglePalette, toggleSimPanel } = useUIStore();
  const { nodes, edges } = useDesignStore();

  const handleNew = () => {
    if (window.confirm('Start a new design? This will clear the canvas.')) {
      window.location.reload();
    }
  };

  const handleSave = () => {
    const design = { nodes, edges };
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hldvis-design.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between h-12 px-4 bg-gray-900 text-white border-b border-gray-700">
      <div className="flex items-center gap-2">
        <span className="font-bold text-blue-400 text-lg">HLDVis</span>
        <Button variant="ghost" size="sm" onClick={togglePalette} className="text-gray-300 hover:text-white">
          ☰ Palette
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleNew} className="text-gray-300 hover:text-white">
          New
        </Button>
        <Button variant="ghost" size="sm" onClick={handleSave} className="text-gray-300 hover:text-white">
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={toggleSimPanel}>
          Simulate
        </Button>
      </div>
    </div>
  );
};
