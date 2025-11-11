'use client'

import { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Stack, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useUIStore } from "@/store/uiStore";
import { useSession } from 'next-auth/react';
import { canDelete, canEdit } from '@/lib/auth/authPermissions';
import DeleteButton from '@/components/Common/Button/DeleteButton';
import { EntertainmentSite, GovernmentSite, GuildSite, HiddenSite, MiscellaneousSite, ResidenceSite, ShopSite, SiteDialogProps, SiteType, TavernSite, TempleSite } from '@/interfaces/site.interface';
import { useSiteMutations } from '@/hooks/site/useSiteMutations';
import { useGetSiteById } from '@/hooks/site/site.query';
import { SITE_CATEGORIES } from '@/constants/site/site.options';
import FavoriteButton from '@/components/Common/Button/FavoriteButton';
import { useQueryClient } from '@tanstack/react-query';
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';


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

const getSiteLabel = (type: string) => {
  const category = SITE_CATEGORIES.find(cat => cat.value === type);
  return category ? category.label : type;
};

export default function SiteDetailsDialog({ open, onClose, settlementId, siteData, onDelete }: SiteDialogProps) {
  const router = useRouter();
  const { showSnackbar, closeDialog } = useUIStore();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

  const { data, isLoading, isError } = useGetSiteById(siteData._id ?? null);

  // Mutations
  const { handlePartialUpdate } = useSiteMutations({
    mode: 'edit',
    settlementId: settlementId ?? siteData.settlementId ?? 'wilderness',
    siteId: siteData._id!,
  });

  // Always define site for later use; may be undefined during loading
  const site = data?.site;
  const siteType = site?.type as keyof typeof SiteTypeComponents | undefined;

  if (!site || !siteType) return null;

  const Component = SiteTypeComponents[siteType] as ComponentType<{ site: typeof site }>;
  const typedSite = site as Extract<typeof site, { type: typeof siteType }>;

  const user = session?.user ? { id: session.user.id } : null;
  const editable = site &&  canEdit(user?.id, { userId: site.userId }, campaignPermissions ?? undefined);
  const deletable = site && canDelete(user?.id, { userId: site.userId });

  const handleEdit = () => {
    if (!site) return;
    const slug = settlementId ?? 'wilderness';
    router.push(`/settlements/${slug}/sites/${site._id}`);
    closeDialog();
  };

  const handleDelete = async () => {
    if (!site) return;
    const { deleteSite } = await import('@/lib/actions/site.actions');
    await deleteSite(site._id);
    onDelete?.(site._id);
    showSnackbar('Site deleted successfully!', 'success');
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          {site ? `${site.name} (${getSiteLabel(site.type)})` : 'Loading...'}
        </Box>
        <FavoriteButton<SiteType>
          item={site}
          onToggleFavorite={async (updated) => {
            await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
          }}
        />
      </DialogTitle>

      <DialogContent>
        {isLoading && <Typography>Loading site details...</Typography>}
        {isError && <Typography color="error">Failed to load site.</Typography>}

        {site && siteType && Component && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="space-between">
            <Box sx={{ px: 2 }}>
              <Typography variant="h6" sx={{ textDecoration: 'underline' }}>Site Details</Typography>
              <Component site={typedSite} />
            </Box>

            {site.image && (
              <Box sx={{ position: 'relative', width: '20vw', minWidth: 100, height: 200 }}>
                <Image
                  src={site.image}
                  alt={site.name}
                  fill
                  style={{ borderRadius: '16px', objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, 20vw"
                />
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        {editable && (
          <Button
            variant="contained"
            sx={{ mx: 1, color: '#1d2a3b' }}
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
        {deletable && <DeleteButton id={site?._id} entity="site" deleteAction={handleDelete} />}
      </DialogActions>
    </Dialog>
  );
}