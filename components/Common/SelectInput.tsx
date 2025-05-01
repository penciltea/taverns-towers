import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectInput = ({ label, value, onChange, options, placeholder }: SelectInputProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel shrink>{label}</InputLabel> {/* Always shrink the label */}
      <Select value={value || ""} onChange={onChange} label={label}>
        {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
