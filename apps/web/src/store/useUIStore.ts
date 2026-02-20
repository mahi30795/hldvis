import { create } from 'zustand';

interface UIState {
  isPaletteOpen: boolean;
  isSimPanelOpen: boolean;
  togglePalette: () => void;
  toggleSimPanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isPaletteOpen: true,
  isSimPanelOpen: false,
  togglePalette: () => set((state) => ({ isPaletteOpen: !state.isPaletteOpen })),
  toggleSimPanel: () =>
    set((state) => ({ isSimPanelOpen: !state.isSimPanelOpen })),
}));
