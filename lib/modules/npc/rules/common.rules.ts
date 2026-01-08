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