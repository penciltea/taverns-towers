'use client'

import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Stack, DialogActions, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useUIStore } from "@/store/uiStore";
import { deleteSite } from '@/lib/actions/site.actions';
import DeleteButton from '@/components/Common/DeleteButton';
import { SiteDialogProps } from '@/interfaces/site.interface';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { TavernDetails } from './TavernDetails';
import { TempleDetails } from './TempleDetails';
import { ShopDetails } from './ShopDetails';
import { GuildDetails } from './GuildDetails';
import { GovernmentDetails } from './GovernmentDetails';
import { EntertainmentDetails } from './EntertainmentDetails';
import { HiddenDetails } from './HiddenDetails';
import { ResidenceDetails } from './ResidenceDetails';
import { MiscellaneousDetails } from './MiscellaneousDetails';
import { useSession } from 'next-auth/react';
import { canDelete, canEdit } from '@/lib/auth/authPermissions';

const SiteTypeComponents = {
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

const getSiteLabel = (type: string) => {
  const category = SITE_CATEGORIES.find(cat => cat.value === type);
  return category ? category.label : type;
};

export default function SiteDetailsDialog({ open, onClose, onDelete, settlementId, siteData }: SiteDialogProps) {
  const Component = (SiteTypeComponents as any)[siteData.type];
  const siteLabel = getSiteLabel(siteData.type);
  const { data: session } = useSession();
  const router = useRouter();
  const { showSnackbar, closeDialog } = useUIStore();

  const user = session?.user ? { id: session.user.id } : null;
  const { userId, editors } = siteData;
  
  const editable = canEdit(user, { userId, editors });
  const deletable = canDelete(user, { userId});

  const handleEdit = () => {
    const id = siteData._id;
    const slug = settlementId || 'wilderness';
    router.push(`/settlements/${slug}/sites/${id}`);
    closeDialog();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth 
        scroll="paper" 
        aria-labelledby="site-dialog-title" 
        aria-describedby="site-dialog-content" 
      >
        <DialogTitle id="site-dialog-title">
          {siteData.name} ({siteLabel})
        </DialogTitle>
        <DialogContent aria-live="polite" id="site-dialog-content">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
          >
            <Box component="section" sx={{px: 2}}>
              <Typography variant="h6" component="h1" sx={{ textDecoration: "underline" }}>Site Details</Typography>
              {Component ? (
                <Component site={siteData} />
              ) : (
                <Typography variant="body2" component="p">No details available for this site type.</Typography>
              )}
            </Box>
            <Box>
              {siteData.image && (
                <img
                  src={siteData.image}
                  alt={`Image for ${siteData.name}`}
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
            { editable && (
                <Button
                variant="outlined"
                sx={{ mx: 1 }}
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
            { deletable && (
              <DeleteButton
                id={siteData._id!}
                entity="site"
                deleteAction={deleteSite}
                onSuccess={() => {
                  if(!siteData._id){ return }
                  if (onDelete) {
                    onDelete(siteData._id);
                    showSnackbar('Site deleted successfully!', 'success');
                  }
                }}
              />
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
