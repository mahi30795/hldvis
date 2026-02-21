import React, { useEffect } from 'react';
import { Toolbar } from './components/toolbar/Toolbar';
import { Palette } from './components/palette/Palette';
import { Canvas } from './components/canvas/Canvas';
import { ConfigPanel } from './components/config-panel/ConfigPanel';
import { SimPanel } from './components/simulation/SimPanel';
import { useUIStore } from './store/useUIStore';
import { useThemeStore } from './store/useThemeStore';
import { useAutoSave } from './hooks/useAutoSave';

function App() {
  const { isPaletteOpen, isSimPanelOpen } = useUIStore();
  const { theme } = useThemeStore();
  useAutoSave();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="flex flex-col h-screen text-content overflow-hidden" style={{ background: 'var(--app-bg)' }}>
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
