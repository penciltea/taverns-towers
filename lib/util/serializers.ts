import { Settlement } from "@/interfaces/settlement.interface";
import { serializeFromDb } from "./serializeFromDb";
import { NpcConnection } from "@/interfaces/connection.interface";
import { BaseSite, SiteType, TavernSite, generatorMenuItem, TempleSite, ShopSite, GuildSite, GovernmentSite, EntertainmentSite, HiddenSite, ResidenceSite, MiscellaneousSite } from "@/interfaces/site.interface";
import { Npc } from "@/interfaces/npc.interface";
import { Campaign, Player } from "@/interfaces/campaign.interface";

export function serializeSettlement(settlement: Parameters<typeof serializeFromDb>[0]): Settlement {
  const serialized = serializeFromDb(settlement) as Settlement | null;

  if (!serialized || !Array.isArray(serialized.connections)) {
    throw new Error("Invalid settlement data for serialization");
  }

  return {
    ...serialized,
    connections: serialized.connections.map((conn) => ({
      ...conn,
      id: conn.id.toString(),
    })),
  };
}


export function serializeSite(site: Parameters<typeof serializeFromDb>[0]): BaseSite | SiteType {
  const serialized = serializeFromDb(site);

  // Ensure the result is an object and has a 'type' property
  if (
    !serialized ||
    typeof serialized !== "object" ||
    Array.isArray(serialized) ||
    !("type" in serialized)
  ) {
    throw new Error("Invalid serialized site data");
  }

  // Map connections
  const baseData = {
    ...serialized,
    connections: Array.isArray((serialized as { connections?: NpcConnection[] }).connections)
      ? ((serialized as unknown as { connections: NpcConnection[] }).connections).map((conn: NpcConnection) => ({
          ...conn,
          id: conn.id?.toString() ?? conn.id,
        }))
      : [],
  } as BaseSite;

  // Handle type-specific fields
  switch (serialized.type) {
    case "tavern":
      return {
        ...baseData,
        type: "tavern",
        clientele: serialized.clientele as TavernSite["clientele"],
        entertainment: serialized.entertainment as TavernSite["entertainment"],
        cost: serialized.cost as TavernSite["cost"],
        menu: Array.isArray((serialized as { menu?: generatorMenuItem[] }).menu)
          ? ((serialized as unknown as { menu: generatorMenuItem[] }).menu).map((item: generatorMenuItem) => ({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
          }))
          : [],
      };
    case "temple":
      return {
        ...baseData,
        type: "temple",
        domains: Array.isArray(serialized.domains as TempleSite["domains"]) ? serialized.domains as TempleSite["domains"] : [],
        relics: serialized.relics as TempleSite["relics"],
      };
    case "shop":
      return {
        ...baseData,
        type: "shop",
        shopType: serialized.shopType as ShopSite["shopType"],
        menu: Array.isArray((serialized as { menu?: generatorMenuItem[] }).menu)
          ? ((serialized as unknown as { menu: generatorMenuItem[] }).menu).map((item: generatorMenuItem) => ({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
          }))
          : [],
      };
    case "guild":
      return {
        ...baseData,
        type: "guild",
        guildName: serialized.guildName as GuildSite["guildName"],
        guildType: serialized.guildType as GuildSite["guildType"],
        membershipRequirements: Array.isArray(serialized.membershipRequirements)
          ? (serialized.membershipRequirements.map((req: unknown): string => String(req)) as GuildSite["membershipRequirements"])
          : ([] as GuildSite["membershipRequirements"]),
        knownRivals: serialized.knownRivals as GuildSite["knownRivals"],
      } as GuildSite;
    case "government":
      return {
        ...baseData,
        type: "government",
        function: serialized.function as GovernmentSite["function"],
        security: serialized.security as GovernmentSite["security"],
      };
    case "entertainment":
      return {
        ...baseData,
        type: "entertainment",
        venueType: serialized.venueType as EntertainmentSite["venueType"],
        cost: serialized.cost as EntertainmentSite["cost"],
      };
    case "hidden":
      return {
        ...baseData,
        type: "hidden",
        secrecy: Array.isArray(serialized.secrecy)
          ? (serialized.secrecy as unknown[]).map((s: unknown): string => String(s)) as HiddenSite["secrecy"]
          : ([] as HiddenSite["secrecy"]),
        knownTo: serialized.knownTo as HiddenSite["knownTo"],
        defenses: serialized.defenses as HiddenSite["defenses"],
        purpose: serialized.purpose as HiddenSite["purpose"],
      };
    case "residence":
      return {
        ...baseData,
        type: "residence",
        notableFeatures: serialized.notableFeatures as ResidenceSite["notableFeatures"],
      };
    case "miscellaneous":
      return {
        ...baseData,
        type: "miscellaneous",
        features: serialized.features as MiscellaneousSite["features"],
        use: serialized.use as MiscellaneousSite["use"],
      };
    default:
      return baseData;
  }
}


export function serializeNpc(npc: Parameters<typeof serializeFromDb>[0]): Npc {
  const serialized = serializeFromDb(npc) as Npc | null;

  if (!serialized || !Array.isArray(serialized.connections)) {
    throw new Error("Invalid NPC data for serialization");
  }

  return {
    ...serialized,
    connections: serialized.connections.map((conn) => ({
      ...conn,
      id: conn.id.toString(),
    })),
  };
}

export function serializeCampaign(campaign: Parameters<typeof serializeFromDb>[0]): Campaign {
  const serialized = serializeFromDb(campaign) as Campaign | null;
  if (!serialized || !Array.isArray(serialized.tone) || !Array.isArray(serialized.players)) {
    throw new Error("Invalid campaign data for serialization");
  }
  return {
    ...serialized,
    tone: serialized.tone.map((t) => t),
    players: serialized.players.map((player: Player) => ({
      userId: player.userId,
      role: player.role,
    })),
  };
}