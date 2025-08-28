import { TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onSearchChange: (value: string) => void;
  clearSearch: () => void;
}

export default function SearchInput({ value, onSearchChange, clearSearch }: SearchInputProps) {
  const [searchInput, setSearchInput] = useState(value);

  // Sync internal state with the value prop
  useEffect(() => {
    setSearchInput(value);
  }, [value]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(searchInput);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(searchInput);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    clearSearch();
  };

  return (
    <TextField
      slotProps={{ inputLabel: { shrink: true } }}
      label="Search by Name"
      value={searchInput}
      onChange={handleSearchChange}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: searchInput ? (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}