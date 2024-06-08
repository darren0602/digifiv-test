import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormSubmitButton from "../../../components/forms/form-submit-button.component";
import FormTextField from "../../../components/forms/form-text-field.component";
import Form from "../../../components/forms/form.component";
import PaddedView from "../../../components/padded-view.component";
import { useSnackBar } from "../../../components/snackbar.context";
import Spacer from "../../../components/spacer.component";
import { RootState } from "../../../store";
import { addUser, selectUsers } from "../components/userSlice";
import { UserFormValues } from "../type/type";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email("Invalid email format").label("Email"),
});

export default function UserCreateScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const users = useSelector(selectUsers);
  const navigate = useNavigate();
  const snackBar = useSnackBar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const initialValues: UserFormValues = {
    name: "",
    email: "",
  };

  const handleSubmit = (values: UserFormValues) => {
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    dispatch(
      addUser({ id: maxId + 1, name: values.name, email: values.email })
    );
    navigate("/users/list");
    snackBar.createSnackBar({
      message: "Successfully Created",
      type: "success",
      open: true,
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      snackBar.createSnackBar({
        message: "Login First",
        type: "error",
        open: true,
      });
    }
  }, [isAuthenticated, navigate, snackBar]);

  return (
    <Grid
      container
      sx={{
        paddingX: isMobile ? "15px" : theme.dimensions.ScreenPaddingX,
        paddingY: "50px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold">
          Add User
        </Typography>

        <Spacer size="xl" />

        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <PaddedView multiples={isMobile ? 3 : 4}>
            <FormTextField
              label="Name"
              name="name"
              showIcon={true}
              icon={<PersonIcon />}
              placeholder="Enter name"
            />

            <Spacer size="m" />

            <FormTextField
              label="Email"
              name="email"
              showIcon={true}
              icon={<EmailIcon />}
              placeholder="Enter email"
            />

            <Spacer size="xl" />

            <Grid item container justifyContent="end">
              <FormSubmitButton>Submit</FormSubmitButton>
            </Grid>
          </PaddedView>
        </Form>
      </Grid>
    </Grid>
  );
}
