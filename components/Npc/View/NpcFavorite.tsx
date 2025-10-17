'use client';

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { Npc } from "@/interfaces/npc.interface";
import ToggleFieldButton from "@/components/Common/ToggleFieldButton";

export default function NpcFavorite({ npc }: { npc: Npc }){
    const { handleSubmit } = useNpcMutations({ mode: "edit", npcId: npc._id });

    return (
        <ToggleFieldButton<Npc, "favorite">
            item={npc}
            field="favorite"
            onToggle={handleSubmit}
            TrueIcon={Favorite}
            FalseIcon={FavoriteBorder}
            iconProps={{ sx: { marginRight: 1 }, color: "secondary" }}
        />
    );
}