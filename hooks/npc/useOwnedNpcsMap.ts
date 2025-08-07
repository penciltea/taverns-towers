import { useMemo } from "react";
import { useOwnedNpcsQuery } from "./npc.query";

export default function useOwnedNpcsMap(){
    const { data } = useOwnedNpcsQuery({}, { isEnabled: true });

    const map = useMemo(() => {
        const m = new Map();
        data?.npcs.forEach(n => m.set(n._id, n.name));
        return m;
    }, [data]);

    return {
        loading: !data,
        map,
    };
}