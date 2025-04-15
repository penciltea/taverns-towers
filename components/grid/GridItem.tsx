'use client'
import { useRouter } from 'next/navigation';
import { Grid, Typography, Box, Chip } from '@mui/material';
import { GridItemProps } from '@/interfaces/gridProps';


export default function GridItem({ title, link, image, tags = [] }: GridItemProps) {
  const router = useRouter();
  const visibleTags = tags.slice(0, 3);
  const extraCount = tags.length - visibleTags.length;

  return (
    <Grid size={{xs: 12, sm: 6, md: 3}} sx={{ width: '100%' }} onClick={() => router.push(link)}>
      {image && (
        <Box sx={{ height: 240, backgroundImage: `url(${image})`, backgroundSize: 'cover' }} />
      )}
        <Typography variant="h6">{title}</Typography>
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {visibleTags.map((tag, idx) => (
            <Chip key={idx} label={tag} size="small" />
          ))}
          {extraCount > 0 && (
            <Chip label={`+${extraCount}`} size="small" />
          )}
        </Box>
    </Grid>
  );
};