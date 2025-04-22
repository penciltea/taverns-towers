'use client';

import { useEffect } from 'react';
import { useTownContentStore } from '@/store/townStore';
import { Box, Typography } from '@mui/material';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import FabButton from '@/components/Common/fabButton';
import { Town } from '@/interfaces/town.interface';

export default function FilteredGridView({ initialTowns, title }: { initialTowns: Town[] }) {
  const { setItems, filteredItems } = useTownContentStore();

  useEffect(() => {
    setItems(initialTowns);
  }, [initialTowns, setItems]);

  
  return (
    <>
      <Typography variant="h4">{title}</Typography>

      <Box my={2}>
        <Typography variant="h6">Search & Filter</Typography>
        
      </Box>

      
        <GridContainer>
          {filteredItems.map((town) => (
            <GridItem
              key={town._id}
              title={town.name}
              subtitle={`Size: ${town.size || 'N/A'}`}
              image={town.map || '/placeholders/town.png'}
              tags={town.tags}
              link={`/towns/${town._id}`}
            />
        ))}
        </GridContainer>
      
    </>
  );
}
