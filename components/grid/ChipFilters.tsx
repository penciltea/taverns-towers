import { Box, Button, Chip, Typography } from "@mui/material";

type ChipOption = {
  label: string;
  value: string;
};

type ChipFiltersProps = {
  title?: string;
  options: ChipOption[];
  selected: string[];
  onChange: (updated: string[]) => void;
  allowClearAll?: boolean;
};

export default function ChipFilters({
  title,
  options,
  selected,
  onChange,
  allowClearAll = true,
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

      {allowClearAll && selected.length > 0 && (
        <Button
          variant="text"
          size="small"
          onClick={() => onChange([])}
          sx={{ mt: 1 }}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
}
