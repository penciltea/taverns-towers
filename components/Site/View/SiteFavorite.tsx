'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";
import { SiteType } from "@/interfaces/site.interface";
import { useSiteManager } from "@/hooks/site/useSiteManager";

export default function SiteFavorite({ site }: { site: SiteType }){
    const updateSite = useSiteManager("edit", site._id);

    return (
        <ToggleFieldButton<SiteType, "favorite">
            item={site}
            field="favorite"
            onToggle={async (updated) => { await updateSite(updated); }}
            TrueIcon={Favorite}
            FalseIcon={FavoriteBorder}
            iconProps={{ sx: { marginRight: 1 }, color: "secondary" }}
        />
    );
}