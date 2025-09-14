import React from "react";
import { Box, Typography } from "@mui/material";
import error from "../../assets/404.png"; // Adjust the path to your logo
import { tokens } from "../../theme";

const NotFound = () => {
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
        404 - Página No Encontrada
      </Typography>

      {/* Additional Message */}
      <Typography variant="h5" color={colors.redAccent[600]}>
        La página que buscas no ha sido encontrada.
      </Typography>
    </Box>
  );
};

export default NotFound;