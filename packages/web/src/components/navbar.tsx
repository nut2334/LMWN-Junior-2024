import React from "react";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavLink to="/">
      <Box
        sx={{
          position: "absolute",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "100px",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "20px",
            left: "20px",
            opacity: 0.8,
            zIndex: 1,
          }}
        ></Box>
        <Box
          sx={{
            borderRadius: "100px",
            position: "absolute",
            zIndex: 2,
            top: "32px",
            left: "38px",
          }}
        >
          <ArrowBackIosIcon />
        </Box>
      </Box>
    </NavLink>
  );
};

export default Navbar;
