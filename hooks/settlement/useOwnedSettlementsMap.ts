import { useMemo } from "react";
import { useOwnedSettlementsQuery } from "./settlement.query";

export default function useOwnedSettlementsMap(){
    const { data } = useOwnedSettlementsQuery({}, { isEnabled: true });

    const map = useMemo(() => {
        const m = new Map();
        data?.settlements.forEach(s => m.set(s._id, s.name));
        return m;
    }, [data]);

    return {
        loading: !data,
        map,
    };
}