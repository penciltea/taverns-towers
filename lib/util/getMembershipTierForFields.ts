import { ARTISAN_SITE_THEMES, SITE_THEMES } from "@/constants/site/site.options";

export function handleSiteThemesByTier(tier: string){
    switch (tier) {
        case "Artisan":
        case "Architect":
        return [...ARTISAN_SITE_THEMES, ...SITE_THEMES];
        case "Apprentice":
        default:
        return SITE_THEMES;
    }
}