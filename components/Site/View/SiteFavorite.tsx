'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";
import { SiteType } from "@/interfaces/site.interface";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";

export default function SiteFavorite({ site }: { site: SiteType }){
    const { handlePartialUpdate } = useSiteMutations({ mode: "edit", settlementId: site.settlementId ?? "wilderness", siteId: site._id});

    return (
        <ToggleFieldButton<SiteType, "favorite">
            item={site}
            field="favorite"
            onToggle={async (updated) => {
                await handlePartialUpdate({ _id: updated._id, favorite: updated.favorite });
            }}
            TrueIcon={Favorite}
            FalseIcon={FavoriteBorder}
            iconProps={{ sx: { marginRight: 1 }, color: "secondary" }}
        />
    );
}