import { Button, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  isLoading?: boolean;
  disabled?: boolean;
  error?: boolean;
  onClick: () => void;
  width?: string;
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const BorderButton = ({
  children,
  disabled,
  isLoading,
  onClick,
  error = false,
  width = "100%",
}: PropsWithChildren<Props>) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      color={error ? "error" : "primary"}
      disabled={disabled || isLoading}
      disableElevation={true}
      sx={{ textTransform: "none", width }}
    >
      <Typography fontWeight="bold">{children}</Typography>
    </Button>
  );
};

export default BorderButton;
