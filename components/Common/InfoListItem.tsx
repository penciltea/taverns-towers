import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

type InfoListItemProps = {
  label: string;
  value?: string | number;
};

export default function InfoListItem({ label, value }: InfoListItemProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} component="dl" sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
      <Typography component="dt" fontWeight="bold" minWidth={200}>
        {label}
      </Typography>
      <Typography component="dd" margin={0}>
        {value || "N/A"}
      </Typography>
    </Stack>
  );
}
