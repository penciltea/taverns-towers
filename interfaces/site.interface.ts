import { SITE_SIZE, SITE_CONDITION } from '@/constants/siteOptions';
import { DialogProps } from "./dialogProps.interface";
 
export interface SiteDialogProps extends DialogProps {
  settlementId: string;
  siteData: SiteType;
  onDelete: (id: string) => void;
}

export interface SiteListProps {
  settlementId: string;
  onDelete: (id: string) => void;
}

export interface SiteFilters {
  page: number;
  limit: number;
  settlementId: string;
  type: string[];
  search: string;
}

export const DefaultSiteFilters = {
  page: 1,
  limit: 12,
  settlementId: '',
  type: [],
  search: ''
}

export interface SiteResponse {
  sites: SiteType[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface BaseSite {
  _id: string;
  settlementId?: string;
  name: string;
  type: string;
  size?: SiteSize;
  condition?: SiteCondition;
  publicNotes?: string;
  gmNotes?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TavernSite extends BaseSite {
  type: "tavern";
  owner?: string;
  clientele?: string;
  entertainment?: string[];
  cost?: string;
  menu?: { name: string; category?: string; description: string; price: string }[];
}

export interface TempleSite extends BaseSite {
  type: "temple";
  deity?: string;
  leader?: string;
  relics?: string;
  menu?: { name: string; description: string; price: string }[];
}

export interface ShopSite extends BaseSite {
  type: "shop";
  shopType?: string;
  owner?: string;
  menu?: { name: string; description?: string; category?: string; quality?: string; quantity?: string; price: string }[];
}

export interface GuildSite extends BaseSite {
  type: "guild";
  guildName?: string;
  guildType: string;
  leader?: string;
  membershipRequirements?: string;
  knownRivals?: string;
  menu?: { name: string; description?: string; price: string }[];
}

export interface GovernmentSite extends BaseSite {
  type: "government";
  function?: string;
  officials?: string;
  jurisdiction?: string;
  security?: string;
}

export interface EntertainmentSite extends BaseSite {
  type: "entertainment";
  venueType?: string;
  performances?: string;
  owner?: string;
  cost?: string;
}

export interface HiddenSite extends BaseSite {
  type: "hidden";
  secrecy?: string[];
  leader?: string,
  knownTo?: string;
  defenses?: string;
  purpose?: string;
}

export interface ResidenceSite extends BaseSite {
  type: "residence";
  occupant?: string;
  notableFeatures?: string;
}

export interface MiscellaneousSite extends BaseSite {
  type: "miscellaneous";
  features?: string;
  use?: string;
}

export interface generatorMenuItem{
  name: string;
  description: string;
  category: string;
  price: string;
  climate?: string[];
  terrain?: string[];
  tags?: string[];
}

export type SiteFormFieldProps = {
  generator?: {
    name?: () => void;
    menu?: () => void;
    
  };
};

export type SiteType = TavernSite | TempleSite | ShopSite | GuildSite | GovernmentSite | EntertainmentSite | HiddenSite | ResidenceSite | MiscellaneousSite | BaseSite;

export type SiteSize = (typeof SITE_SIZE)[number]['value'];
export type SiteCondition = (typeof SITE_CONDITION)[number]['value'];
