import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import BackgroundButton from "../../../components/button/background-button.component";
import BorderButton from "../../../components/button/border-button.component";
import ConfirmationModal from "../../../components/confirmation-modal.component";
import { useSnackBar } from "../../../components/snackbar.context";
import Spacer from "../../../components/spacer.component";
import { UserProps, UserUpdateFormValues } from "../type/type";
import EditUserModal from "./edit-user-modal.component";
import { removeUser, updateUser } from "./userSlice";

const StyledHeaderCell = styled(TableCell)({
  textAlign: "center",
});

export default function UserListTableRow({ user }: UserProps) {
  const theme = useTheme();
  const snackBar = useSnackBar();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenMenu = (event: any) => {
    setShowMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setShowMenu(null);
  };

  const handleDelete = () => {
    dispatch(removeUser(user.id));
    snackBar.createSnackBar({
      message: "Successfully Deleted",
      type: "success",
      open: true,
    });
    setShowDeleteModal(false);
  };

  const onHandleUpdate = (values: UserUpdateFormValues) => {
    dispatch(
      updateUser({
        ...user,
        name: values.name,
        email: values.email,
      })
    );
    snackBar.createSnackBar({
      message: "Successfully Updated",
      type: "success",
      open: true,
    });
    setShowEditModal(false);
  };

  return (
    <>
      <EditUserModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        onUpdateUser={onHandleUpdate}
        title="Update User"
        item={user}
      />
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you wish to remove ${user.name}?`}
      />
      <TableRow key={user.id}>
        <StyledHeaderCell>{user.id}</StyledHeaderCell>
        <StyledHeaderCell>{user.name}</StyledHeaderCell>
        <StyledHeaderCell>{user.email}</StyledHeaderCell>
        <StyledHeaderCell>
          {isMobile ? (
            <>
              <IconButton onClick={handleOpenMenu}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                sx={{ marginTop: theme.spacing(4) }}
                id="menu-appbar"
                anchorEl={showMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(showMenu)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  key={1}
                  onClick={() => {
                    setShowEditModal(true);
                    handleCloseMenu();
                  }}
                >
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>

                <MenuItem
                  key={2}
                  onClick={() => {
                    setShowDeleteModal(true);
                    handleCloseMenu();
                  }}
                >
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <BackgroundButton
                onClick={() => {
                  setShowEditModal(true);
                }}
                width="30%"
              >
                Edit
              </BackgroundButton>
              <Spacer position="right" />
              <BorderButton
                onClick={() => setShowDeleteModal(true)}
                width="30%"
              >
                Delete
              </BorderButton>
            </Box>
          )}
        </StyledHeaderCell>
      </TableRow>
    </>
  );
}
