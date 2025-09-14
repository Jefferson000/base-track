import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchFilter = ({ onSearchChange, label }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <Box>
      <TextField
        label={label}
        name="search"
        value={searchTerm}
        variant="outlined"
        size="small"
        fullWidth
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm && (
                <IconButton
                  onClick={() => setSearchTerm("")}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchFilter;