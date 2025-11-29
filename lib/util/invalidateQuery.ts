import { ContentType } from "@/constants/common.options";
import { campaignKeys } from "@/hooks/campaign/campaign.query";
import { npcKeys } from "@/hooks/npc/npc.query";
import { settlementKeys } from "@/hooks/settlement/settlement.query";
import { siteKeys } from "@/hooks/site/site.query";
import { userKeys } from "@/hooks/user/user.query";
import { QueryClient } from "@tanstack/react-query";

interface queryConnections {
    id: string;
    type: string;
    role: string;
    label?: string;
}

export function invalidateConnections(queryClient: QueryClient, connections: queryConnections[]) {
  if (!connections?.length) return;

  for (const conn of connections) {
    switch (conn.type) {
      case "npc":
        queryClient.invalidateQueries({ queryKey: ["npc", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
        break;
      case "settlement":
        queryClient.invalidateQueries({ queryKey: ["settlement", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedSettlements"] });
        break;
      case "site":
        queryClient.invalidateQueries({ queryKey: ["site", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedSites"] });
        queryClient.invalidateQueries({ queryKey: ["sites"] });
        break;
    }
  }
}

export function invalidateContentQueries(queryClient: QueryClient, contentType: ContentType, itemId: string, settlementId?: string, campaignId?: string){
  if(!contentType) return;

  switch(contentType){
    case "npc":
      queryClient.invalidateQueries({ queryKey: ["npc", itemId] });
      queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
      break;
    case "settlement": 
      queryClient.invalidateQueries({ queryKey: ["settlement", itemId] });
      queryClient.invalidateQueries({ queryKey: ["ownedSettlements"] });
      break;
    case "site":
      queryClient.invalidateQueries({ queryKey: siteKeys.owned(), exact: false });
      queryClient.invalidateQueries({ queryKey: siteKeys.public(), exact: false });
      if(settlementId){
        queryClient.invalidateQueries({ queryKey: siteKeys.settlement(settlementId), exact: false });
      }
      if(campaignId){
        queryClient.invalidateQueries({ queryKey: siteKeys.campaign(campaignId), exact: false });
      }
      
      break;
  }
}

export function invalidateNpcQueries(queryClient: QueryClient, npcId: string, campaignId?: string){
  if (npcId) {
    queryClient.invalidateQueries({
      queryKey: npcKeys.detail(npcId),
    });
  }

  queryClient.invalidateQueries({
    queryKey: npcKeys.owned(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: npcKeys.public(),
    exact: false,
  });

  if (campaignId) {
    queryClient.invalidateQueries({
      queryKey: npcKeys.campaign(campaignId),
      exact: false,
    });
  }

  queryClient.invalidateQueries({
    queryKey: npcKeys.lists(),
    exact: false,
  });
}


export function invalidateSiteQueries(queryClient: QueryClient, siteId: string, settlementId?: string, campaignId?: string){
  if (siteId) {
    queryClient.invalidateQueries({
      queryKey: siteKeys.detail(siteId),
    });
  }

  queryClient.invalidateQueries({
    queryKey: siteKeys.owned(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: siteKeys.public(),
    exact: false,
  });

  if (settlementId) {
    queryClient.invalidateQueries({
      queryKey: siteKeys.settlement(settlementId),
      exact: false,
    });
  }

  if (campaignId) {
    queryClient.invalidateQueries({
      queryKey: siteKeys.campaign(campaignId),
      exact: false,
    });
  }

  queryClient.invalidateQueries({
    queryKey: siteKeys.lists(),
    exact: false,
  });
} 

export function invalidateSettlementQueries(queryClient: QueryClient, settlementId: string, campaignId?: string){
  if (settlementId) {
    queryClient.invalidateQueries({
      queryKey: settlementKeys.detail(settlementId),
    });
  }

  queryClient.invalidateQueries({
    queryKey: settlementKeys.owned(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: settlementKeys.public(),
    exact: false,
  });

  if (campaignId) {
    queryClient.invalidateQueries({
      queryKey: settlementKeys.campaign(campaignId),
      exact: false,
    });
  }

  queryClient.invalidateQueries({
    queryKey: settlementKeys.lists(),
    exact: false,
  });
}

export function invalidateCampaignQueries(queryClient: QueryClient, campaignId: string, userId?: string){
  if (campaignId) {
    queryClient.invalidateQueries({
      queryKey: campaignKeys.detail(campaignId),
    });

    queryClient.invalidateQueries({
      queryKey: campaignKeys.campaignPermissions(campaignId),
    });

    queryClient.invalidateQueries({
      queryKey: campaignKeys.campaignHighlights(campaignId),
    });
  }

  if(userId){
    queryClient.invalidateQueries({
      queryKey: campaignKeys.assigned(userId),
      exact: false,
    });
  }

  queryClient.invalidateQueries({
    queryKey: campaignKeys.owned(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: campaignKeys.user(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: campaignKeys.public(),
    exact: false,
  });

  queryClient.invalidateQueries({
    queryKey: campaignKeys.lists(),
    exact: false,
  });
}

export function invalidateUserQueries(queryClient: QueryClient, userId: string, limit?: number){
  if(!userId) return;

  if(limit){
    queryClient.invalidateQueries({
      queryKey: userKeys.recent(limit, userId),
    });
  }

  queryClient.invalidateQueries({
    queryKey: userKeys.favorites(userId),
  });
}