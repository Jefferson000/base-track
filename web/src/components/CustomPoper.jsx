import { Popper } from "@mui/material";

const CustomPopper = (props) => {
  return (
    <Popper
      {...props}
      style={{ width: "fit-content", minWidth: "350px" }} // Adjust the width as needed
      placement="bottom-start"
    />
  );
};

export default CustomPopper;