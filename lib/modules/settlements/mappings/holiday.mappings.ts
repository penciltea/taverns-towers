import { ClimateTypes, MagicLevel, TagTypes, TerrainTypes } from "@/constants/settlementOptions";

export const HolidaysByTag: Partial<Record<TagTypes, string[]>> = {
  "Ancient Ruins": [
    "Remembrance of Stone: locals trace ancient glyphs in ash and sing songs in forgotten tongues.",
    "Echo Day: people whisper messages into the ruins, hoping ancestors will answer.",
    "Shardlight: broken artifacts are lit with colored oils in reverent nighttime processions.",
  ],
  "Arcane Nexus": [
    "The Arcanum Revel: locals celebrate a day of magical experimentation with fireworks and enchantments.",
    "Etherveil: a moonless night when veils between planes are said to thin—sorcerers hold open rituals.",
    "Mana Surge: spontaneous spellcasting is encouraged in the streets as mages test chaotic flows.",
  ],
  "Border Post": [
    "Watcher's Oath: a solemn recitation at dawn, reaffirming duty to guard the frontier.",
    "Crossing Feast: travelers and locals share meals as a gesture of peace between lands.",
    "Signal Fire Night: beacons are lit along the border in memory of a long-past siege.",
  ],
  "Capital": [
    "Crown Day: parades honor the ruling house, complete with pageants and ceremonial duels.",
    "Unity Jubilee: flags of all provinces are flown; storytellers share regional legends.",
    "Golden Promenade: streets are scattered with flower petals and gold-foil confetti.",
  ],
  "Druidic": [
    "Verdant Rite: a seasonal gathering around the Heart Tree, with ritual dances and floral offerings.",
    "Equinox Blessing: observed at dawn and dusk, marking the balance of sun and moon with wild feasts.",
    "Wyrdbloom: a rare flower's blooming is tracked with sacred vigils and herbal offerings.",
  ],
  "Fishing": [
    "Tide's Bounty: offerings are cast into the sea before a communal fish feast.",
    "Netmender's Day: locals repair nets and boats, then host a regatta and fish-grilling contest.",
    "Saltwake: boats are rowed in circles while singers chant to the spirits of the deep.",
  ],
  "Fortress": [
    "Stoneheart Day: soldiers carve their names into the walls to honor past defenders.",
    "Gateclash: mock sieges and training games are held for all ages.",
    "Iron Vigil: an overnight watch kept in silence to reflect on sacrifices made.",
  ],
  "Garrison": [
    "Banner Raising: old battle flags are paraded and new ones stitched by the youth.",
    "Marcher's Rest: soldiers are given leave and join in street brawls-turned-dances.",
    "Drillmaster's Jest: a day of reversed roles, where recruits mock-command their officers.",
  ],
  "Mining Camp": [
    "Deepshine Festival: rare crystals are polished and displayed under firelight.",
    "Pick's Eve: workers decorate their tools and compete in strength-based games.",
    "Echofeast: food is served deep in the mines while old songs echo through the caverns.",
  ],
  "Nomadic": [
    "Trailblaze: the first caravan of the season departs to drumbeats and flag dances.",
    "Hearthless Night: fires are lit under open sky and strangers are treated as kin.",
    "Wheel's Turning: a ceremonial disassembly of camp to mark life's impermanence.",
  ],
  "Overgrown": [
    "Bloomfire: great vines are burned back with ritual flames, clearing paths for spring.",
    "Mossdance: barefoot dances are held in sacred glades with painted feet.",
    "Thornfast: a day of pruning overgrown places, followed by picnics in the cleared groves.",
  ],
  "Port": [
    "Dockwake: ships are decorated with ribbons, and sailors throw coins to children.",
    "Harbormirth: floating stage plays are performed from boats.",
    "Lanterns of Passage: floating lanterns are launched for safe travel and return.",
  ],
  "Remote": [
    "Starwatch: everyone gathers under the open sky to trade omens and constellations.",
    "Quietrest: a day without work where each person writes a letter to the ancestors.",
    "Rimlight Festival: sunrise is watched in total silence, then broken with a shared meal.",
  ],
  "Sacred Site": [
    "Pilgrim's Gift: offerings are left anonymously at the altar or shrine.",
    "The Anointed Path: barefoot processions along ancient walkways at dusk.",
    "Divine Requiem: sacred music is played all day, echoing from hill to hill.",
  ],
  "Trade Hub": [
    "Coinfall Festival: a public auction and street fair celebrating prosperity and trade.",
    "Barterday: no coin changes hands—only trades, fostering community and storytelling.",
    "Teller's Parade: traveling merchants perform stories of strange goods from afar.",
  ],
  "Military Outpost": [
    "The Shield Vigil: fallen soldiers are honored with silent marches and salutes at sunrise.",
    "Victory's Ember: bonfires lit to mark an ancient victory—now a day of sparring games and boasting.",
    "Armorclash: mock duels and obstacle races turn the outpost into a festival ground.",
  ],
};

export const HolidaysByTerrain: Partial<Record<TerrainTypes, string[]>> = {
  Coast: [
    "Seablessing: sand and salt are sprinkled on boats while priests chant over the tide.",
    "Shellday: children gather the most beautiful shells to win ribbons and sweets.",
    "Gullcall: a noisy, boisterous event where crowds mimic gulls and toss bread skyward.",
  ],
  Desert: [
    "Sun-Walk: a daylong procession under the sun followed by night feasting under stars.",
    "Dune Spirits' Eve: tales say spirits emerge at dusk—residents hang charms and play music to appease them.",
    "Oasis Bloom: rare flowering oases are visited with offerings of water and song.",
  ],
  Forest: [
    "Grove Awakening: people leave lanterns in trees the night before to 'wake' the forest spirits.",
    "Leafturn: marking the first fall of red leaves, with garland-making and storytelling.",
    "Barkchant: local bards sing using hollowed logs for percussion among the trees.",
  ],
  Jungle: [
    "Drumroot: deep percussive music echoes through the canopy in all directions.",
    "Mistwatch: shamans seek visions in early fogs, followed by a communal meal.",
    "Liantra: ribbons are tied to vines and trees in prayers for guidance and fertility.",
  ],
  Hills: [
    "Stonepile Day: cairns are built to remember lost wanderers and shepherds.",
    "Goatfest: herders race and dress up their goats for honor and hilarity.",
    "Echocall: a joyful shouting contest across valleys, echoing songs and names.",
  ],
  Mountains: [
    "Sky's Ascent: travelers climb a peak before dawn to greet the sun together.",
    "Rimecall: bells are rung down a cliffside to awaken spirits said to dwell in the ice.",
    "Stonefeast: food is shared in natural caverns lit with glowing minerals.",
  ],
  Plains: [
    "Longstride: a day of races—on foot, horse, and cart—across the open land.",
    "Windchant: tall grass is strung with wind-chimes to sing as breezes roll in.",
    "Bannerflight: kite battles and messenger relays mark this high-spirited festival.",
  ],
  River: [
    "Rivergloam: glowing reeds or candles are floated downstream at dusk.",
    "Bridgeday: bridges are painted or decorated, and games are held upon them.",
    "Oarfest: races between boats, rafts, and even barrels test riverfolk daring.",
  ],
  Swamp: [
    "Mistcall: the village lights fog lanterns and plays eerie flutes to 'guide the ancestors home.'",
    "Reed Dance: dancers dress in marsh reeds and perform rituals to bless the waters.",
    "Bogglow: floating lanterns and mossfires illuminate the swamp in a haunting celebration.",
  ],
  Tundra: [
    "Snowharrow: snow sculptures and ice hunts commemorate survival and resilience.",
    "Hearthmeet: communal fires are lit and furs traded to ensure collective warmth.",
    "Frostsong: children sing old songs to 'wake' the spring buried beneath ice.",
  ],
  Underground: [
    "Deepquiet: a day of silent reflection by glowing crystal light.",
    "Glowfeast: phosphorescent fungi and dishes are served in total darkness.",
    "Echofire: torchlines are lit through tunnels, creating waves of light and sound.",
  ],
  Urban: [
    "Streetlight Gala: buildings are draped in hanging lanterns and rooftop parties flourish.",
    "Founder's Revel: reenactments of the city's origin fill the central plaza.",
    "Market Bloom: merchant stalls spill into every alley, offering rare treats and challenges.",
  ],
};

export const HolidaysByClimate: Partial<Record<ClimateTypes, string[]>> = {  
  Polar: [
    "Aurora Night: a once-a-year celebration under the northern lights with ice sculptures and fire dancing.",
    "Frostwake: the first thaw is marked by releasing ice lanterns into the sea or river.",
    "Stillcold: families gather indoors for quiet feasts and storytelling while snow piles high.",
  ],
  Temperate: [
    "Harvest Ring: townsfolk form massive circles to share crops and dances.",
    "Rainsong: the first warm rain is greeted by open arms and skyward singing.",
    "Suncrest: people wear yellow and white, celebrating the longest day of the year.",
  ],
  Tropical: [
    "Fruitfall: massive shared feast using overripe seasonal fruits—also a time for romantic confessions.",
    "Stormsend: a symbolic 'banishment' of storm spirits through dance and drumming.",
    "Bloomrush: a frantic festival where rare flowers are sought in the jungle before wilting.",
  ],
  Dry: [
    "Dustbound: masks are worn and dust-dancing contests are held.",
    "Rainwish: water jugs are placed on rooftops, then opened when rain finally falls.",
    "Sunveil: silk veils and wide hats are worn in playful defiance of the heat.",
  ],
  Continental: [
    "Windharvest: children chase paper pinwheels through wind-swept streets.",
    "Foglight: as mist creeps in, locals place lamps outside their homes and exchange riddles.",
    "Thawbound: a contest to predict the last frost—winners are crowned Spring's Herald.",
  ],
}

export const HolidaysByMagicLevel: Partial<Record<MagicLevel, string[]>> = {
  None: [
    "Maker's Day: celebrates craftsmanship and invention — magic is expressly forbidden this day.",
    "Candlefaire: a quiet tradition of lighting candles in memory of lost loved ones.",
    "Ironcraft: forges are run all day as smiths demonstrate skill and host challenges.",
  ],
  Low: [
    "Glimmer Day: small charms are given to children to 'spark wonder' in the mundane.",
    "Faintlight: a subtle candle-lit festival where illusions are rare and quiet.",
    "Runesday: simple runes are drawn in chalk by commoners hoping for a little luck.",
  ],
  Moderate: [
    "Weavespire: enchantments are woven into fabric for one day of magical fashion.",
    "Sigilwalk: magical street art is chalked on walls, meant to fade by nightfall.",
    "Arcflame: controlled fire spells are used in dances and cooking contests.",
  ],
  High: [
    "Spellspire: magical duels and illusion contests held in public squares.",
    "Starbind Festival: floating lanterns are infused with levitation charms and released en masse.",
    "Blinkfair: teleportation games and spell-tossing contests amuse all ages.",
  ],
  Mythic: [
    "Ascension Day: myths say gods walked the town once—people act out divine dramas.",
    "Reality's Edge: boundaries of time and space are said to thin; rituals are held to 'bind the seams.'",
    "Everwake: no one sleeps, as magic hums visibly in the air—dreams bleed into waking life.",
  ],
};
