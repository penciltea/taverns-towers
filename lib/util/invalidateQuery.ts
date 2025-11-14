import { ContentType } from "@/constants/common.options";
import { siteKeys } from "@/hooks/site/site.query";
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

