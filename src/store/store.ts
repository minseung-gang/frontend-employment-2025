import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  toggleMode: (isDark: boolean) => set({ isDarkMode: isDark }),
}));
