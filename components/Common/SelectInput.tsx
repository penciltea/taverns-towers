import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useId } from "react";

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectInput = ({ label, value, onChange, options, placeholder }: SelectInputProps) => {
  const id = useId();

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${id}-label`} shrink>{label}</InputLabel> {/* Always shrink the label */}
      <Select 
        value={value || ""} 
        onChange={onChange} 
        label={label}
        labelId={`${id}-label`}
        id={`${id}-select`}
      >
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
