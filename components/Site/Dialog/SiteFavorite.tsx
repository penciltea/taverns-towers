'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";
import { SiteType } from "@/interfaces/site.interface";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useQueryClient } from "@tanstack/react-query";

export default function SiteFavorite({ site }: { site: SiteType }) {
  const { handlePartialUpdate } = useSiteMutations({
    mode: "edit",
    settlementId: site.settlementId ?? "wilderness",
    siteId: site._id,
  });

  const queryClient = useQueryClient();

  // Always get the latest site object from the cache
  const cachedSite = queryClient.getQueryData<SiteType>(["site", site._id]) ?? site;

  return (
    <ToggleFieldButton<SiteType, "favorite">
      item={cachedSite}
      field="favorite"
      onToggle={async () => {
        await handlePartialUpdate({
          _id: cachedSite._id,
          favorite: !cachedSite.favorite,
          settlementId: site.settlementId ?? "wilderness",
        });
      }}
      TrueIcon={Favorite}
      FalseIcon={FavoriteBorder}
      iconProps={{ sx: { marginRight: 1 }, color: "secondary" }}
    />
  );
}
