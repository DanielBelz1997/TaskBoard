import { PropTypes } from "prop-types";
import { IconButton } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  return (
    <IconButton onClick={toggleTheme} color="default">
      {isDarkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

ThemeToggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};
