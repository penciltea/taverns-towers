import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { NormalizedSettlementInput, SettlementDescriptionType } from "../normalize";
import { GeneralSettlementVerb, LargeSettlementVerb, SettlementDescriptionTemplates, SettlementSizeText, SettlementTerrainText, SmallSettlementVerb, VerbPairings } from "../../mappings/description/description.mappings";
import { oxfordCommaList } from "@/lib/util/stringFormats";

export function getSettlementSizeTextRule(size: string){
    return getRandom(SettlementSizeText[size as keyof typeof SettlementSizeText]);
}

export function getSettlementSizeCategory(size: string){
    switch(size.toLowerCase()){
        case "encampment": 
        case "hamlet":
        case "village":
        case "town":
            return "small";
        case "city":
        case "metropolis":
            return "large";
        default:
            return "small";
    }
}

export function getSettlementVerbBySizeCategory(size: string){
    if(!size) return "sits";

    let verbPool = GeneralSettlementVerb;

    if(size === "small"){
        verbPool = verbPool.concat(SmallSettlementVerb);
    } else if(size === "large"){
        verbPool = verbPool.concat(LargeSettlementVerb);
    }

    let selectedVerb = getRandom(verbPool);
    let verbPairing = getRandom(VerbPairings[selectedVerb as keyof typeof VerbPairings]);

    return selectedVerb + " " + verbPairing;
}

export function getSettlementTerrainText(terrain: string[]){
    return terrain.map(terrainLabel => {
        if(!terrainLabel) return "";
        return getRandom(
            SettlementTerrainText[terrainLabel as keyof typeof SettlementTerrainText]
        );
    })
}



export function applySettlementDescriptionRule(data: NormalizedSettlementInput){
    if(!shouldReplace(data.description)){
        return data;
    }

    let sizeDescription = getSettlementSizeTextRule(data.size);
    let verbText = getSettlementVerbBySizeCategory(getSettlementSizeCategory(data.size));
    let terrainText = oxfordCommaList(getSettlementTerrainText(data.terrain));

    const settlementData: SettlementDescriptionType = {
        ...data,
        sizeDescription,
        verbText,
        terrainText
    }

    const pick = Math.floor(Math.random() * SettlementDescriptionTemplates.length);
    data.description = SettlementDescriptionTemplates[pick](settlementData);

    return data;
}