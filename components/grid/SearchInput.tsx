import { TextField } from "@mui/material";
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
  }, [value]); // This will run whenever the value prop changes

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update the internal state but do not trigger the search yet
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(searchInput); // Trigger the search when "Enter" is pressed
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(searchInput); // Trigger the search when "Enter" is pressed (for mobile)
    }
  };

  return (
    <TextField
      label="Search by Name"
      value={searchInput}
      onChange={handleSearchChange}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      fullWidth
      margin="normal"
    />
  );
}
