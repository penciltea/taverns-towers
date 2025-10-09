export interface PatreonTier {
  id: string;
  type: "tier";
  attributes: {
    title: string;
    amount_cents: number;
  };
}

export interface PatreonMember {
  id: string;
  type: "member";
  attributes: {
    patron_status: "active_patron" | "former_patron" | "declined_patron" | string;
    pledge_relationship_start: string;
    last_charge_date: string;
    last_charge_status: string;
  };
  relationships?: {
    currently_entitled_tiers?: {
      data: { id: string; type: "tier" }[];
    };
    campaign?: {
      data: { id: string; type: "campaign" };
    };
  };
}

export type PatreonIncluded = PatreonMember | PatreonTier;

export interface PatreonIdentityResponse {
  data: {
    id: string;
    type: "user";
    attributes: Record<string, unknown>;
    relationships: {
      memberships: {
        data: { id: string; type: "member" }[];
      };
    };
  };
  included?: PatreonIncluded[];
}