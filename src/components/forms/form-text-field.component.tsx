import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import { KeyboardEvent, ReactNode, useState } from "react";
import theme from "../../infratsructure/theme";
import Spacer from "../spacer.component";

interface Props {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  showIcon?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  isTransparent?: boolean;
}

const FormTextField = ({
  label,
  name,
  type,
  showIcon,
  disabled,
  icon,
  placeholder,
  isTransparent = true,
}: Props) => {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    handleSubmit,
  } = useFormikContext<FormikValues>();
  const showError = touched[name] && typeof errors[name] === "string";
  const [isShowPassword, setIsShowPassword] = useState(false);

  const getType = (inputType = "string") => {
    const tempType = inputType;
    if (tempType === "password" && isShowPassword) {
      return "string";
    }
    return tempType;
  };

  const keyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    if (getType(type) === "number") {
      if (e.key === "-" || e.key === "+") {
        e.preventDefault();
      }
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        "& .MuiTextField-root": {
          "& .MuiOutlinedInput-root": {
            backgroundColor: isTransparent
              ? "transparent"
              : theme.palette.common.white,
          },
        },
      }}
    >
      <TextField
        name={name}
        onKeyDown={(event) => keyPress(event)}
        fullWidth
        label={label}
        disabled={disabled}
        error={showError}
        placeholder={placeholder}
        type={getType(type || name)}
        variant="outlined"
        helperText={showError ? String(errors[name]) : null}
        onBlur={() => setFieldTouched(name)}
        size="small"
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
        value={values[name]}
        InputProps={{
          startAdornment: showIcon && (
            <InputAdornment position="start">
              {icon}
              <Spacer position="right" />
            </InputAdornment>
          ),
          endAdornment: (name === "password" ||
            name === "confirmPassword" ||
            name === "newPassword" ||
            name === "currentPassword") && (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
          inputProps: { min: getType(type) === "number" ? 0 : undefined },
        }}
      />
    </Box>
  );
};

export default FormTextField;
