'use client';

import { Box, Typography, TypographyProps, Paper, Grid } from '@mui/material';
import GridContainer from './GridContainer';
import PaginationControls from '@/components/Common/Pagination';
import FabButton from '@/components/Common/Button/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';

type FilteredGridViewProps<T extends CommonInterface> = {
  title: string;
  titleVariant: TypographyProps["variant"];
  titleComponent: NonNullable<TypographyProps["component"]>;
  description?: string;
  content: string;
  countVariant: TypographyProps["variant"];
  countComponent: NonNullable<TypographyProps["component"]>;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  searchVariant: TypographyProps["variant"];
  searchComponent: NonNullable<TypographyProps["component"]>;
  filterComponent: React.ReactNode;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize?: number;
  emptyText?: string;
  fabLabel?: string;
  fabLink?: string;
  fabOnClick?: () => void;
  fabPermissions?: boolean;
};

export default function FilteredGridView<T extends CommonInterface>({
  title,
  titleVariant,
  titleComponent,
  description,
  content,
  countVariant,
  countComponent,
  items,
  renderItem,
  searchVariant,
  searchComponent,
  filterComponent,
  currentPage,
  onPageChange,
  totalCount,
  pageSize = 12,
  emptyText = 'No items found.',
  fabLabel,
  fabLink,
  fabOnClick,
  fabPermissions
}: FilteredGridViewProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant={titleVariant} component={titleComponent} gutterBottom>{title}</Typography>

      <Typography>{ description }</Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant={searchVariant} component={searchComponent}>Search & Filter</Typography>
        {filterComponent}
      </Box>

      {items.length > 0 ? (
        <>
          <Typography variant={countVariant} component={countComponent}>
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

      {fabLabel && (fabLink || fabOnClick) && fabPermissions && (
        <FabButton label={fabLabel} link={fabLink} onClick={fabOnClick} />
      )}
    </Paper>
  );
}