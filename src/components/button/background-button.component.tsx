import { Button, Typography } from "@mui/material";
import { MouseEvent, PropsWithChildren, ReactNode } from "react";

interface Props {
  isLoading?: boolean;
  disabled?: boolean;
  white?: boolean | undefined;
  onClick: () => void;
  startIcon?: ReactNode;
  width?: string;
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const BackgroundButton = ({
  children,
  disabled,
  isLoading,
  white,
  onClick,
  startIcon,
  width = "100px",
}: PropsWithChildren<Props>) => {
  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <Button
      variant="contained"
      color={white ? "white" : "primary"}
      onClick={(event) => onClickHandler(event)}
      disabled={disabled || isLoading}
      disableElevation={true}
      sx={{ textTransform: "none", width }}
      startIcon={startIcon}
    >
      <Typography fontWeight="bold">{children}</Typography>
    </Button>
  );
};

export default BackgroundButton;
