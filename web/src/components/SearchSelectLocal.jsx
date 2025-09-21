import React, { useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const normalize = (s = "") =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const SearchSelectLocal = ({
  label,
  options = [],
  value = null,
  onChange,
  error,
  helperText,
  placeholder,
  disabled,
  isOptionEqualToValue = (a, b) => String(a?.value) === String(b?.value),
  noOptionsText = "No se encontraron opciones",
  maxOptions = 8,
}) => {
  const [inputValue, setInputValue] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(inputValue);
    if (!q) return options;
    return options.filter((o) => normalize(o.label).includes(q));
  }, [inputValue, options]);

  const visible = useMemo(
    () => filtered.slice(0, maxOptions),
    [filtered, maxOptions]
  );

  return (
    <Autocomplete
      options={visible}
      value={value}
      onChange={(_, newValue) => onChange?.(newValue || null)}
      inputValue={inputValue}
      onInputChange={(_, newInput) => setInputValue(newInput)}
      getOptionLabel={(option) => option?.label ?? ""}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled}
      noOptionsText={noOptionsText}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          placeholder={placeholder}
          error={!!error}
          helperText={error ? helperText : undefined}
        />
      )}
    />
  );
};

export default SearchSelectLocal;
