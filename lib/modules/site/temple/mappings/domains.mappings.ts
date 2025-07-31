import { SiteSize } from "@/constants/site/site.options";

export const domainCountBySiteSize: Record<SiteSize, [number, number]> = {
  tiny: [1, 1],
  small: [1, 2],
  modest: [1, 2],
  large: [2, 3],
  grand: [3, 4],
  sprawling: [3, 5],
};