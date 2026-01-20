import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { NormalizedSettlementInput, SettlementDescriptionType } from "../normalize";
import { SettlementDescriptionTemplates, SettlementSizeText } from "../../mappings/description/description.mappings";

export function getSettlementSizeTextRule(size: string){
    return getRandom(SettlementSizeText[size as keyof typeof SettlementSizeText]);
}

export function applySettlementDescriptionRule(data: NormalizedSettlementInput){
    if(!shouldReplace(data.description)){
        return data;
    }

    let sizeDescription = getSettlementSizeTextRule(data.size)

    const settlementData: SettlementDescriptionType = {
        ...data,
        sizeDescription
    }

    const pick = Math.floor(Math.random() * SettlementDescriptionTemplates.length);
    data.description = SettlementDescriptionTemplates[pick](settlementData);

    return data;
}