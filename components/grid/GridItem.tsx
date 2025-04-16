'use client'
import { useRouter } from 'next/navigation';
import { Grid, Typography, Box, Chip } from '@mui/material';
import { GridItemProps } from '@/interfaces/gridProps';


export default function GridItem({ title, link, image, tags = [] }: GridItemProps) {
  const router = useRouter();
  const filteredTags = tags.filter(tag => tag.trim() !== '');
  const visibleTags = filteredTags.slice(0, 3);
  const extraCount = filteredTags.length - visibleTags.length;

  return (
    <Grid size={{xs: 12, sm: 6, md: 3}} sx={{ width: '100%' }} onClick={() => router.push(link)}>
      {image && (
        <Box
          sx={{
            height: 240,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
          }}
        />
      )}
      <Typography variant="h6" mt={1}>{title}</Typography>

      {tags.length > 0 && (
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {Array.isArray(visibleTags) &&
            visibleTags.map((tag: string) => (
              <Chip key={tag} label={tag} />
          ))}
          {extraCount > 0 && (
            <Chip label={`+${extraCount}`} size="small" />
          )}
        </Box>
      )}
    </Grid>
  );
};