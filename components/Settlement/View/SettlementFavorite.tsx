'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";
import { Settlement } from "@/interfaces/settlement.interface";
import { useSaveSettlement } from "@/hooks/settlement/useSaveSettlement";

export default function SettlementFavorite({ settlement }: { settlement: Settlement }){
    const { handlePartialUpdate } = useSaveSettlement("edit", settlement._id);

    return (
        <ToggleFieldButton<Settlement, "favorite">
            item={settlement}
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