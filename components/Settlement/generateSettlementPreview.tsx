import { Box, Typography, Chip } from '@mui/material';
import { Settlement } from '@/interfaces/settlement.interface';

type settlementProps = {
    settlement: Settlement
}

export default function GenerateSettlementPreview({settlement}: settlementProps){
    return(
        <Box>
            <Typography variant="h5" component="p">{settlement.name}</Typography>
            <Typography variant="body1"><strong>Size:</strong> {settlement.size}</Typography>
            <Typography variant="body1"><strong>Terrain:</strong> {settlement.terrain && settlement.terrain.join(', ')}</Typography>
            <Typography variant="body1"><strong>Tags:</strong></Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {settlement.tags && settlement.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" />
                ))}
            </Box>
            <Typography variant="body1"><strong>Climate:</strong> {settlement.climate}</Typography>
            <Typography variant="body1"><strong>Wealth:</strong> {settlement.wealth}</Typography>
            <Typography variant="body1"><strong>Ruling Style:</strong> {settlement.rulingStyle}</Typography>
            <Typography variant="body1"><strong>Magic Use/Level:</strong> {settlement.magic}</Typography>
            <Typography variant="body1"><strong>Criminal Activity:</strong> {settlement.crime && settlement.crime.join(', ')}</Typography>
        </Box>
    )
}