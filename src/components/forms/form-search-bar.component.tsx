import React from "react";
import {
  TextField,
  InputAdornment,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { DebounceInput } from "react-debounce-input";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";
import { FormikValues, useFormikContext } from "formik";
import Spacer from "../spacer.component";

interface Props {
  placeholder: string;
  name: string;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  isTransparent?: boolean;
  isWhiteBg?: boolean;
}

function FormSearchBar({
  placeholder,
  name,
  searchKeyword,
  setSearchKeyword,
  isTransparent = false,
  isWhiteBg = false,
}: Props) {
  const theme = useTheme();
  const { setFieldValue } = useFormikContext<FormikValues>();

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiTextField-root": {
          borderTopLeftRadius: theme.shape.borderSizes[0],
          borderTopRightRadius: theme.shape.borderSizes[0],
          borderBottomLeftRadius: theme.shape.borderSizes[0],
          borderBottomRightRadius: theme.shape.borderSizes[0],
          "& .MuiOutlinedInput-root": {
            borderTopLeftRadius: theme.shape.borderSizes[0],
            borderTopRightRadius: theme.shape.borderSizes[0],
            borderBottomLeftRadius: theme.shape.borderSizes[0],
            borderBottomRightRadius: theme.shape.borderSizes[0],
            backgroundColor: isTransparent
              ? "transparent"
              : isWhiteBg
              ? "white.main"
              : "bg.primary",
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px",
          },
        },
      }}
    >
      <DebounceInput
        sx={{ width: "100%" }}
        debounceTimeout={500}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
          setSearchKeyword(e.target.value);
        }}
        element={TextField}
        value={searchKeyword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
              <Spacer position="right" />
            </InputAdornment>
          ),
          endAdornment: searchKeyword && (
            <InputAdornment position="end">
              <IconButton
                sx={{ padding: "0px" }}
                onClick={() => {
                  setFieldValue(name, "");
                  setSearchKeyword("");
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
      />
    </Box>
  );
}

FormSearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
  isWhiteBg: PropTypes.bool,
};

export default FormSearchBar;
