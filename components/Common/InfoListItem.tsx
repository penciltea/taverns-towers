import { Box, Typography } from "@mui/material";

type InfoListItemProps = {
  label: string;
  value?: string | number;
};

export default function InfoListItem({ label, value }: InfoListItemProps) {
  return (
    <Box component="div" sx={{ display: 'flex', gap: 1, mb: 1 }}>
      <Typography component="dt" fontWeight="bold" minWidth={200}>
        {label}
      </Typography>
      <Typography component="dd" margin={0}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}
