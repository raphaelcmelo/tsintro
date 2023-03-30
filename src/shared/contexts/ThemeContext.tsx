import React, { createContext } from "react";

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {

  return (
    <ThemeContext.Provider>
      {children}
    </ThemeContext.Provider>
  )
}