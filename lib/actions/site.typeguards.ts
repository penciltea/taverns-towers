import { SiteType, TavernSite, ShopSite, EntertainmentSite, TempleSite, GuildSite, HiddenSite, GovernmentSite, ResidenceSite } from "@/interfaces/site.interface";

export function isTavernOrShopOrEntertainment(
  site: SiteType
): site is TavernSite | ShopSite | EntertainmentSite {
  return ["tavern", "shop", "entertainment"].includes(site.type);
}

export function isTempleGuildHidden(
  site: SiteType
): site is TempleSite | GuildSite | HiddenSite {
  return ["temple", "guild", "hidden"].includes(site.type);
}

export function isGovernment(site: SiteType): site is GovernmentSite {
  return site.type === "government";
}

export function isResidence(site: SiteType): site is ResidenceSite {
  return site.type === "residence";
}