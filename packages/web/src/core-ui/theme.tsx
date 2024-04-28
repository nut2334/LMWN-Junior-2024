import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Modal } from "@mui/material";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #394156;
`;
export const StyledPopup = styled(Modal)`
  position: "absolute";
  top: "50%";
  left: "50%";
  transform: "translate(-50%, -50%)";
  width: 400px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 24px;
`;

export const CoverImageComputer = {
  width: "200px",
  height: "auto",
  objectPosition: "center center",
  borderRadius: "8px",
  marginLeft: "50px",
  aspectRatio: "1 / 1",
};
export const CoverImageTablet = {
  width: "150px",
  height: "auto",
  aspectRatio: "1 / 1",
  objectPosition: "center center",
  borderRadius: "8px",
  marginLeft: "50px",
};
export const CoverImageIpadMini = {
  width: "125px",
  height: "auto",
  aspectRatio: "1 / 1",
  objectPosition: "center center",
  borderRadius: "8px",
  marginLeft: "50px",
};
export const CoverImagePhone = {
  width: "100px",
  height: "auto",
  aspectRatio: "1 / 1",
  objectPosition: "center center",
  borderRadius: "8px",
};
