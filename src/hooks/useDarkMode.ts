// Dark mode hook (uses ThemeContext)

import { useTheme } from '../context/ThemeContext';

export function useDarkMode() {
  return useTheme();
}
