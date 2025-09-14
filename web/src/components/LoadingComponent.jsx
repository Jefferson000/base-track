import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { tokens } from "../theme";

const LoadingComponent = () => {
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
      {/* Loading Spinner */}
      <Box mb="20px">
        <CircularProgress color="secondary" size={60} />
      </Box>

      {/* Loading Message */}
      <Typography variant="h3" color={colors.greenAccent[500]} gutterBottom>
        Cargando...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;