import { TagTypes, TerrainTypes, ClimateTypes, MagicLevel } from "@/constants/settlementOptions";

export const FolkloreByTag: Record<TagTypes, string[]> = {
  "Ancient Ruins": [
    "Locals say the stones still whisper to those who sleep nearby.",
    "A curse lingers—visitors report strange dreams and sudden illness.",
  ],
  "Arcane Nexus": [
    "It's said magic warps time itself here—don't stare at your reflection.",
    "Children born during arcane surges have glowing eyes and odd talents.",
  ],
  "Border Post": [
    "A ghostly watchman is seen pacing atop the walls each full moon.",
    "Crossing the boundary without a blessing invites misfortune.",
  ],
  "Capital": [
    "Statues in the city plaza are rumored to come alive at night.",
    "The royal bloodline cannot be cut—literally; blades shatter on contact.",
  ],
  "Criminal Hideout": [
    "Saying a thief's name three times ensures they'll steal from you.",
    "There's always one rat listening—never speak plans aloud.",
  ],
  "Druidic": [
    "The trees here watch—and sometimes move if disrespected.",
    "Leaving a flower at the sacred grove grants safe passage.",
  ],
  "Fishing": [
    "A golden fish is said to appear before great storms.",
    "Never whistle on the water—it invites the drowned to surface.",
  ],
  "Fortress": [
    "They say no wall here has ever fallen—but not for lack of trying.",
    "A former commander haunts the battlements, judging the unworthy.",
  ],
  "Garrison": [
    "New recruits are told never to wear red—it draws the spirits of the slain.",
    "The armory keys must be turned widdershins to avoid bad luck.",
  ],
  "Hidden": [
    "Finding the town twice is a blessing—or a curse, depending on whom you ask.",
    "The stars above look different here, like they don't belong.",
  ],
  "Infested": [
    "Burning local herbs keeps 'them' away at night.",
    "Everyone knows not to look under the floorboards after dark.",
  ],
  "Isolated": [
    "They say the wind carries voices—not all of them living.",
    "Children are told not to speak their names aloud after sundown.",
  ],
  "Mining Camp": [
    "Strange music is heard deep in the tunnels—don't follow it.",
    "A silver coin left on the earth keeps the deep things sleeping.",
  ],
  "Nomadic": [
    "Each camp sings a lullaby said to ward off night spirits.",
    "Dreams guide their paths; waking dreams are a sign to pack up.",
  ],
  "Overgrown": [
    "Some vines here drink blood—they say it sweetens the blooms.",
    "If you hear laughter in the thicket, turn around immediately.",
  ],
  "Port": [
    "Tying three knots in a rope protects you from sea curses.",
    "A drowned sailor is seen before ships vanish at sea.",
  ],
  "Prison Settlement": [
    "Chains left unbroken bind more than the body, they say.",
    "Whistling in the cells is said to wake the forgotten inmates.",
  ],
  "Remote": [
    "The stars are wrong out here, but we don't talk about that.",
    "They say the hills walk at night—no one should wander alone.",
  ],
  "Sacred Site": [
    "A voice calls from the shrine at dusk—but answering is forbidden.",
    "The statues cry blood on holy days; no one knows why.",
  ],
  "Trade Hub": [
    "Every merchant carries a token to ward off jealous spirits.",
    "A cursed coin has passed through every stall—no one knows which.",
  ],
  "Military Outpost": [
    "No soldier dares sleep in the old western bunk—those who do vanish.",
    "They bury swords with the dead to keep them from walking again.",
  ],
};

export const FolkloreByTerrain: Record<TerrainTypes, string[]> = {
  "Coast": [
    "Some claim to see ghost ships on misty mornings—sailing inland.",
    "Barnacles on your door mean the sea has claimed you.",
  ],
  "Desert": [
    "Mirages sometimes speak—answering is dangerous.",
    "A faceless figure walks behind lone travelers. Don't turn around.",
  ],
  "Forest": [
    "The forest keeps its dead—and adds to them.",
    "Never follow a white stag; it leads you into another world.",
  ],
  "Jungle": [
    "The jungle has a voice. If it speaks to you, listen—but don't obey.",
    "Some vines here are older than memory, and hungrier too.",
  ],
  "Hills": [
    "Dancing lights on the hills mean the fey are watching.",
    "The hills hum at dusk—locals say it's the earth breathing.",
  ],
  "Mountains": [
    "Screams echo even when no one's around to scream.",
    "Lightning strikes the same peak every storm—for a reason.",
  ],
  "Plains": [
    "A single tree in the field marks a grave—best not approach it.",
    "Horses will not ride past certain standing stones. No one knows why.",
  ],
  "River": [
    "The river takes what it's owed—fishers always leave a coin.",
    "A ghost boat drifts upstream once a year. Don't touch it.",
  ],
  "Swamp": [
    "The lights lure you off the path—they feed the bog.",
    "Something beneath the surface mimics human voices.",
  ],
  "Tundra": [
    "White wolves are messengers of death or destiny—no in-between.",
    "Whispers on the wind come from those who froze unburied.",
  ],
  "Underground": [
    "The stone remembers. Echoes of the past can possess the present.",
    "You'll hear footsteps when you're alone—they're never yours.",
  ],
  "Urban": [
    "There are streets that don't exist by daylight. Locals avoid them.",
    "A man with no eyes is sometimes seen standing perfectly still at crossroads.",
  ],
};

export const FolkloreByClimate: Record<ClimateTypes, string[]> = {
  "Polar": [
    "The aurora sometimes forms runes—some can be read.",
    "The ice sings at night, and not all songs are kind.",
  ],
  "Temperate": [
    "Every 13th rain washes away someone's memory—just a little.",
    "Owls staring directly at your house mean someone is marked.",
  ],
  "Tropical": [
    "Some trees bleed red sap—and scream when cut.",
    "Rainwater from the first storm of the season grants visions.",
  ],
  "Dry": [
    "Mirrors left out overnight crack with strange symbols.",
    "The wind sometimes speaks—but in voices from far away.",
  ],
  "Continental": [
    "Every full moon, an animal speaks with a human voice.",
    "The first frost falls only where someone is about to die.",
  ],
};

export const FolkloreByMagicLevel: Record<MagicLevel, string[]> = {
  "None": [
    "Old charms are still buried under homes—but no one remembers why.",
    "The wind never carries whispers anymore, and some miss it.",
  ],
  "Low": [
    "Simple spells go awry here—they twist into rhymes or riddles.",
    "Lighting a candle after midnight invites unseen company.",
  ],
  "Moderate": [
    "Magic leaves traces—stray sparks in mirrors or footsteps on ceilings.",
    "Locals ward homes with chalk sigils changed every week.",
  ],
  "High": [
    "Time skips are common here—never trust clocks near the central square.",
    "People sometimes vanish and return changed. No one asks how.",
  ],
  "Mythic": [
    "Gods have walked these streets—or still do, in disguise.",
    "Reality sometimes bends around strong emotions. Grief shapes buildings.",
  ],
};
