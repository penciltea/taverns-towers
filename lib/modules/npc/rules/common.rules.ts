import { IntegumentType } from "@/lib/models/npc.model";

export function checkIfHumanDerivedRace(race: string) {
    return [
        "human",
        "elf",
        "dwarf",
        "halfling",
        "gnome",
        "half-elf",
        "half-orc",
        "aasimar",
        "goliath",
        "goblin"
    ].includes(race.toLowerCase());
}

export function getNonHumanIntegument(race: string): IntegumentType {
    switch (race.toLowerCase()) {
        case "construct": 
            return "metal";
        case "dragonborn":
        case "lizardfolk":
            return "scales";
        case "kenku":
        case "aarakocra":
            return "feathers";
        case "tabaxi":
        case "leonin":
            return "fur";
        default:
            return "skin";
    }
}