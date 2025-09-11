import Link from "next/link";
import { Box, Typography, List, ListItem, ListItemButton } from "@mui/material";
import * as releases from "@/components/Release/content";

// Define type for a single release
interface Release {
  date: string;
  title: string;
  // add other fields if needed
}

// Define type for the releases map
type ReleasesMap = Record<string, Release>;

export default function ReleasesIndexPage() {
  // Get all release keys and sort them descending (latest first)
  const releaseKeys = Object.keys(releases).sort((a, b) => (a < b ? 1 : -1));

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Release Notes
      </Typography>
      <List>
        {releaseKeys.map((key) => {
          const release = (releases as ReleasesMap)[key];
          return (
            <ListItem key={key} disablePadding>
              <ListItemButton component={Link} href={`/releases/${release.date}`}>
                {release.date} — {release.title}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
