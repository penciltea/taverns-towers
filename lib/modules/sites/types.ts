import { SiteFormData } from "@/schemas/site.schema";

export type SiteGenerationInput = Partial<SiteFormData> & {
  climate?: string;
  terrain?: string[];
  tags?: string[];
};