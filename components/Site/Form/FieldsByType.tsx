import TavernFields from "./Tavern";
import TempleFields from "./Temple";
import ShopFields from "./Shop";
import GuildFields from "./Guild";
import GovernmentFields from "./Government";
import EntertainmentFields from "./Entertainment";
import HiddenFields from "./Hidden";
import ResidenceFields from "./Residence";
import MiscellaneousFields from "./Miscellaneous";

export const siteFormFieldsByType: Record<
  string,
  React.ComponentType
> = {
  tavern: TavernFields,
  temple: TempleFields,
  shop: ShopFields,
  guild: GuildFields,
  government: GovernmentFields,
  entertainment: EntertainmentFields,
  hidden: HiddenFields,
  residence: ResidenceFields,
  miscellaneous: MiscellaneousFields
};