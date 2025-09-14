import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Autocomplete, TextField, FormControl } from "@mui/material";
import CustomPopper from "./CustomPoper";

const SearchSelect = ({
  label,
  options,
  value,
  onChange,
  onInputChange,
  isLoading,
  error,
  helperText,
  getOptionLabel,
  noOptionsText,
  isOutlined,
  isSmall,
  moreWidth
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search term

  // Notify parent component when debounced search term changes
  React.useEffect(() => {
    onInputChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onInputChange]);

  return (
    <FormControl fullWidth variant={isOutlined ? "outlined" : "filled"}>
      <Autocomplete
        options={options || []}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue); // Notify parent of the selected value
          setSearchTerm(""); // Clear the search term when an option is selected
        }}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue); // Update search term as the user types
        }}
        inputValue={searchTerm} // Controlled input value
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size={isSmall ? "small" : "medium"}
            variant={isOutlined ? "outlined" : "filled"}
            error={!!error}
            helperText={helperText}
          />
        )}
        slots={{ popper: CustomPopper }} 
        loading={isLoading}
        loadingText="Cargando..."
        noOptionsText={noOptionsText || "No se encontraron opciones"}
      />
    </FormControl>
  );
};

export default SearchSelect;