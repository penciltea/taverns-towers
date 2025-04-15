import { TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search..." }: SearchBarProps) => (
  <TextField
    fullWidth
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    size="small"
  />
);

export default SearchBar;
