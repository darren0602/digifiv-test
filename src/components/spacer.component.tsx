import React from "react";
import { Box } from "@mui/material";

interface Props {
  position?: "top" | "left" | "right" | "bottom";
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
}

function Spacer({ position = "top", size = "s" }: Props) {
  const sizeVariant = {
    xs: 0.5,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    xxl: 8,
    xxxl: 12,
  };

  const sizeIndex = sizeVariant[size];

  const positionVariant = {
    top: "marginTop",
    left: "marginLeft",
    right: "marginRight",
    bottom: "marginBottom",
  };

  const positionIndex = positionVariant[position];

  switch (positionIndex) {
    case "marginLeft":
      return <Box sx={{ marginLeft: sizeIndex }} />;
    case "marginRight":
      return <Box sx={{ marginRight: sizeIndex }} />;
    case "marginBottom":
      return <Box sx={{ marginBottom: sizeIndex }} />;
    default:
      return <Box sx={{ marginTop: sizeIndex }} />;
  }
}

export default Spacer;
