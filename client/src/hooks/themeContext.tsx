import { createContext, ReactNode, useState, useContext } from 'react';
import dark from '../../styles/theme/dark';
import light from '../../styles/theme/light';

type Theme = typeof dark | typeof light;

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(dark);

  function toggleTheme() {
    setCurrentTheme(currentTheme === dark ? light : dark);
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}