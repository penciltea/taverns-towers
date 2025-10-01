import { Typography, Divider, List, ListItem, ListItemText, Paper } from "@mui/material";

export interface Release {
  title: string;
  date: string;
  features: string[];
  bugFixes?: string[];
  improvements?: string[];
  knownIssues?: string[];
}

interface ReleaseNotesProps {
  release: Release;
}

export default function ReleaseNotes({ release }: ReleaseNotesProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>{ release.title }</Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>{ release.date }</Typography>
      <Divider sx={{ my: 2 }} />

      {/* Features Section */}
      <Typography variant="h6" gutterBottom>Features</Typography>
      <List dense>
        {release.features.map((feat, i) => (
          <ListItem key={i}>
            <ListItemText primary={feat} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      {/* Bug Fixes Section */}
      {release.bugFixes && release.bugFixes.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Bug Fixes</Typography>
          <List dense>
            {release.bugFixes.map((bug, i) => (
              <ListItem key={i}>
                <ListItemText primary={bug} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Improvements Section */}
      {release.improvements && release.improvements.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Improvements</Typography>
          <List dense>
            {release.improvements.map((imp, i) => (
              <ListItem key={i}>
                <ListItemText primary={imp} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Known Issues Section */}
      {release.knownIssues && release.knownIssues.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Known Issues</Typography>
          <List dense>
            {release.knownIssues.map((issue, i) => (
              <ListItem key={i}>
                <ListItemText primary={issue} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
}
