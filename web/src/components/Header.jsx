import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import SuccessButton from "./SuccessButton"; // Import the SuccessButton component

const Header = ({ title, subtitle, showCreateButton }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    console.log(`${window.location.pathname}/create`)
    navigate(`${window.location.pathname}/create`);
  };

  return (
    <Box mb="1vh">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </Box>
        {showCreateButton && (
          <Box 
            mt="20px"
          >
            <SuccessButton label="Crear" onClick={handleCreateClick} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;