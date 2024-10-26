import { createTheme } from "@mui/material";

export const theme = (isDarkMode) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#6D9DC5" : "#3C7A92",
      },
      secondary: {
        main: isDarkMode ? "#AFAFAF" : "#5D5D5D",
      },
      background: {
        default: isDarkMode ? "#1F1F1F" : "#F2F2F2",
        paper: isDarkMode ? "#282828" : "#FFFFFF",
        footer: isDarkMode ? "#2C2C2C" : "#E0E0E0", // Footer background for light mode
        footerDark: "#1A1A1A", // Footer background for dark mode
      },
      text: {
        primary: isDarkMode ? "#E8E8E8" : "#333333",
        secondary: isDarkMode ? "#B0BEC5" : "#757575",
        footer: isDarkMode ? "#AFAFAF" : "#5D5D5D", // Footer text for light mode
        footerDark: "#B0BEC5", // Footer text for dark mode
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
        color: isDarkMode ? "#6D9DC5" : "#3C7A92",
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 500,
        color: isDarkMode ? "#6D9DC5" : "#3C7A92",
      },
      body1: {
        fontSize: "1rem",
        color: isDarkMode ? "#E8E8E8" : "#333333",
      },
    },
  });
};
