import React from 'react';
import { Grid } from '@mui/material';
import { GridContainerProps } from '@/interfaces/gridProps';

export default function GridContainer({ children }: GridContainerProps) {
  return (
    <Grid container spacing={4} padding={2} sx={{cursor: 'pointer'}}>
      {children}
    </Grid>
  )
}