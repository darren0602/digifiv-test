import {
  Box,
  Grid,
  Modal,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";
import theme from "../infratsructure/theme";
import BackgroundButton from "./button/background-button.component";
import Spacer from "./spacer.component";
import TopTitleBox from "./top-title-box.component";
// import theme from "../../infrastructure/theme";
// import BackgroundButton from "../button/background-button.component";
// import Spacer from "../utils/spacer.component";
// import TopTitleBox from "../utils/top-title-box.component";

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: theme.shape.borderSizes[1],
  boxShadow: "24px",
  paddingTop: "25px",
  paddingBottom: "25px",
  outline: "none",
});

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  messageSection?: ReactNode;
  onConfirm: () => void;
  buttonText?: string;
  width?: string | number;
}

export default function ConfirmationModal({
  showModal,
  title = "",
  message = "",
  messageSection,
  setShowModal,
  onConfirm,
  buttonText = "Confirm",
  width = "450px",
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal open={showModal} onClose={handleCancel}>
      <ModalBox
        sx={{
          width: isMobile ? "360px" : width,
          paddingX: isMobile ? "25px" : "40px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <TopTitleBox
              title={title}
              requireCloseButton={true}
              setShowModal={setShowModal}
            />
          </Grid>
          <Grid item xs={12}>
            <Spacer size="l" />
            {messageSection ? (
              messageSection
            ) : (
              <Typography textAlign="center">{message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} paddingTop="50px" textAlign="center">
            <BackgroundButton onClick={handleConfirm}>
              {buttonText}
            </BackgroundButton>
          </Grid>
        </Grid>
      </ModalBox>
    </Modal>
  );
}
