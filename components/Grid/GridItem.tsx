'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography, Box, Chip, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { GridItemProps } from '@/interfaces/gridProps';
import { optimizeCloudinaryImage } from '@/lib/util/optimizeCloudinaryImage';

export default function GridItem({
  title,
  subtitle,
  link,
  image,
  onClick,
  tags = [],
  tone = [],
  genre = [],
}: GridItemProps) {
  const router = useRouter();
  const filteredTags = tags.filter((tag) => tag.trim() !== '');
  const visibleTags = filteredTags.slice(0, 3);
  const extraCount = filteredTags.length - visibleTags.length;

  const filteredTones = tone.filter((tone) => tone.trim() !== '');
  const visibleTones = filteredTones.slice(0, 3);
  const extraToneCount = filteredTones.length - visibleTones.length;

  const filteredGenres = genre.filter((genre) => genre.trim() !== '');
  const visibleGenres = filteredGenres.slice(0, 3);
  const extraGenreCount = filteredGenres.length - visibleGenres.length;

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
    filteredTones.length > 0 ? `tone: ${visibleTones.join(', ')}` : null,
    extraToneCount > 0
      ? `and ${extraToneCount} more tone${extraToneCount > 1 ? 's' : ''}`
      : null,
    extraGenreCount > 0
      ? `and ${extraGenreCount} more tone${extraGenreCount > 1 ? 's' : ''}`
      : null,
    filteredTags.length > 0 ? `tags: ${visibleTags.join(', ')}` : null,
      filteredTags.length > 0 ? `tags: ${visibleTags.join(', ')}` : null,
      extraCount > 0
        ? `and ${extraCount} more tag${extraCount > 1 ? 's' : ''}`
        : null,
    ]
    .filter(Boolean)
    .join(', ');

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[4],
      })}
    >
      <CardActionArea
        onClick={handleClick}
        aria-label={ariaLabel}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
      >
        {image && (
          <CardMedia sx={{ position: 'relative', height: 180 }}>
            <Image
              src={optimizeCloudinaryImage(image)}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 100vw, 25vw"
            />
          </CardMedia>
        )}

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="p">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle2" component="p">
              {subtitle}
            </Typography>
          )}
          {tags.length > 0 && (
            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              {visibleTags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
              {extraCount > 0 && <Chip label={`+${extraCount}`} size="small" />}
            </Box>
          )}
          {tone.length > 0 && (
            <>
              <Typography variant="subtitle2" component="p">Tone(s):</Typography>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                {visibleTones.map((tone) => (
                  <Chip key={tone} label={tone} size="small" />
                ))}
                {extraToneCount > 0 && <Chip label={`+${extraToneCount}`} size="small" />}
              </Box>
            </>
          )}
          {genre.length > 0 && (
            <>
              <Typography variant="subtitle2" component="p">Genre(s):</Typography>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              {visibleGenres.map((genre) => (
                <Chip key={genre} label={genre} size="small" />
              ))}
              {extraGenreCount > 0 && <Chip label={`+${extraGenreCount}`} size="small" />}
            </Box>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
