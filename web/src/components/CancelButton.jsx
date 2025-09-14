import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme"; // Adjust the import path as necessary

const CancelButton = ({ onClick, label, fullWith }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="contained"
      fullWidth={fullWith}
      color="secondary"
      sx={{
        fontWeight: "bold",
        backgroundColor: colors.redAccent[500], // Use the red accent color for the background
        '&:hover': {
          backgroundColor: colors.redAccent[600], // Darken the background color on hover
        },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CancelButton;