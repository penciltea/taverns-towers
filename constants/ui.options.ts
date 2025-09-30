import { OAuthProviderConfig } from "@/interfaces/ui.interface";

export const UI_THEMES = ["dark", "light"] as const;

export const oauthProvidersConfig: OAuthProviderConfig[] = [
  {
    name: "patreon",
    iconSrc: "/icons/patreon.svg",
    providerId: "patreon",
  },
  // add more providers here
];


export type UITheme = (typeof UI_THEMES)[number];