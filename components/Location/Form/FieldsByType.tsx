import { LocationFormData } from "@/schemas/locationSchema";
import TavernFields from "./Tavern";
//import TempleFields from "./TempleFields";
//import BlacksmithFields from "./BlacksmithFields";

type LocationType = LocationFormData["type"]; 

export const locationFormFieldsByType: Record<
  LocationType,
  React.ComponentType
> = {
  tavern: TavernFields,
  //temple: TempleFields,
  //blacksmith: BlacksmithFields,
};