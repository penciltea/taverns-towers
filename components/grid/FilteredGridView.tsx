'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridContainer from './GridContainer';
import PaginationControls from '@/components/Common/Pagination';
import FabButton from '@/components/Common/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';

type FilteredGridViewProps<T extends CommonInterface> = {
  title: string;
  content: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  filterComponent: React.ReactNode;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize?: number;
  emptyText?: string;
  fabLabel?: string;
  fabLink?: string;
};

export default function FilteredGridView<T extends CommonInterface>({
  title,
  content,
  items,
  renderItem,
  filterComponent,
  currentPage,
  onPageChange,
  totalCount,
  pageSize = 30,
  emptyText = 'No items found.',
  fabLabel,
  fabLink,
}: FilteredGridViewProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h4">{title}</Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">Search & Filter</Typography>
        {filterComponent}
      </Box>

      {items.length > 0 ? (
        <>
          <Typography variant="subtitle1">
            {totalCount} {content}
          </Typography>

          <GridContainer>
            {items.map((item) => (
              <Grid key={item._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                {renderItem(item)}
              </Grid>
            ))}
          </GridContainer>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {emptyText}
        </Typography>
      )}

      {fabLabel && fabLink && <FabButton label={fabLabel} link={fabLink} />}
    </Paper>
  );
}