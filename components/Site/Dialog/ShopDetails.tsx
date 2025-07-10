import { ShopSite } from '@/interfaces/site.interface';
import { Box } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { SHOP_TYPE_CATEGORIES, SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';

export function getShopTypeLabel(value: string): string {
  for (const category of SHOP_TYPE_CATEGORIES) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export const ShopDetails = ({ site }: { site: ShopSite }) => {
  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Shop Type" value={site.shopType ? getShopTypeLabel(site.shopType) : "N/A"} />
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Owner" value={site.owner} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />
        <InfoListItem label="GM Notes" value={site.gmNotes} />
      </Box>

      <MenuList menu={site.menu || []} label="Wares" />
    </>
  );
};