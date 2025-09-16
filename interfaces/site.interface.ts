import { SITE_SIZE, SITE_CONDITION, SiteShopType, SiteEntertainmentType } from '@/constants/site/site.options';
import { QualityType, RarityType } from '@/constants/site/menu.options';
import { DialogProps } from "./dialogProps.interface";
import { SiteFormData } from '@/schemas/site.schema';
import { SiteGovernmentFunctionType, SiteSecurityLevel } from '@/constants/site/government.options';
import { SiteGuildMembershipType } from '@/constants/site/guild.options';
import { GeneratorSiteFragmentPlain } from '@/lib/models/generator/site/siteNameFragment.model';
import { CommonInterface } from './common.interface';
import { NpcConnection } from './connection.interface';
import { KNOWN_TO, SECRECY_LEVELS, PURPOSE, DEFENSE, SiteSecrecyLevel, SiteKnownTo, SiteDefense, SitePurpose } from '@/constants/site/hidden.options';

 
export interface SiteDialogProps extends DialogProps {
  settlementId: string;
  siteData: SiteType;
  onDelete: (id: string) => void;
}

export interface SiteListProps {
  settlementId: string;
}

export interface SiteQueryParams {
  page: number;
  limit: number;
  settlementId: string;
  type: string[];
  search: string;
}

export const DefaultSiteQueryParams: SiteQueryParams = {
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

export interface BaseSite extends CommonInterface {
  settlementId?: string;
  name: string;
  type: string;
  size?: SiteSize;
  condition?: SiteCondition;
  image?: string;
  connections: NpcConnection[];
}

export interface TavernSite extends BaseSite {
  type: "tavern";
  clientele?: string;
  entertainment?: string[];
  cost?: string;
  menu?: { name: string; category?: string; description: string; price: string; rarity?: string;}[];
}

export interface TempleSite extends BaseSite {
  type: "temple";
  domains: string[];
  relics?: string;
  menu?: { name: string; description: string; price: string; category?: string; rarity?: string; magic?: string;}[];
}

export interface ShopSite extends BaseSite {
  type: "shop";
  shopType: SiteShopType;
  menu?: { name: string; description?: string; category?: string; quality?: string; quantity?: string; price: string; rarity?: string; magic?: string; }[];
}

export interface GuildSite extends BaseSite {
  type: "guild";
  guildName?: string;
  guildType: SiteGuildMembershipType;
  membershipRequirements?: string[];
  knownRivals?: string;
  menu?: { name: string; description?: string; price: string; category?: string; rarity?: string; magic?: string; }[];
}

export interface GovernmentSite extends BaseSite {
  type: "government";
  function?: SiteGovernmentFunctionType;
  security?: SiteSecurityLevel;
}

export interface EntertainmentSite extends BaseSite {
  type: "entertainment";
  venueType?: SiteEntertainmentType;
  cost?: string;
}

export interface HiddenSite extends BaseSite {
  type: "hidden";
  secrecy?: SiteSecrecyLevel[];
  knownTo?: SiteKnownTo[];
  defenses?: SiteDefense[];
  purpose?: SitePurpose[];
}

export interface ResidenceSite extends BaseSite {
  type: "residence";
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
  quality?: QualityType;
  quantity?: string;
  rarity?: RarityType;
}

export type SiteFormFieldProps = {
  generator?: {
    name?: (target?: string ) => Promise<void> | void;
    menuItems?: (index?: number) => void;
    menu?: () => void;
    menuItem?: (index: number) => void;
    
  };
};

export interface GenerateSiteNameOptions {
  tags?: string[];
  terrain?: string[];
  climate?: string;
  siteType?: string[];
  shopType?: string[];
  guildType?: string[];
  venueType?: string[];
  functionType?: string[];
  domains?: string[];
  data?: Partial<SiteFormData>;
}

export interface SiteNameGenerator {
  generateName(
    fragments: GeneratorSiteFragmentPlain[],
    options: GenerateSiteNameOptions
  ): string;
}

// For site name generation fragments
export type GroupKey =
  | "prefix"
  | "suffix"
  | "noun"
  | "person"
  | "siteTypeName"
  | "fullName"
  | "format";


export interface SiteGenerationContext {
  climate?: string;
  terrain?: string[];
  tags?: string[];
  size?: string;
  races?: string;
  wealth?: string;
  crime?: string[];
  magic?: string;
  domains?: string[];
  rulingStyle?: string;
  origin?: "settlement" | "wilderness";
  settlementId?: string;
  settlementName?: string;
  reroll?: boolean;
  siteType?: string;
  shopType?: string;
  guildType?: string;
  siteSize?: string;
  siteCondition?: string;
  menuItems?: generatorMenuItem[];
}

export interface SiteGenerationInput extends SiteGenerationContext {
  overrides?: Partial<SiteFormData>;
}


export type SiteType = TavernSite | TempleSite | ShopSite | GuildSite | GovernmentSite | EntertainmentSite | HiddenSite | ResidenceSite | MiscellaneousSite | BaseSite;

export type SiteSize = (typeof SITE_SIZE)[number]['value'];
export type SiteCondition = (typeof SITE_CONDITION)[number]['value'];
