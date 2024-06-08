declare module "@mui/material/styles" {
  interface Palette {
    bg: {
      primary: string;
      secondary: string;
    };
    white: {
      main: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    bg: {
      primary: string;
      secondary: string;
    };
    white: {
      main: string;
      dark: string;
      contrastText: string;
    };
  }

  interface TypeText {
    white?: string;
  }
}

export const colors = {
  primary: {
    main: "#3D6CB9",
    dark: "#8CAFE8",
    contrastText: "#fff",
  },
  white: {
    main: "#fff",
    dark: "#Fff4e8",
    contrastText: "#3D6CB9",
  },
  secondary: {
    main: "#FCF5E3",
    dark: "#bae8e8",
  },
  success: {
    main: "#138000",
  },
  bg: {
    primary: "#F6F6F9",
    secondary: "#DBDBDB",
  },
  text: {
    primary: "#25273C",
    secondary: "#707070",
    disabled: "#9e9fa3",
    white: "#fff",
  },
};
