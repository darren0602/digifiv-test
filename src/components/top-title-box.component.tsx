import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import Spacer from "./spacer.component";
import theme from "../infratsructure/theme";

const CloseIconButton = styled(IconButton)({
  height: "25px",
  width: "25px",
});

const StyledCloseIcon = styled(CloseIcon)({
  height: "25px",
  width: "25px",
  strokeWidth: 2,
});

interface Props {
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  requireCloseButton: boolean;
  isWhiteTitle?: boolean;
}

function TopTitleBox({
  title,
  requireCloseButton = true,
  setShowModal,
  isWhiteTitle,
}: Props) {
  return (
    <Box
      sx={{
        alignItems: "center",
        width: "100%",
      }}
    >
      {requireCloseButton && setShowModal && (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          position="relative"
        >
          <CloseIconButton onClick={() => setShowModal(false)}>
            <StyledCloseIcon />
          </CloseIconButton>
          <Spacer size="xl" />
        </Grid>
      )}
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        marginTop={!requireCloseButton ? "20px" : ""}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            padding: 0,
            color: isWhiteTitle ? theme.palette.common.white : null,
          }}
          variant="h5"
        >
          {title}
        </Typography>
      </Grid>
    </Box>
  );
}

export default TopTitleBox;
