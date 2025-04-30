import { useState } from "react";
import { TextField } from "@mui/material";

export default function Searchbar({ onSearch }: {
  onSearch: (name: string) => void;
}) {
  const [searchInput, setSearchInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchInput.trim());
    }
  };

  return (
    <TextField
      label="Search by name"
      size="small"
      variant="outlined"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={handleKeyDown}
      sx={{
        width: {
          xs: '100%', // full width on extra-small screens (mobile)
          md: '400px', // fixed width on small and up
        },
      }}
    />
  );
}
