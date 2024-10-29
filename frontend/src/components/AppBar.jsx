import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import { toggleTheme } from "../redux/themeSlice.js";
import { ThemeToggle } from "../components/ThemeToggle.jsx";

export function SearchAppBar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "linear-gradient(to right, #61A0D1, #0F3E67)" }}>
        <Toolbar>
          <AssignmentOutlinedIcon
            sx={{ marginRight: { xs: 4, sm: 1, md: 1 }, fontSize: "2rem" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
            }}>
            TaskBoard
          </Typography>

          <ThemeToggle
            toggleTheme={() => dispatch(toggleTheme())}
            isDarkMode={isDarkMode}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

