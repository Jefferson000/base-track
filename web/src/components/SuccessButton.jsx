import { Button } from "@mui/material";

const SuccessButton = ({ onClick, label, fullWith }) => {
  return (
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      fullWidth={fullWith}
      sx={{
        fontWeight: "bold"
      }}
      onClick={onClick}
    >
      { label }
    </Button>
  );
};

export default SuccessButton;