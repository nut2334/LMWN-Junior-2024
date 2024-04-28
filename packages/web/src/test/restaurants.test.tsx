import React from "react";
import { render, screen, within } from "@testing-library/react";
import Restaurants from "../pages/restaurants";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

test("not empty", () => {
  render(<Restaurants />);

  const { getByText } = within(screen.getByTestId("restaurantName"));
  expect(getByText("ลืมเคี้ยว")).toBeInTheDocument();
});
