'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";
import { SiteType } from "@/interfaces/site.interface";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";

interface SiteFavoriteButtonProps {
  site: SiteType;
  settlementId: string;
}

export default function SiteFavorite({ site, settlementId }: SiteFavoriteButtonProps) {
    const { handlePartialUpdate } = useSiteMutations({
        mode: "edit",
        settlementId,
        siteId: site._id,
    });

    return (
        <ToggleFieldButton<SiteType, "favorite">
            item={site}
            field="favorite"
            onToggle={handlePartialUpdate}
            TrueIcon={Favorite}
            FalseIcon={FavoriteBorder}
            iconProps={{ sx: { marginRight: 1 }, color: "secondary" }}
        />
    );
}
