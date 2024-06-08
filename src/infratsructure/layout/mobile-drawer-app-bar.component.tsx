import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Spacer from "../../components/spacer.component";
import PaddedView from "../../components/padded-view.component";
import BorderButton from "../../components/button/border-button.component";

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));

interface Props {
  handleLogout: () => void;
}

function MobileDrawerAppBar({ handleLogout }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isTablet = useMediaQuery(
    theme.breakpoints.down("md") && theme.breakpoints.up("sm")
  );

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <IconButton
        onClick={() => {
          handleOpenDrawer();
        }}
        size="large"
      >
        <MenuIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <Drawer
        anchor="right"
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isTablet ? "35%" : "80%",
            minWidth: "300px",
            backgroundColor: "bg.primary",
          },
        }}
      >
        <Spacer position="top" size="m" />
        <Grid container paddingX="20px" spacing="10px">
          <Grid item xs={12}>
            <StyledLink to={"/users/list"} onClick={handleDrawerToggle}>
              <Typography
                color={
                  location.pathname.toUpperCase().includes("USERS/LIST")
                    ? "primary.main"
                    : "text.secondary"
                }
                variant="h6"
                fontWeight="bold"
              >
                User List
              </Typography>
            </StyledLink>
          </Grid>
          <Grid item xs={12}>
            <StyledLink to={"/users/new"} onClick={handleDrawerToggle}>
              <Typography
                color={
                  location.pathname.toUpperCase().includes("USERS/NEW")
                    ? "primary.main"
                    : "text.secondary"
                }
                variant="h6"
                fontWeight="bold"
              >
                Add User
              </Typography>
            </StyledLink>
          </Grid>
        </Grid>

        <Grid item marginTop="auto">
          <PaddedView multiples={2}>
            <BorderButton
              onClick={() => {
                handleDrawerToggle();
                handleLogout();
              }}
            >
              Logout
            </BorderButton>
          </PaddedView>
        </Grid>
      </Drawer>
    </Box>
  );
}

export default MobileDrawerAppBar;
