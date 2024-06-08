import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";
import { borders } from "./borders";
import {
  PCMaxWidth,
  heightWithoutAppBar,
  ScreenPaddingX,
  headerHeight,
} from "./dimensions";

const theme = createTheme({
  palette: {
    ...colors,
  },
  shape: {
    ...borders,
  },
  dimensions: {
    PCMaxWidth,
    heightWithoutAppBar,
    ScreenPaddingX,
    headerHeight,
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default theme;
