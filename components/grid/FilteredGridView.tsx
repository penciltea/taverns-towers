'use client';

import { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import FabButton from '@/components/Common/fabButton';
import { CommonInterface } from '@/interfaces/common.interface';
import { useTownContentStore } from '@/store/townStore';

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
}: FilteredGridViewProps<T>) {

  const { setItems, filteredItems } = useTownContentStore();
  const theme = useTheme();

  // Set initial items when component mounts
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

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
      <Box sx={{my: 2}}>
        <Typography variant="h6">Search & Filter</Typography>
        {filterComponent}
        
      </Box>
      {filteredItems.length > 0 ? (
        <>
          <Typography variant="subtitle1">{filteredItems.length} {content} </Typography>
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
        </>
      ) : (
        <Typography variant="body1" sx={{textAlign: "center"}}>{emptyText}</Typography>
      )}

      {fabLabel && fabLink && <FabButton label={fabLabel} link={fabLink} />}
    </Paper>
  );
}
