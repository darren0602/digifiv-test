import { Snackbar, SnackbarCloseReason, Stack } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import React, { createContext, useContext, useState } from "react";

interface Notification {
  message: string;
  type: AlertColor;
  open: boolean;
}

interface Props {
  children?: React.ReactNode;
}

type SnackBarContextActions = {
  createSnackBar: (notification: Notification) => void;
};

const SnackbarContext = createContext({} as SnackBarContextActions);

const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [snackBar, setSnackBar] = useState<Notification>({
    message: "",
    type: "success",
    open: false,
  });

  const handleClose = (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ message: "", type: snackBar.type, open: false });
  };

  const createSnackBar = (notification: Notification) => {
    setSnackBar(notification);
  };

  return (
    <SnackbarContext.Provider value={{ createSnackBar }}>
      {children}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity={snackBar.type}
            sx={{ width: "100%" }}
            variant="filled"
            elevation={6}
          >
            {snackBar.message}
          </MuiAlert>
        </Snackbar>
      </Stack>
    </SnackbarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};

export { SnackbarProvider, useSnackBar };
