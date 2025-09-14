import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetMutation, useValidateQuery } from "../../services/authService";
import { Box, TextField, Button, Typography, Paper, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import baseTrack from "../../assets/base-track-logo-large.png";
import { useAlert } from "../../global/AlertContext";
import LoadingComponent from "../../components/LoadingComponent";

const Reset = () => {
  const navigate = useNavigate();
  const [reset] = useResetMutation();
  const showAlert = useAlert();
  
  const { token } = useParams();
  const { data: validateToken, isLoading, error } = useValidateQuery(token);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [credentials, setCredentials] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await reset({ password: credentials.password, token}).unwrap(); // Call the reset API
      showAlert("Cambio de Contraseña Exitoso", "success");
      navigate("/login"); // Redirect to the main page
    } catch (error) {
      showAlert(error.data?.message || "Cambio de Contraseña Fallido - Contacte Soporte", "error");
    }
  };


  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    navigate("/not-found");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.primary[900]} 30%, ${colors.primary[800]} 55%)`,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          overflow: "hidden",
        }}
      >
        {/* Header Section with Logo */}
        <Box
          sx={{
            backgroundColor: colors.primary[500],
            padding: 4,
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={baseTrack}
            alt="BaseTrack"
            sx={{
              width: 150,
              height: "auto",
            }}
          />
          <Typography
            variant="body1"
            sx={{ color: colors.grey[300], mt: 1 }}
          >
            Guarda tus datos y administralos eficientemente.
          </Typography>
        </Box>

        {/* Reset Form Section */}
        <Box
          sx={{
            padding: 4,
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: colors.grey[100] }}
          >
            Cambiar Contraseña
          </Typography>
          <form onSubmit={handleReset}>
            <TextField
              fullWidth
              label="Nueva Contraseña"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              value={credentials.confirmPassword}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.primary[800],
                "&:hover": { backgroundColor: colors.primary[600] },
                color: colors.grey[100],
              }}
            >
              Cambiar
            </Button>
          </form>

          {/* Footer */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: colors.grey[300] }}
          >
            © {new Date().getFullYear()} BaseTrack. Todos los derechos reservados.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Reset;