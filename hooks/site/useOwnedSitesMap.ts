import { useMemo } from "react";
import { useOwnedSitesQuery } from "./site.query";

export default function useOwnedSitesMap(){
    const { data } = useOwnedSitesQuery({}, { isEnabled: true });

    const map = useMemo(() => {
        const m = new Map();
        data?.sites.forEach(s => m.set(s._id, s.name));
        return m;
    }, [data]);

    return {
        loading: !data,
        map,
    };
}