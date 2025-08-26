export const UI_THEMES = ["dark", "light"] as const;


export type UITheme = (typeof UI_THEMES)[number];