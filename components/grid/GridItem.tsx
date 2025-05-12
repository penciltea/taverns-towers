'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography, Box, Chip, Paper } from '@mui/material';
import { GridItemProps } from '@/interfaces/gridProps';
import { optimizeCloudinaryImage } from '@/lib/util/optimizeCloudinaryImage';

export default function GridItem({ title, subtitle, link, image, onClick, tags = [] }: GridItemProps) {
  const router = useRouter();
  const filteredTags = tags.filter(tag => tag.trim() !== '');
  const visibleTags = filteredTags.slice(0, 3);
  const extraCount = filteredTags.length - visibleTags.length;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      router.push(link);
    }
  };

  const ariaLabel = [
    title,
    subtitle ? `${subtitle}` : null,
    filteredTags.length > 0 ? `tags: ${visibleTags.join(', ')}` : null,
    extraCount > 0 ? `and ${extraCount} more tag${extraCount > 1 ? 's' : ''}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Paper
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {image && (
        <Box sx={{ position: 'relative', height: 180, borderRadius: 2, overflow: 'hidden' }}>
          <Image
            src={optimizeCloudinaryImage(image)}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, 25vw"
          />
        </Box>
      )}
      <Typography variant="h6" component="p" mt={2}>{title}</Typography>
      {subtitle && <Typography variant="subtitle2" component="p">{subtitle}</Typography>}
      {tags.length > 0 && (
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {visibleTags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
          {extraCount > 0 && <Chip label={`+${extraCount}`} />}
        </Box>
      )}
    </Paper>
  );
}
