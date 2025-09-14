import { Button } from "@mui/material";

const InfoButton = ({ onClick, label, disabled, fullWidth=true }) => {
  return (
    <Button
      disabled={disabled}
      color="secondary"
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        fontWeight: "bold",
        justifyContent: "center",
        padding: "6px 5px"
      }}
      onClick={onClick}
    >
      { label }
    </Button>
  );
};

export default InfoButton;