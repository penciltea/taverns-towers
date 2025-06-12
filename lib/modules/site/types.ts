import { SiteFormData } from "@/schemas/site.schema";

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
}

export interface SiteGenerationInput extends SiteGenerationContext {
  overrides?: Partial<SiteFormData>;
}