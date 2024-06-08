import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackBar } from "../../../components/snackbar.context";
import Spacer from "../../../components/spacer.component";
import { RootState } from "../../../store";
import UserListTableRow from "../components/user-list-table-row.component";
import FormSearchBar from "../../../components/forms/form-search-bar.component";
import Form from "../../../components/forms/form.component";

const validationSchema = Yup.object().shape({
  q: Yup.string().nullable(),
});

const StyledHeaderCell = styled(TableCell)({
  textAlign: "center",
});

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: "20px 50px",
  backgroundColor: theme.palette.bg.secondary,
  borderRadius: theme.shape.borderSizes[1],
  alignItems: "center",
}));

const FormContainerMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "10px",
  backgroundColor: theme.palette.bg.secondary,
  borderRadius: theme.shape.borderSizes[1],
  alignItems: "center",
}));

const TableEmptyBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  height: "100px",
  alignItems: "center",
});

export default function UserListScreen() {
  const theme = useTheme();
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();
  const snackBar = useSnackBar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [q, setQ] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(q.toLowerCase()) ||
      user.email.toLowerCase().includes(q.toLowerCase())
  );

  const onChangeSearch = (keyword: string) => {
    setPage(0);
    setQ(keyword);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          User List
        </Typography>

        <Spacer size="xl" />
        <Form
          initialValues={{
            q: "",
          }}
          onSubmit={onChangeSearch}
          validationSchema={validationSchema}
        >
          {isMobile ? (
            <FormContainerMobile>
              <FormSearchBar
                placeholder="Search by user name or email"
                name="q"
                searchKeyword={q}
                setSearchKeyword={onChangeSearch}
                isWhiteBg
              />
            </FormContainerMobile>
          ) : (
            <FormContainer>
              <Typography variant="h6" fontWeight="bold">
                Search
              </Typography>
              <Spacer position="right" />
              <FormSearchBar
                placeholder="Search by user name or email"
                name="q"
                searchKeyword={q}
                setSearchKeyword={onChangeSearch}
                isWhiteBg
              />
            </FormContainer>
          )}
        </Form>

        <Spacer size="xl" />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledHeaderCell>
                  <Typography variant="h6" fontWeight="bold">
                    ID
                  </Typography>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Typography variant="h6" fontWeight="bold">
                    Name
                  </Typography>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Typography variant="h6" fontWeight="bold">
                    Email
                  </Typography>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <Typography variant="h6" fontWeight="bold">
                    Actions
                  </Typography>
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length !== 0 ? (
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => <UserListTableRow key={user.id} user={user} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <TableEmptyBox>
                      <Typography fontWeight="bold">No users</Typography>
                    </TableEmptyBox>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
}
