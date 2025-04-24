import { TavernLocation } from '@/interfaces/location.interface';
import { Typography, Box } from '@mui/material';

export const TavernDetails = ({ location }: { location: TavernLocation }) => {
  return (
    <>
      <Typography><strong>Size:</strong> {location.size || "N/A"}</Typography>
      <Typography><strong>Clientele:</strong> {location.clientele || "N/A"}</Typography>
      <Typography><strong>Entertainment:</strong> {location.entertainment || "N/A"}</Typography>
      <Typography><strong>Cost:</strong> {location.cost || "N/A"}</Typography>

      {location.menu && location.menu?.length > 0 && (
        <Box mt={1}>
          <Typography><strong>Menu:</strong></Typography>
          <ul>
            {location.menu.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong><br />
                <em>{item.description}</em><br />
                <strong>Price:</strong> {item.price ? `${item.price}` : "N/A"}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
};