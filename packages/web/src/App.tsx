import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "./components/navbar";
import myTheme from "./core-ui/themeMui";
import "./App.css";

//lazy คือการทำให้โหลดหน้าเว็บเราเป็นส่วนๆ ไม่ต้องโหลดหน้าเว็บทั้งหมด
const Restaurants = lazy(() => import("./pages/restaurants"));
const Restaurant = lazy(() => import("./pages/restaurant"));

function App() {
  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <BrowserRouter>
          <Navbar />
          <Suspense
            fallback={
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
