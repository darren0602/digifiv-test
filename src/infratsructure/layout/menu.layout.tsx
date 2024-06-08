import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/components/authSlice";
import { useSnackBar } from "../../components/snackbar.context";
import { Drawer } from "@mui/material";
import Spacer from "../../components/spacer.component";
import DrawerItems from "./drawer-items.component";
import { Toolbar } from "@mui/material";
import MobileDrawerAppBar from "./mobile-drawer-app-bar.component";

const FlexEndBox = styled(Box)({
  display: "flex",
  height: "100%",
  justifyContent: "flex-end",
  width: "100%",
  padding: "10px",
  paddingRight: "20px",
});

const CenterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

const FullWidthRowBox = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
});

const MaxWidthBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: theme.dimensions.PCMaxWidth,
  minHeight: theme.dimensions.heightWithoutAppBar,
  overflow: "auto",
}));

const AppBarContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.dimensions.PCMaxWidth,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "15px",
  justifyContent: "space-between",
}));

export default function CustomMenu() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const snackBar = useSnackBar();
  const [avatarMenu, setAvatarMenu] = useState<(EventTarget & Element) | null>(
    null
  );
  const handleOpenUserMenu = (event: SyntheticEvent) => {
    setAvatarMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAvatarMenu(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    snackBar.createSnackBar({
      message: "Logged Out",
      type: "success",
      open: true,
    });
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "bg.primary" }}
        elevation={isMobile ? 1 : 0}
      >
        {isMobile ? (
          <Toolbar disableGutters={!isMobile}>
            <AppBarContainer>
              <MobileDrawerAppBar handleLogout={handleLogout} />
            </AppBarContainer>
          </Toolbar>
        ) : (
          <FlexEndBox>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                sx={{
                  backgroundColor: "white",
                  width: "35px",
                  height: "35px",
                }}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={avatarMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  sx: {
                    width: "120px",
                  },
                },
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(avatarMenu)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                key={1}
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                <Typography
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ margin: "0 auto" }}
                >
                  Sign Out
                </Typography>
              </MenuItem>
            </Menu>
          </FlexEndBox>
        )}
      </AppBar>

      <CenterBox>
        <FullWidthRowBox>
          {!isMobile && (
            <Box>
              <Drawer
                variant="permanent"
                anchor="left"
                open={true}
                elevation={1}
                sx={{
                  width: "200px",
                  "& .MuiDrawer-paper": {
                    width: "200px",
                    backgroundColor: "white.main",
                  },
                }}
              >
                <Spacer size="xl" />
                <DrawerItems />
              </Drawer>
            </Box>
          )}

          {/* ====== Content Section ====== */}
          <CenterBox
            sx={{
              width: "100%",
              // backgroundColor: "bg.primary",
              marginTop: "40px",
            }}
          >
            <MaxWidthBox>
              <Outlet />
            </MaxWidthBox>
          </CenterBox>
        </FullWidthRowBox>
      </CenterBox>
    </>
  );
}
