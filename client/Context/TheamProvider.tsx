import React, { createContext, useContext, useState, ReactNode } from "react";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

type ThemeContextType = () => void;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const setMode = (): void => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeContext.Provider value={setMode}>
      <CustomProvider theme={theme}>{children}</CustomProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const theme = useContext(ThemeContext);

  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
};
