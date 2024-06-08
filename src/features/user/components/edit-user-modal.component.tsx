import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Grid, Modal, styled, useMediaQuery } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import FormSubmitButton from "../../../components/forms/form-submit-button.component";
import FormTextField from "../../../components/forms/form-text-field.component";
import TopTitleBox from "../../../components/top-title-box.component";
import theme from "../../../infratsructure/theme";
import { UserUpdateFormValues } from "../type/type";
import Form from "../../../components/forms/form.component";

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
  width?: string | number;
  onUpdateUser: (values: UserUpdateFormValues) => void;
  item: {
    id: number;
    name: string;
    email: string;
  };
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("Invalid email format").label("Email"),
});

export default function EditUserModal({
  showModal,
  title = "",
  setShowModal,
  width = "450px",
  onUpdateUser,
  item,
}: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal open={showModal} onClose={handleCancel}>
      <ModalBox
        sx={{
          width: isMobile ? "360px" : width,
          paddingX: isMobile ? "25px" : "40px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopTitleBox
              title={title}
              requireCloseButton={true}
              setShowModal={setShowModal}
            />
          </Grid>

          <Form
            initialValues={{
              name: item.name,
              email: item.email,
            }}
            validationSchema={validationSchema}
            onSubmit={onUpdateUser}
          >
            <>
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12}>
                  <FormTextField
                    label="Name"
                    name="name"
                    showIcon={true}
                    icon={<PersonIcon />}
                    placeholder="Enter name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    label="Email"
                    name="email"
                    showIcon={true}
                    icon={<EmailIcon />}
                    placeholder="Enter email"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} paddingTop="50px" textAlign="center">
                <FormSubmitButton>Update</FormSubmitButton>
              </Grid>
            </>
          </Form>
        </Grid>
      </ModalBox>
    </Modal>
  );
}
