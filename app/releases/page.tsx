'use client'

import Link from "next/link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper
        elevation={3}
        sx={{ width: { xs: "90%", sm: 400, md: 500, lg: 600 }, maxWidth: "100%", p: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Release Notes
        </Typography>
        <List>
          {releaseKeys.map((key) => {
            const release = (releases as ReleasesMap)[key];
            return (
              <ListItem key={key} disablePadding>
                <ListItemButton component={Link} href={`/releases/${release.date}`}>
                  { release.title }
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding>
            <ListItemButton component={Link} href={'/releases/alpha-25-09-03'}>
              Version 0.1.0-alpha (Initial Alpha Release)
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
