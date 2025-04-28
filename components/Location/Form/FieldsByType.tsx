import TavernFields from "./Tavern";
//import TempleFields from "./TempleFields";
//import BlacksmithFields from "./BlacksmithFields";

export const locationFormFieldsByType: Record<
  string,
  React.ComponentType
> = {
  tavern: TavernFields,
  //temple: TempleFields,
  //blacksmith: BlacksmithFields,
};