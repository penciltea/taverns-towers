'use client'

import { JSX } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Stack, DialogActions, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useUIStore } from "@/store/uiStore";
import { deleteSite } from '@/lib/actions/site.actions';
import DeleteButton from '@/components/Common/DeleteButton';
import { EntertainmentSite, GovernmentSite, GuildSite, HiddenSite, MiscellaneousSite, ResidenceSite, ShopSite, SiteDialogProps, SiteTypeMap, TavernSite, TempleSite } from '@/interfaces/site.interface';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import { useSession } from 'next-auth/react';
import { canDelete, canEdit } from '@/lib/auth/authPermissions';
import SiteFavorite from './SiteFavorite';

export const TavernDetails = dynamic<{ site: TavernSite }>(
  () => import('./TavernDetails').then(mod => mod.TavernDetails),
  { ssr: false }
);

export const TempleDetails = dynamic<{ site: TempleSite }>(
  () => import('./TempleDetails').then(mod => mod.TempleDetails),
  { ssr: false }
);

export const ShopDetails = dynamic<{ site: ShopSite }>(
  () => import('./ShopDetails').then(mod => mod.ShopDetails),
  { ssr: false }
);

export const GuildDetails = dynamic<{ site: GuildSite }>(
  () => import('./GuildDetails').then(mod => mod.GuildDetails),
  { ssr: false }
);

export const GovernmentDetails = dynamic<{ site: GovernmentSite }>(
  () => import('./GovernmentDetails').then(mod => mod.GovernmentDetails),
  { ssr: false }
);

export const EntertainmentDetails = dynamic<{ site: EntertainmentSite }>(
  () => import('./EntertainmentDetails').then(mod => mod.EntertainmentDetails),
  { ssr: false }
);

export const HiddenDetails = dynamic<{ site: HiddenSite }>(
  () => import('./HiddenDetails').then(mod => mod.HiddenDetails),
  { ssr: false }
);

export const ResidenceDetails = dynamic<{ site: ResidenceSite }>(
  () => import('./ResidenceDetails').then(mod => mod.ResidenceDetails),
  { ssr: false }
);

export const MiscellaneousDetails = dynamic<{ site: MiscellaneousSite }>(
  () => import('./MiscellaneousDetails').then(mod => mod.MiscellaneousDetails),
  { ssr: false }
);

const getSiteLabel = (type: string) => {
  const category = SITE_CATEGORIES.find(cat => cat.value === type);
  return category ? category.label : type;
};



const SiteTypeComponents = {
  tavern: TavernDetails,
  temple: TempleDetails,
  shop: ShopDetails,
  guild: GuildDetails,
  government: GovernmentDetails,
  entertainment: EntertainmentDetails,
  hidden: HiddenDetails,
  residence: ResidenceDetails,
  miscellaneous: MiscellaneousDetails,
} as const;

type SiteType = keyof typeof SiteTypeComponents;

type SiteComponentProps<T extends SiteType> = {
  site: SiteTypeMap[T];
};

export default function SiteDetailsDialog({ open, onClose, onDelete, settlementId, siteData }: SiteDialogProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { showSnackbar, closeDialog } = useUIStore();

  const siteType = siteData.type as SiteType;
  const Component = SiteTypeComponents[siteType] as (props: SiteComponentProps<typeof siteType>) => JSX.Element;
  const typedSite = siteData as SiteTypeMap[typeof siteType];
  const siteLabel = getSiteLabel(siteType);

  const user = session?.user ? { id: session.user.id } : null;
  const { userId, editors } = siteData;

  const editable = canEdit(user, { userId, editors });
  const deletable = canDelete(user, { userId });

  const handleEdit = () => {
    const id = siteData._id;
    const slug = settlementId || 'wilderness';
    router.push(`/settlements/${slug}/sites/${id}`);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>{siteData.name} ({siteLabel})</DialogTitle>
      <DialogContent aria-live="polite">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="space-between">
          <Box component="section" sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>Site Details</Typography>
            <Component site={typedSite} />
          </Box>

          <Box sx={{ position: 'relative', width: '20vw', minWidth: 100, height: 200 }}>
            {siteData.image && (
              <Image
                priority
                src={siteData.image}
                alt={`${siteData.name}`}
                fill
                style={{ borderRadius: '16px', objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, 20vw"
              />
            )}
          </Box>
        </Stack>

        <DialogActions>
          {editable && 
            (
              <>
                <SiteFavorite site={siteData} />
                <Button variant="contained" sx={{ mx: 1, color: "#1d2a3b" }} startIcon={<EditIcon />} onClick={handleEdit}>
                  Edit
                </Button>
              </>
            )
          }
          {deletable && (
            <DeleteButton
              id={siteData._id!}
              entity="site"
              deleteAction={deleteSite}
              onSuccess={() => {
                if (!siteData._id) return;
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
  );
}