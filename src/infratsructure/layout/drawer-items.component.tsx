import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  List,
  ListItem,
  Typography,
  styled,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const StyledListItem = styled(ListItem)({
  ":hover": { backgroundColor: "transparent" },
  cursor: "pointer",
});

const AccordionDetailsWithoutPadding = styled(AccordionDetails)(
  ({ theme }) => ({
    padding: "0px",
    paddingLeft: theme.spacing(4),
  })
);

function DrawerItems() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <List sx={{ paddingBottom: "50px", paddingTop: "25px" }}>
      <Grid container columnSpacing={2} display="block">
        <Grid item xs={12}>
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                color={
                  location.pathname.toUpperCase().includes("USERS")
                    ? "primary.main"
                    : "text.secondary"
                }
                variant="h6"
                fontWeight="bold"
              >
                User
              </Typography>
            </AccordionSummary>

            <AccordionDetailsWithoutPadding>
              <StyledListItem
                onClick={() => {
                  navigate("/users/list");
                }}
              >
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
              </StyledListItem>
              <StyledListItem
                onClick={() => {
                  navigate("/users/new");
                }}
              >
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
              </StyledListItem>
            </AccordionDetailsWithoutPadding>
          </Accordion>
        </Grid>
      </Grid>
    </List>
  );
}

export default DrawerItems;
