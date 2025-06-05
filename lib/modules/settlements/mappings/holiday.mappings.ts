import { ClimateTypes, TagTypes, TerrainTypes } from "@/constants/environmentOptions";
import { MagicLevel } from "@/constants/settlementOptions";

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
    "Saltcall Day: Held during the first high tide of summer, villagers chant from the docks and ring bells to 'call' blessings from the sea. Celebrated for safe sailing and good fishing.",
    "Driftfeast: After storms, families gather at dawn to collect driftwood and sea gifts, which are displayed or burned in evening bonfires. Celebrated to give thanks for the sea’s offerings.",
    "Harborlight Vigil: On the longest night of the year, lanterns are set afloat in the harbor to honor those lost to the ocean. Celebrated to remember sailors and seek their guidance.",
    "Shellbright: Children compete to polish shells to a mirror shine, believed to attract helpful sea spirits. Celebrated in late spring."
  ],
  Desert: [
    "Scorchrise: Celebrated on the first day when temperatures pass a certain heat threshold. People wear reflective garb and share chilled teas. Honors endurance and adaptability.",
    "Siltveil: During seasonal sandstorms, homes are draped in white cloth. Families recite ancient protection chants. Celebrated to protect against the desert’s wrath.",
    "Cactus Bloom Day: Marked by the blooming of desert flora, bright garlands are exchanged and medicinal herbs are prepared. Celebrated to mark beauty in harshness."
  ],
  Forest: [
    "Whispersong Festival: Held when the forest is thickest in mid-summer. People wander in silence to hear 'the song of the trees.' Celebrated to commune with the wild.",
    "Barkbound Day: Families carve symbols into bark and press hands to trees. Celebrated to mark kinship between people and woodland spirits.",
    "Foxlight Night: On the first frost, lanterns are hidden in the woods and a playful hunt begins. Celebrated to honor cleverness and the change of seasons."
  ],
  Jungle: [
    "Mistveil Vigil: A one-night celebration where people wear flowered masks and leave glowing fruits at the edges of dense jungle paths. Celebrated to appease unseen jungle spirits and ask for safe passage.",
    "Canopy Day: Held during the highest sun of midsummer. Children climb trees while adults hang streamers from the canopy. Celebrated to honor the protective roof of the jungle.",
    "Rootsong Week: A week-long series of gatherings with drum circles around massive jungle roots. Celebrated to awaken the sleeping spirits in the earth and share communal strength.",
    "Lumenbloom: Celebrated on the night bioluminescent flowers are expected to bloom. Locals walk silently through the underbrush, lighting no fires. Celebrated in awe of natural magic.",
    "Vinefire Festival: A two-day event where dried vines are twisted into braids and burned to release old grudges. Celebrated to cleanse emotional burdens before the rainy season.",
    "Canopy Bloom: Held during peak flowering season. Colored powders are thrown into the air from tree platforms. Celebrated for renewal and joy.",
    "Vineguard Night: In the wettest month, villagers burn coiled vines in safe circles to ward off disease and danger. Celebrated to protect the village.",
    "Echofruit Day: A mid-autumn celebration where fruit is left in offering baskets and songs are echoed through valleys. Celebrated to thank spirits and wildlife."
  ],
  Hills: [
    "Hearthhill Day: A mid-autumn holiday where families climb a favorite hilltop and share a meal beside a bonfire. Celebrated to reconnect with ancestors and home.",
    "Rolling Feast: A two-day event where food carts race down gentle slopes, with spilled offerings left for hill spirits. Celebrated to thank the land for a bountiful season.",
    "Echowatch: A twilight ritual held on the equinox. Songs are sung into the valleys and repeated from hilltops. Celebrated to maintain harmony across distances.",
    "Stonepile Day: A spring tradition where villagers stack cairns on high places, leaving tokens for loved ones. Celebrated to guide souls or travelers across uncertain paths.",
    "Highsun Festival: Celebrated on the longest day of the year. Dancers mimic the sun's arc across hill crests. Celebrated for clarity and sight into the future.",
    "Stonewalk Day: Families hike the old hill paths, placing painted stones at cairns. Celebrated to honor ancestors and travelers.",
    "Windflute Festival: Held during the windiest week of the year, handmade flutes are played from hilltops. Celebrated to send songs to the sky spirits.",
    "Meadowlaugh: A spring event where people gather in hill meadows and share jokes or riddles in the open air. Celebrated to usher in good cheer."
  ],
  Mountains: [
    "Skyreach Day: Held on the summer solstice, climbers ascend as high as they safely can to release colored flags into the wind. Celebrated to carry wishes to the heavens.",
    "Stonechant: A week-long holiday where communities gather in echoing chambers to chant ancestral names and mountain myths. Celebrated to bond with the spirits of stone.",
    "Cliffkind Day: A day of community feasting on ledges or balconies. Celebrated to reaffirm solidarity and courage in harsh conditions.",
    "Avalanch: A solemn event during early winter where silence is observed near cliff faces. Celebrated to show respect to the unpredictable force of the mountain.",
    "Frostforge Festival: Celebrated when the first snow seals the highest peaks. Smiths and artisans showcase goods said to be 'mountain-born' Celebrated to honor craft and endurance.",
    "Peakfire: On the solstice, mountaintop bonfires are lit and mirrored with torchlight down the slopes. Celebrated to awaken the old gods said to sleep in the peaks.",
    "Climber’s Oath: On the first frost, mountaineers tie braided cords and make silent promises before ascents. Celebrated to honor respect for the mountain.",
    "Echo Day: Horns are sounded at dawn from the heights, each blast met with cheers below. Celebrated as a sign of unity and tradition."
  ],
  Plains: [
    "Windrace Day: A festival of kite-flying and horse racing held during a windy midspring afternoon. Celebrated to praise the openness and freedom of the plains.",
    "Grasswake: A one-day observance after the first full thaw, where people sleep outside and listen to the grass 'breathe.' Celebrated for renewal and quiet blessings.",
    "Driftseed Week: Over several days in late summer, children collect seeds and release them on the wind. Celebrated to spread hope and future harvests.",
    "Horizonlight Festival: Held during sunrise and sunset of the equinox. People face opposite horizons and share stories. Celebrated for connection across distances.",
    "Threshsong Day: A harvest ritual where threshing is accompanied by rhythmic songs and dancing. Celebrated to align human effort with the land's rhythm.",
    "Stampede Dance: A rhythmic circle dance meant to mimic herds, performed to honor migratory beasts. Celebrated in mid-autumn.",
    "Fieldshade Day: Families erect small tents in wide fields and tell stories from sunup to sundown. Celebrated to share histories and rest together."
  ],
  River: [
    "Riverbless Day: A springtime festival where boats are decorated with flowers and floated downstream with wishes. Celebrated to ask the river's favor for the year.",
    "Currentfast: A one-day fast during a strong current season. People sit by the river in silence. Celebrated to honor the river's moods and respect its danger.",
    "Bridgeday: Celebrated midsummer. Locals gather on bridges to exchange gifts or confessions. Celebrated to symbolize connection and passage.",
    "Mistcall Festival: Held at dawn on a mist-heavy day. Musicians play flutes from boats to 'wake the water.' Celebrated to renew bonds with river spirits.",
    "Eddy's Eve: A playful evening of water games and mischief. Celebrated before seasonal flooding to acknowledge chaos and change.",
    "Riverblessing: At the spring thaw, people release flower-wrapped messages downstream. Celebrated to connect distant communities and spirits.",
    "Bridgebright: Every bridge is washed and decorated with light. Travelers toss coins in thanks as they cross. Celebrated at midsummer.",
    "Eddy Day: Children build small whirlpools or water wheels. Celebrated to teach river lore and honor the playful current spirits."
  ],
  Swamp: [
    "Bogwhisper Night: Held on the darkest moon, people gather to listen for the whispers of ancestors. Celebrated for remembrance and insight.",
    "Marshfire: Glow-moss is collected and hung in nets around the village. Celebrated to light the way and guard against the unseen.",
    "Lilywake Day: When lilies first bloom, shallow boats are covered in petals and floated gently. Celebrated for rebirth and peace."
  ],
  Tundra: [
    "Brightstep: Held when the snow first crusts underfoot. People dance in boots laced with bells. Celebrated for agility and the turning of seasons.",
    "Frostvein Day: Ice patterns are traced and recorded in books or paintings. Celebrated to mark the passage of invisible beauty.",
    "Aurora Chant: Villagers sing in harmonic tones under the aurora. Celebrated to stir warmth into the sky and summon blessing."
  ],
  Underground: [
    "Glimmerwake: On the darkest night, phosphorescent fungi are illuminated and danced among. Celebrated to ward off fear and bring hope.",
    "Stonewhisper Day: People place their ear to cave walls to hear 'messages' from the deep. Celebrated for communion with the deep earth.",
    "Depthbond: Miners and dwellers share saltbread and vow aid. Celebrated to affirm mutual reliance underground."
  ],
  Urban: [
    "Bricklay Day: Citizens each place a ceremonial brick in a central plaza. Celebrated to renew unity and build community.",
    "Lanternwatch: On the longest night, windows are filled with handmade lanterns. Celebrated to honor protection and neighborliness.",
    "Streetshout Festival: A noisy, lively event where performers roam and shout poems or songs from alley to alley. Celebrated to celebrate expression and free spirit."
  ]
};

export const HolidaysByClimate: Partial<Record<ClimateTypes, string[]>> = {  
  Polar: [
    "Frostkin Day: Celebrated during the first major snowfall of winter, children wear white cloaks and pretend to be spirits of frost, knocking on doors to receive warm treats. Celebrated to welcome the winter spirits who are said to protect the young.",
    "Lantern Deep: A midwinter tradition, lanterns are lowered into deep snow wells or caverns to 'light the underworld.' Celebrated in reverence for ancestors believed to dwell beneath the ice.",
    "Wolfcall Night: Held on the longest night of the year, residents howl together from hilltops while feasting on dried meats around fires. Celebrated to honor the resilience and unity of the community, inspired by wolf packs.",
    "Icebind Week: Over seven days in late autumn, people clasp hands over frozen lakes and rivers and recite shared promises. Celebrated to bind friendships and alliances before winter’s isolation sets in.",
    "Starlace Day: Celebrated during the year's first blizzard, intricate snowflake patterns are woven into lace or painted on windows. A call for clarity and beauty in the darkest season.",
    "Aurora Vigil Night: Families gather under the night sky during midwinter, lighting lanterns shaped like stars and telling ancestral stories while watching the aurora. Celebrated to honor the spirits believed to reside in the lights, guiding the living through darkness.",
    "Thawfire Festival: A great bonfire is lit at the edge of the village using stored driftwood during the first week of spring. Ice sculptures are melted ceremoniously to mark survival of winter and welcome warmth.",
    "Silence Day: Held during the coldest stretch of winter, the entire settlement refrains from speaking from sunrise to sundown. Snow patterns are drawn with sticks for communication. Held in memory of those lost to blizzards.",
    "Moonwake: Held during the longest night of the year, dancers in white masks mimic the moon’s path through darkness while choirs hum low chants. Celebrated in reverence of the moon’s protective glow.",
    "Hearth Unseen Week: During the darkest week of winter, homes are dimly lit and food is shared with doors unbarred. No one is turned away. Celebrated to invoke protection and community."
  ],
  Temperate: [
    "Maplewake Day: Marked by the first sap flow of early spring, sap collectors decorate trees with red ribbons and sing songs of renewal. Celebrated as the earth begins to wake.",
    "Fielddream Festival: Celebrated over a weekend during peak spring bloom, locals nap in meadows and share dream interpretations. A tradition to connect with nature and each other’s subconscious.",
    "Rook’s Return: This one-day holiday takes place when the first rook or migratory bird is spotted in spring. Black-feathered masks are worn and tokens are left on rooftops to honor returning messengers.",
    "Willowring Day: Held in early summer, wreaths of willow are hung on doors and floated down rivers. Celebrated for healing, memory, and letting go of griefs.",
    "Stoneplow Festival: Celebrated the day before planting begins, people carve their names into stones and place them at field edges. A ritual to mark commitment to the harvest to come.",
    "Harvestlight Festival: Celebrated on the last day of harvest season, lanterns are hung in fields and people parade with wreaths of grain. Children gift baked goods to elders in thanks for the bounty.",
    "Greenrest Day: Held on the midsummer solstice, no farming or labor is done. People picnic and write wishes on leaves. Celebrated to rest both land and spirit.",
    "First Bloom Day: A late winter or early spring holiday where garlands of early flowers are exchanged and couples plant trees or gardens. Celebrated to mark new beginnings.",
    "Twilight Waltz: Celebrated during the vernal equinox, music is played in the town square at sunset while people dance in flowing robes. A symbol of balance and renewal.",
    "Wellwish Day: Held after the first spring thaw, wells are decorated with wildflowers and small offerings tossed in. Celebrated to thank freshwater spirits."
  ],
  Tropical: [
    "Rain's Welcome Day: Celebrated on the first rainfall after the dry season. People dance barefoot and catch raindrops in painted bowls to welcome life-giving water.",
    "Fruitfire Festival: Held during the peak of the fruiting season, carved fruit floats are sent downriver with candles, and fresh juices are shared in celebration of the year’s bounty.",
    "Coconut Day: Celebrated during late summer, coconut climbing contests and fireside storytelling fill the day. Honors the coconut as a sacred life-giver.",
    "Shellsong Week: A week-long seaside observance when wind chimes made of shells are hung. Celebrated to honor ancestors lost to the sea and seek calm waters.",
    "Sunpetal Day: During peak sunlight in early summer, marigolds and hibiscus are woven into mandalas. Celebrated to honor the tropical sun as the giver of life.",
    "Flamefruit Night: Held on the hottest night of the summer, fruits are roasted on open fires and songs are sung late into the evening. Celebrated for health, passion, and protection from illness.",
    "Mango Bloom Week: A romantic holiday during peak mango blossom season, lovers exchange poems written on mango leaves and wear fragrant garlands. Celebrated for passion and fertility.",
    "Tidekiss Day: Held on the lowest tide of the full moon cycle, sand altars are built and offerings left to the sea. Celebrated to give thanks for safe shores and bounty.",
    "Drumwake: A one-day festival held at the end of the wet season. Drums echo across the village from dawn to dusk to awaken the land and the spirits.",
    "Lizardlight Day: Celebrated during the first week of the dry season, children race lizards and release them into the wild. A call for agility, luck, and favor from jungle spirits."
  ],
  Dry: [
    "Sunwatch Day: Celebrated on the summer solstice, people climb rooftops or hills to watch the sunrise in complete silence. A moment of clarity, endurance, and reverence for the sun.",
    "Glassfall Week: Held over the windiest week of the dry season, colored glass shards shimmer from strings in homes and marketplaces. Celebrated to bring beauty into barren places and invite rain.",
    "Mirage Day: A one-day event during peak heat where trickster stories are told and illusions performed. Celebrated to embrace the desert’s deceptive magic.",
    "Dustfeast: A three-day trade and food festival held before the seasonal caravan departs. Dried foods are shared and traditions honored for preserving resources.",
    "Scorchstride Day: Celebrated on the hottest day of the year, people walk barefoot across sun-warmed stone paths while chanting. A ritual of strength and harmony with heat.",
    "Dust Moon: Held under the first full moon after the dry season begins, a moonlit procession releases dyed sand into the wind. Celebrated to send prayers for rain.",
    "Oasis Day: Celebrated on the hottest day of the year, wells and baths are adorned with petals and drinks are gifted to travelers. A gesture of gratitude for water.",
    "Stonebound Day: Held in early autumn, tales carved into stones are retold while children draw chalk symbols. Celebrated to preserve ancestral memory and desert resilience.",
    "Shadefast Week: During a sweltering midseason week, cloth canopies fill the streets and people walk only in shadow. Celebrated as a lesson in survival and respect for the sun.",
    "Hollow Sky Day: Echo songs are sung in canyons and caverns during the dry season’s midpoint. Celebrated to remind all that even emptiness carries memory."
  ],
  Continental: [
    "Stormrake Day: Observed the morning after the first spring thunderstorm, villagers gather debris and craft crowns from windfall. Celebrated as a rebirth after chaos.",
    "Flakefall Day: Takes place during the season's first snowfall. Paper birds are released into the wind to honor the peaceful arrival of winter.",
    "Longtable Night: Held on the winter solstice, everyone eats at a single extended table regardless of the weather. Celebrated to unite the community in darkness.",
    "Verdant Pact Week: During the first full week of planting season, youths pair up to plant trees and name them. Celebrated to bond the new generation to the land.",
    "Echoleaf Day: Celebrated in late autumn when leaves begin to fall. People travel to forests or cliffs and shout dreams into the wind. A ritual to set intentions and be heard by nature.",
    "Fourfold Day: A solstice holiday where each quarter of the day represents a season, marked with themed food and music. Celebrated to honor the full cycle of the year.",
    "Crackearth Day: Celebrated on the first planting day after the frost breaks. People smash pots of seed and water before planting them. A symbol of hope and renewal.",
    "Goldenwind Week: During peak autumn, people wear golden cloaks and gather leaves into celebratory piles. Embracing the fleeting beauty of the season.",
    "Skybreaker’s Eve: Celebrated the night before the first snow, firecrackers are set off to 'break' the sky and drive away winter. A symbol of defiance and warmth.",
    "Riverwake Day: A springtime ritual held on the day the river first thaws. Small bark boats with wishes are set afloat to mark new beginnings."
  ]
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
