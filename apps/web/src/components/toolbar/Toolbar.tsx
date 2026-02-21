import React from 'react';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store/useUIStore';
import { useDesignStore } from '../../store/useDesignStore';
import { useThemeStore } from '../../store/useThemeStore';

const IconPalette = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconFilePlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconSun = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const Toolbar: React.FC = () => {
  const { togglePalette, toggleSimPanel } = useUIStore();
  const { nodes, edges } = useDesignStore();
  const { theme, toggleTheme } = useThemeStore();

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

  const handleToggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning');
    toggleTheme();
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
  };

  return (
    <header className="flex items-center justify-between h-12 px-4 glass glass-border border-t-0 border-l-0 border-r-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2 select-none">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <span className="text-[10px] font-bold text-white leading-none">H</span>
          </div>
          <span
            className="font-bold text-sm tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, var(--logo-from), var(--logo-to))` }}
          >
            HLDVis
          </span>
        </div>
        <div className="w-px h-5 bg-divider/40" />
        <Button variant="ghost" size="sm" onClick={togglePalette}>
          <IconPalette /><span className="hidden sm:inline">Components</span>
        </Button>
      </div>

      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={handleNew}>
          <IconFilePlus /><span className="hidden sm:inline">New</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleSave}>
          <IconDownload /><span className="hidden sm:inline">Export</span>
        </Button>

        <div className="w-px h-5 bg-divider/40 mx-1" />

        {/* Theme toggle */}
        <button
          onClick={handleToggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-content-muted hover:text-accent hover:bg-content/[0.06] transition-all duration-200 active:scale-90"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>

        <div className="w-px h-5 bg-divider/40 mx-1" />

        <Button variant="primary" size="sm" onClick={toggleSimPanel}>
          <IconPlay /> Simulate
        </Button>
      </div>
    </header>
  );
};
