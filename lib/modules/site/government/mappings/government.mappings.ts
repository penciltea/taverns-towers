import { SiteGovernmentFunctionType, SiteSecurityLevel } from "@/constants/site/government.options";
import { SiteSize, SiteCondition } from "@/constants/siteOptions";

export const SECURITY_BASELINE_BY_FUNCTION: Record<SiteGovernmentFunctionType, SiteSecurityLevel[]> = {
  archive: ["none", "low", "moderate"],
  census: ["none", "low"],
  customs: ["moderate"],
  mayor: ["moderate", "high"],
  permit: ["none", "low"],
  tax: ["moderate"],
  townHall: ["moderate"],
  barracks: ["moderate", "high"],
  bounty: ["moderate"],
  courthouse: ["moderate", "high"],
  drillYard: ["low", "moderate"],
  garrison: ["high", "very_high"],
  guardhouse: ["moderate", "high"],
  command: ["high", "very_high", "top_secret"],
  prison: ["high", "very_high"],
  recruit: ["moderate"],
  quartermaster: ["moderate"],
  watch: ["moderate"],
  embassy: ["moderate", "high"],
  employment: ["none", "low"],
  postOffice: ["none", "none", "low"],
  publicWork: ["none", "low", "moderate"],
  other: ["none", "low", "moderate"]
};

export const SIZE_SECURITY_WEIGHT: Record<SiteSize, number> = {
  tiny: 0,
  small: 1,
  modest: 2,
  large: 3,
  grand: 4,
  sprawling: 5,
};

export const CONDITION_SECURITY_WEIGHT: Record<SiteCondition, number> = {
  squalid: 0,
  poor: 1,
  average: 2,
  wealthy: 3,
  aristocratic: 4,
};