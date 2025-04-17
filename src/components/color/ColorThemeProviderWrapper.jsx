import { useEffect } from "react";
import { useColorTheme } from "../../context/ColorThemeContext";
import { colorPalettes } from "../../utils/colorPalletes";

const ColorThemeProviderWrapper = ({ children }) => {
  const { theme } = useColorTheme();
  const colors = colorPalettes[theme];

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-color", colors.background);
    document.documentElement.style.setProperty("--text-color", colors.text);
    document.documentElement.style.setProperty("--border-color", colors.border);
  }, [theme]);

  return <div className="page-container">{children}</div>;
};

export default ColorThemeProviderWrapper;
