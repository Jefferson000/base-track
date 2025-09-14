import React from "react";
import { Box, Typography } from "@mui/material";
import error from "../assets/error.png"; // Adjust the path to your logo
import { tokens } from "../theme";

const ErrorComponent = () => {
  const colors = tokens((theme) => theme.palette.mode); // Use your theme if needed

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      textAlign="center"
    >
      {/* Logo */}
      <Box mb="20px">
        <img src={error} alt="Error" style={{ width: "20%", height: "auto" }} />
      </Box>

      {/* Error Message */}
      <Typography variant="h3" color={colors.redAccent[600]} gutterBottom>
        Oops! Algo salió mal cargando los datos.
      </Typography>
    </Box>
  );
};

export default ErrorComponent;