import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Stack, DialogActions, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useUIStore } from "@/store/uiStore";
import { deleteSight } from '@/lib/actions/sight.actions';
import DeleteButton from '@/components/Common/DeleteButton';
import { SightDialogProps } from '@/interfaces/sight.interface';
import { LOCATION_CATEGORIES } from '@/constants/sightOptions';
import { TavernDetails } from './TavernDetails';
import { TempleDetails } from './TempleDetails';
import { ShopDetails } from './ShopDetails';
import { GuildDetails } from './GuildDetails';
import { GovernmentDetails } from './GovernmentDetails';
import { EntertainmentDetails } from './EntertainmentDetails';
import { HiddenDetails } from './HiddenDetails';
import { ResidenceDetails } from './ResidenceDetails';
import { MiscellaneousDetails } from './MiscellaneousDetails';

const SightTypeComponents = {
  tavern: TavernDetails,
  temple: TempleDetails,
  shop: ShopDetails,
  guild: GuildDetails,
  government: GovernmentDetails,
  entertainment: EntertainmentDetails,
  hidden: HiddenDetails,
  residence: ResidenceDetails,
  miscellaneous: MiscellaneousDetails
};

const getSightLabel = (type: string) => {
  const category = LOCATION_CATEGORIES.find(cat => cat.value === type);
  return category ? category.label : type;
};

export default function SightDetailsDialog({ open, onClose, onDelete, settlementId, sightData }: SightDialogProps) {
  const Component = (SightTypeComponents as any)[sightData.type];
  const sightLabel = getSightLabel(sightData.type);
  const router = useRouter();
  const { showSnackbar } = useUIStore();

  const handleEdit = () => {
    router.push(`/settlements/${settlementId}/sights/${sightData._id}`);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth 
        scroll="paper" 
        aria-labelledby="sight-dialog-title" 
        aria-describedby="sight-dialog-content" 
      >
        <DialogTitle id="sight-dialog-title">
          {sightData.name} ({sightLabel})
        </DialogTitle>
        <DialogContent aria-live="polite" id="sight-dialog-content">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
          >
            <Box component="section" sx={{px: 2}}>
              <Typography variant="h6" component="h1" sx={{ textDecoration: "underline" }}>Sight Details</Typography>
              {Component ? (
                <Component sight={sightData} />
              ) : (
                <Typography variant="body2" component="p">No details available for this sight type.</Typography>
              )}
            </Box>
            <Box>
              {sightData.image && (
                <img
                  src={sightData.image}
                  alt={`Image for ${sightData.name}`}
                  style={{
                    borderRadius: '16px',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    maxWidth: '20vw',
                  }}
                />
              )}
            </Box>
          </Stack>

          {/* Action buttons */}
          <DialogActions>
            <Button
              variant="outlined"
              sx={{ mx: 1 }}
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <DeleteButton
              id={sightData._id!}
              entity="sight"
              deleteAction={deleteSight}
              onSuccess={() => {
                if(!sightData._id){ return }
                if (onDelete) {
                  onDelete(sightData._id);
                  showSnackbar('Sight deleted successfully!', 'success');
                }
              }}
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
