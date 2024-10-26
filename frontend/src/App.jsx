import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./App.css";
import { theme } from "./theme.js";
import { Home } from "./pages/Home";
import Layout from "./layout";
import { useSelector } from "react-redux";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={theme(isDarkMode)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<div>not found bro</div>} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

