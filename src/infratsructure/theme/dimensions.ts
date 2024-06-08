declare module "@mui/system" {
  interface ThemeOptions {
    dimensions: {
      PCMaxWidth: string;
      heightWithoutAppBar: string;
      ScreenPaddingX: string;
      headerHeight: string;
    };
  }
  interface Theme {
    dimensions: {
      PCMaxWidth: string;
      heightWithoutAppBar: string;
      ScreenPaddingX: string;
      headerHeight: string;
    };
  }
}

export const PCMaxWidth = "1240px";

export const heightWithoutAppBar = "89vh";

export const ScreenPaddingX = "15px";

export const headerHeight = "80px";
