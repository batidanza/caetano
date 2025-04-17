import { createContext, useContext, useEffect, useState } from "react";

const ColorThemeContext = createContext();

export const ColorThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("selectedTheme") || "green";
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("selectedTheme", theme);
  }, [theme]);

  return (
    <ColorThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ColorThemeContext);
