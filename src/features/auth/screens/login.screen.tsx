import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { login } from "../components/authSlice";
import { LoginFormValues } from "../type/type";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().min(4).label("Password"),
});

const initialValues: LoginFormValues = {
  name: "admin",
  password: "password",
};

export default function LoginScreen() {
  const dispatch = useDispatch();
  const snackBar = useSnackBar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/users/list");
      snackBar.createSnackBar({
        message: "Already Logged In",
        type: "error",
        open: true,
      });
    }
  }, [isAuthenticated, navigate, snackBar]);

  const handleSubmit = (values: LoginFormValues) => {
    if (values.name === "admin" && values.password === "password") {
      dispatch(login(values.name));
      navigate("/users/list");
      snackBar.createSnackBar({
        message: "Logged In",
        type: "success",
        open: true,
      });
    } else {
      snackBar.createSnackBar({
        message: "Incorrect Credentials",
        type: "error",
        open: true,
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(to bottom, ${theme.palette.secondary.dark}, ${theme.palette.primary.main})`,
        display: "flex",
        alignItems: "center",
        paddingX: isMobile ? "0px" : "100px",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <PaddedView multiples={isMobile ? 2 : 4}>
          <Grid item>
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.common.white,
                  borderRadius: theme.shape.borderSizes[2],
                  flex: 1,
                  maxWidth: 600,
                  minWidth: isMobile ? undefined : 450,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    paddingY: "12px",
                    borderTopLeftRadius: theme.shape.borderSizes[2],
                    borderTopRightRadius: theme.shape.borderSizes[2],
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: 0,
                      color: theme.palette.common.white,
                    }}
                    variant="h5"
                  >
                    Log In
                  </Typography>
                </Box>

                <Form
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <PaddedView multiples={isMobile ? 3 : 4}>
                    <FormTextField
                      label="Username"
                      name="name"
                      showIcon={true}
                      icon={<PersonIcon />}
                    />
                    <Spacer size="m" />

                    <FormTextField
                      label="Password"
                      name="password"
                      showIcon={true}
                      icon={<LockOutlinedIcon />}
                    />

                    <Spacer size="xl" />

                    <Grid item container justifyContent="center">
                      <Grid item textAlign="center" width="60%">
                        <FormSubmitButton>Sign In</FormSubmitButton>
                      </Grid>
                    </Grid>
                  </PaddedView>
                </Form>
              </Box>
            </Grid>
          </Grid>
        </PaddedView>
      </Grid>
    </Box>
  );
}
