import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingContext } from "../global/LoadingContext";

const LoadingSpinner = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;