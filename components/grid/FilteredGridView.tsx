'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import FabButton from '@/components/Common/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';

type FilteredGridViewProps<T extends CommonInterface> = {
  initialItems: T[];
  title: string;
  filterComponent: React.ReactNode;
  fields: Array<{
    link: string;
    title: string;
    subtitle: string;
    image: string;
    tags: string[];
  }>;
  emptyText?: string;
  fabLabel?: string;
  fabLink?: string;
};

export default function FilteredGridView<T extends CommonInterface>({
  initialItems,
  title,
  filterComponent,
  fields,
  emptyText = 'No items found.',
  fabLabel,
  fabLink,
}: FilteredGridViewProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [filteredItems, setFilteredItems] = useState<T[]>(initialItems);

  // Handle filtering logic if needed, e.g., search or other filters
  useEffect(() => {
    setItems(initialItems);
    setFilteredItems(initialItems);
  }, [initialItems]);

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Box my={2}>
        <Typography variant="h6">Search & Filter</Typography>
        {filterComponent}
      </Box>

      {filteredItems.length > 0 ? (
        <GridContainer>
          {filteredItems.map((item, index) => (
            <GridItem
              key={index}
              link={fields[index].link}  // Access the pre-calculated fields here
              title={fields[index].title}
              subtitle={fields[index].subtitle}
              image={fields[index].image}
              tags={fields[index].tags}
            />
          ))}
        </GridContainer>
      ) : (
        <Typography variant="body1">{emptyText}</Typography>
      )}

      {fabLabel && fabLink && <FabButton label={fabLabel} link={fabLink} />}
    </>
  );
}
