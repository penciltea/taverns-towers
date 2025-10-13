'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Grid, Stack, Typography, Paper } from "@mui/material";

interface EntityViewLayoutProps {
  title: string;
  actions?: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode;
  extraContent?: React.ReactNode;
  connections?: React.ReactNode;
  fab?: React.ReactNode;
}

// Lazy-wrappers for below-the-fold content
const LazyExtraContent = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>), { ssr: false });
const LazyConnections = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>), { ssr: false });


export default function EntityViewLayout({
  title,
  actions,
  leftContent,
  rightContent,
  extraContent,
  connections,
  fab,
}: EntityViewLayoutProps) {
  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" component="h1">{title}</Typography>
        {actions}
      </Stack>

      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
            {leftContent}
          </Paper>
        </Grid>

        {rightContent && (
          <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
              {rightContent}
            </Paper>
          </Grid>
        )}

        {extraContent && (
          <Grid size={{ xs: 12 }}>
            <Suspense fallback={<div>Loading extra content...</div>}>
              <LazyExtraContent>{extraContent}</LazyExtraContent>
            </Suspense>
          </Grid>
        )}

        {connections && (
          <Grid size={{ xs: 12 }}>
            <Suspense fallback={<div>Loading connections...</div>}>
              <LazyConnections>{connections}</LazyConnections>
            </Suspense>
          </Grid>
        )}
      </Grid>

      {fab}
    </>
  );
}
