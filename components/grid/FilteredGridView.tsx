'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import FabButton from '@/components/Common/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';
import { useTownContentStore } from '@/store/townStore';
import PaginationControls from '@/components/Common/Pagination';

type FilteredGridViewProps<T extends CommonInterface> = {
  initialItems: T[];
  title: string;
  content: string;
  filterComponent: React.ReactNode;
  fields: Array<{
    link: string;
    title: string;
    subtitle: string;
    image: string;
    tags: string[] | undefined;
  }>;
  pageSize?: number;
  emptyText?: string;
  fabLabel?: string;
  fabLink?: string;
};

export default function FilteredGridView<T extends CommonInterface>({
  initialItems,
  title,
  content,
  filterComponent,
  fields,
  emptyText = 'No items found.',
  fabLabel,
  fabLink,
  pageSize = 5,
}: FilteredGridViewProps<T>) {

  const { setItems, filteredItems } = useTownContentStore();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  // Set initial items when component mounts
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  // Slice the items to show only the items for the current page
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        //backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Box sx={{my: 3}}>
        <Typography variant="h6">Search & Filter</Typography>
        {filterComponent}
        
      </Box>
      {displayedItems.length > 0 ? (
        <>
          <Typography variant="subtitle1">{displayedItems.length} {content} </Typography>
          <GridContainer>
          {displayedItems.map((item) => {
            const field = fields.find((f) => f.link.includes(item._id));
            if (!field) return null; // skip if no matching field
        
            return (
              <GridItem
                key={item._id}
                link={field.link}
                title={field.title}
                subtitle={field.subtitle}
                image={field.image}
                tags={field.tags}
              />
              );
          })}
          </GridContainer>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <Typography variant="body1" sx={{textAlign: "center"}}>{emptyText}</Typography>
      )}

      {fabLabel && fabLink && <FabButton label={fabLabel} link={fabLink} />}
    </Paper>
  );
}
