'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import FabButton from '@/components/Common/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';
import { useTownContentStore } from '@/store/townStore';

type FilteredGridViewProps<T extends CommonInterface> = {
  initialItems: T[];
  title: string;
  filterComponent: React.ReactNode;
  fields: Array<{
    link: string;
    title: string;
    subtitle: string;
    image: string;
    tags: string[] | undefined;
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
  const { setItems, filteredItems } = useTownContentStore();

  // Set initial items when component mounts
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Box my={2}>
        <Typography variant="h6">Search & Filter</Typography>
        {filterComponent}
      </Box>

      {filteredItems.length > 0 ? (
        <GridContainer>
        {filteredItems.map((item) => {
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
      ) : (
        <Typography variant="body1">{emptyText}</Typography>
      )}

      {fabLabel && fabLink && <FabButton label={fabLabel} link={fabLink} />}
    </>
  );
}
