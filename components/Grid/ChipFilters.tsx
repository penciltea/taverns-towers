import { Box, Chip, Typography } from "@mui/material";
import { ContentFilters } from "@/store/contentStore";


type ChipOption = {
  label: string;
  value: string;
};

export interface ChipFilterConfig {
  title?: string;
  key: keyof ContentFilters;
  options: ChipOption[];
}

type ChipFiltersProps = {
  title?: string;
  options: ChipOption[];
  selected: string[];
  onChange: (updated: string[]) => void;
};

export function ChipFilters({
  title,
  options,
  selected,
  onChange,
}: ChipFiltersProps) {
  const handleToggle = (value: string) => {
    const isSelected = selected.includes(value);
    const updated = isSelected
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  return (
    <Box sx={{ my: 2 }}>
      {title && <Typography variant="h6">{title}</Typography>}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 1 }}>
        {options.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            variant={selected.includes(opt.value) ? "filled" : "outlined"}
            color={selected.includes(opt.value) ? "primary" : "default"}
            onClick={() => handleToggle(opt.value)}
            sx={{
              cursor: "pointer",
              padding: { xs: "10px 16px", sm: "12px 18px" },
              fontSize: { xs: "0.75rem", sm: "1rem" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
