import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/authSlice"; // Import the logout thunk
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/authService";
import { useAlert } from "../../global/AlertContext";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleColorModeToggle = () => {
    colorMode.toggleColorMode();
  };
  const [logoutApi] = useLogoutMutation(); // Initialize the logout mutation


  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      showAlert("Error al cerrar sesión", "error");
    }
  };

  return (
    <Box display="flex" justifyContent="right" paddingRight={2} paddingTop={2} >
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={handleColorModeToggle}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;