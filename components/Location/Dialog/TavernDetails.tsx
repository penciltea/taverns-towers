import { TavernLocation } from '@/interfaces/location.interface';
import { Typography, Box } from '@mui/material';
import MenuList from './MenuList';

export const TavernDetails = ({ location }: { location: TavernLocation }) => {
  return (
    <>
      <Typography><strong>Size:</strong> {location.size || "N/A"}</Typography>
      <Typography><strong>Clientele:</strong> {location.clientele || "N/A"}</Typography>
      <Typography><strong>Entertainment:</strong> {location.entertainment || "N/A"}</Typography>
      <Typography><strong>Cost:</strong> {location.cost || "N/A"}</Typography>
 
      <MenuList menu={location.menu || []} label="Menu" />
    </>
  );
};