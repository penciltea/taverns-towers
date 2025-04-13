import { Grid, Typography } from "@mui/material";

interface LocationCardProps {
  image: string;
  name: string;
  tags: string[];
}

export default function LocationCard({ image, name, tags }: LocationCardProps) {
  return (
    <Grid size={{xs: 12, sm: 6, md: 3}} sx={{ justifyItems: "center" }}>
      <img src={image} alt={name} width="100%" />
      <Typography variant="body1">{name}</Typography>
      <Typography variant="body2">
        {tags.join(", ")}
      </Typography>
    </Grid>
  );
}
