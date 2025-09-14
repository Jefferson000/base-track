// src/context/AlertContext.js
import React, { createContext, useState, useContext } from "react";
import { Alert, Snackbar, useTheme, Slide } from "@mui/material"; // Import Slide
import { tokens } from "../theme";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
  const theme = useTheme(); // Access the current theme
  const colors = tokens(theme.palette.mode); // Get color tokens based on the theme mode

  const showAlert = (message, severity = "info") => {
    setAlert({ open: true, message, severity });
  };

  const hideAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Determine the background color based on severity
  const getBackgroundColor = (severity) => {
    switch (severity) {
      case "success":
        return colors.greenAccent[500]; // Use greenAccent for success
      case "error":
        return colors.redAccent[500]; // Use redAccent for errors
      case "warning":
        return colors.redAccent[300]; // Use a lighter red for warnings
      case "info":
      default:
        return colors.blueAccent[500]; // Use blueAccent for info (or any default)
    }
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
        TransitionComponent={Slide} // Use Slide transition
        TransitionProps={{ direction: "left" }} // Slide in from the right
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: getBackgroundColor(alert.severity), // Dynamic background color
            color: colors.grey[100], // Use text color from tokens
            fontSize: "0.9rem", // Match your app's typography
            borderRadius: "4px", // Add some border radius
            boxShadow: theme.shadows[6], // Add a shadow for better visibility
          },
        }}
      >
        <Alert
          onClose={hideAlert}
          severity={alert.severity}
          sx={{
            width: "100%",
            backgroundColor: "transparent", // Make the Alert background transparent
            color: colors.grey[100], // Use text color from tokens
            "& .MuiAlert-icon": {
              color: colors.grey[100], // Icon color
            },
            "& .MuiAlert-message": {
              fontSize: "0.9rem", // Match your app's typography
            },
          }}
          icon={false} // Hide the default icon to avoid duplication
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);