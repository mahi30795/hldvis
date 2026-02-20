import React from 'react';
import { Toolbar } from './components/toolbar/Toolbar';
import { Palette } from './components/palette/Palette';
import { Canvas } from './components/canvas/Canvas';
import { ConfigPanel } from './components/config-panel/ConfigPanel';
import { SimPanel } from './components/simulation/SimPanel';
import { useUIStore } from './store/useUIStore';
import { useAutoSave } from './hooks/useAutoSave';

function App() {
  const { isPaletteOpen, isSimPanelOpen } = useUIStore();
  useAutoSave();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {isPaletteOpen && <Palette />}
        <Canvas />
        <ConfigPanel />
      </div>
      {isSimPanelOpen && <SimPanel />}
    </div>
  );
}

export default App;
