import { ClimateTypes, TagTypes, TerrainTypes } from "@/constants/environmentOptions";
import { DomainTypes, MagicLevel } from "@/constants/settlementOptions";

export const HolidaysByTagMapping: Partial<Record<TagTypes, string[]>> = {
  "Ancient Ruins": [
    "Remembrance of Stone: locals trace ancient glyphs in ash and sing songs in forgotten tongues.",
    "Echo Day: people whisper messages into the ruins, hoping ancestors will answer.",
    "Shardlight: broken artifacts are lit with colored oils in reverent nighttime processions.",
    "Moonfall Eve: Celebrated during the first full moon of spring. Locals gather among ruins at dusk to read fragments of forgotten texts and offer silent reflection.",
    "Crumblewatch: Observed in late autumn as stone begins to frost. People sweep ruins clean and lay down wildflowers to honor lost civilizations.",
    "Echoveil: Held during the winter solstice. A quiet walk is taken through ruined halls wearing veils, symbolizing the thin line between past and present."
  ],
  "Arcane Nexus": [
    "The Arcanum Revel: locals celebrate a day of magical experimentation with fireworks and enchantments.",
    "Etherveil: a moonless night when veils between planes are said to thin—sorcerers hold open rituals.",
    "Mana Surge: spontaneous spellcasting is encouraged in the streets as mages test chaotic flows.",
    "Glimmerstrand: Celebrated on the shortest day of winter. Wisps of light (mundane or magical) are strung between towers to represent strands of mana.",
    "Leymoot: A mid-autumn gathering where arcane scholars debate near nexus points. Celebrated with glowstone readings and friendly spell duels.",
    "Sigil’s Dawn: Held the morning after the spring equinox. A ritual where townsfolk draw protective runes on doorways to honor magical harmony."
  ],
  "Border Post": [
    "Watcher's Oath: a solemn recitation on the first dawn after a new moon, reaffirming duty to guard the frontier.",
    "Crossing Feast: travelers and locals share meals as a gesture of peace between lands.",
    "Signal Fire Night: beacons are lit along the border in memory of a long-past siege.","Linebound Oath: Celebrated in early spring, when border paths thaw. Watchmen reaffirm their vows and repaint boundary markers.",
    "Fencefire Festival: Held during midsummer. Bonfires are lit every half-mile along the border to honor watchfulness and unity.",
    "Hinge Day: On the first frost, all gates are oiled and opened wide at noon. Celebrated to promote openness while acknowledging division."
  ],
  "Capital": [
    "Crown Day: parades honor the ruling house, complete with pageants and ceremonial duels.",
    "Unity Jubilee: flags of all provinces are flown; storytellers share regional legends.",
    "Golden Promenade: streets are scattered with flower petals and gold-foil confetti.",
    "Founders’ Flame: Held on the anniversary of the city's founding in late summer. A ceremonial torch is passed through districts to light the central brazier.",
    "Seal Day: Celebrated on the first day of fiscal spring. Leaders stamp ceremonial seals on scrolls of public promises read aloud to crowds.",
    "Colonnade Revel: A week-long festival starting with the first harvest. Markets spill into government avenues, and formal robes are traded for bright cloth."
  ],
  "Criminal Hideout": [
     "Whispernight: Celebrated on the eve before tax day. Locals speak only in riddles or code. Celebrated for mischief and secrecy.",
    "Blackmark Eve: Held on the last new moon of the year. Thieves leave gifts anonymously for orphans and poor folk.",
    "Silent Draw: A summer ritual where names are drawn in silence from a black pouch. The named must perform a public prank by sundown."
  ],
  "Druidic": [
    "Verdant Rite: a seasonal gathering around the Heart Tree, with ritual dances and floral offerings.",
    "Equinox Blessing: observed at dawn and dusk, marking the balance of sun and moon with wild feasts.",
    "Wyrdbloom: a rare flower's blooming is tracked with sacred vigils and herbal offerings.",
    "Leafturn: Held at the exact midpoint of autumn when the first gold leaves fall. Celebrants offer fruit and carve thanks into tree bark (harmlessly).",
    "Rootdrum Day: A spring celebration where people play hollow logs to wake the soil spirits. Held just before the first planting.",
    "Furrow’s Rest: Observed on the first winter snow. Druidic caretakers bury tokens from the harvest in a sacred glade to let the land sleep peacefully."
  ],
  "Fishing": [
    "Tide's Bounty: offerings are cast into the sea before a communal fish feast.",
    "Netmender's Day: locals repair nets and boats, then host a regatta and fish-grilling contest.",
    "Saltwake: boats are rowed in circles while singers chant to the spirits of the deep.",
    "Stillwater Day: Celebrated during the hottest day of the year when rivers grow calm. No boats move, and fish are fed bread as thanks.",
    "Gullcry Festival: Held during the first storm of the rainy season. Boats are decorated with feathers, and wind chimes are strung on docks.",
    "Hookshed Night: On the final night before winter's freeze, all old nets and broken hooks are burned to release bad luck from the water."
  ],
  "Fortress": [
    "Stonefast Day: Celebrated on the first full moon of spring. Troops polish and bless their armor atop the walls to honor strength and tradition.",
    "Rampart Vigil: Held on the longest night of the year. Watchfires are lit along every battlement, with silent sentinels keeping watch until dawn.",
    "Siegebreak Festival: Commemorated on the anniversary of a famous siege (varies by fortress). Mock drills, catapult contests, and wall-climbing games are held.",
    "Ironwake Vigil: Celebrated on the first storm of autumn. Soldiers stand outside in the rain to 'temper' their resolve. Songs of endurance echo through the halls.",
    "Wallborn Day: On the fortress’s founding date, children born within its walls are honored with blessings and painted sigils of protection.",
    "Shieldfeast: Held mid-winter after the year’s last patrol. A communal banquet is thrown inside the armory, symbolizing safety earned."
  ],
  "Garrison": [
    "Shieldcoin Day: Held at the start of every fiscal year. A ceremonial coin is placed under each guard’s boot to honor those who died in service.",
    "Bannerwind Festival: Celebrated in late spring when winds are strong. Garrison banners are flown at full height, and soldiers recount tales of valor.",
    "Oathsteel Eve: On midsummer’s night, fresh recruits swear oaths by candlelight and temper blades in oil as a rite of passage.",
    "Bladecount: Observed every full moon. Weapons are laid out and tallied for inspection, followed by ceremonial drills under torchlight.",
    "Helm Day: At midsummer, the garrison polishes helms and places one on a ceremonial pole in the square, representing unity of command.",
    "Patrol End: Marked on the last day of a long campaign season, returning soldiers tie knots in red cords and place them on gates as thanks for safe returns."
  ],
  "Hidden": [
    "Veilwalk Eve: Held during the darkest new moon in winter. Participants wear masks and walk shadowed paths in total silence to honor secrecy.",
    "Murmur Day: Celebrated in mid-autumn. Messages are whispered through walls or passed in code, paying tribute to the unseen hands that protect the place.",
    "Cloaklight Festival: On the eve of spring equinox, faint lanterns are hung in caves or alleys — barely visible, yet always present. A festival of subtlety.",
    "Silent Tithe: Celebrated in the dead of winter. Locals leave anonymous offerings in shadowy alcoves to honor unknown protectors or guardians.",
    "Twilight Drop: Held during dusk of the last day of the month. Gifts or messages are quietly left at designated spots and never acknowledged openly.",
    "Mistbound Day: On fog-heavy mornings in early spring, locals wear hoods and speak only in whispers, blending into the world as part of a ritual of humility."
  ],
  "Infested": [
    "Purgewake Festival: Held just after the first frost, when pests are least active. Fires and incense are lit to drive out lingering vermin or spirits.",
    "Scourge Vigil: Celebrated on the night before the new year. Everyone stays indoors and tells stories of survival to honor the resilience of the living.",
    "Ashbristle Day: On the first dry day of summer, thornbush bundles are burned around the perimeter as a warding ritual against corruption."
  ],
  "Isolated": [
    "Signal Bloom: Held at the first bloom of spring. Locals send up colored smoke or kite-signals to connect with distant outposts.",
    "Companion’s Turn: In late autumn, people exchange symbolic “roles” (e.g., healer, hunter, teacher) to ensure no one feels alone in their duty.",
    "Torchmarch Eve: Held on the first dark moon of spring. Villagers march around the perimeter with burning brands, singing chants to ward away infestation.",
    "Moltsend: On the day the first insect carapace or nest is found in late summer, bonfires are lit with bitter herbs and sulfur. Celebrated to purge corruption.",
    "The Sealing: At the start of winter, doors and windows are ritually sealed with wax or paint sigils to keep creeping things at bay."
  ],
  "Mining Camp": [
    "Pickbright Day: Celebrated the morning after the first new vein is struck each year. Tools are polished and drums echo deep into the tunnels.",
    "Dustrest Day: Held every seventh week, all work stops for a day of feasting and storytelling by lanternlight to rest weary bodies and minds.",
    "Deepcall Festival: On the summer solstice, horns are sounded into the depths to ‘wake the stone spirits.’ Echoes are interpreted as omens for the year.",
    "Hammerfall Eve: Celebrated the night before new tunneling begins. Pickaxes are tapped in rhythm and hung in rows to 'bless' the path forward.",
    "Veinfire: Held during midsummer. Gems and ores are arranged into mosaic patterns on stone altars and lit with oil to honor the riches of the earth.",
    "Lanternbound Day: Observed during the last new moon before winter. Miners share stories by shared lamplight, pledging to guide one another through dark days."
  ],
  "Nomadic": [
    "Trailfire: Celebrated on the last day of winter, camps light fires in a long line to honor paths yet taken and those who came before.",
    "Wanderwake: On the first full moon of spring, families pack up and unpack camp in a symbolic gesture of readiness for travel.",
    "Skycloth Festival: Mid-summer, tents and banners are dyed with natural colors under the open sky to bless future journeys.",
    "Pathsong Day: Every equinox, elders share old travel songs and lore beside the fire. Celebrated to preserve memory and voice.",
    "Saddleblessing: At the first thaw, each mount is gifted with a garland or charm for protection. Celebrated for travel safety.",
    "Echoesend: On the last day of autumn travel, people shout names of loved ones into the wind. Celebrated to feel their presence on the road."
  ],
  "Overgrown": [
      "Greenrise: Celebrated in early spring, vines and growth are cleared only to be ritually replanted, honoring the cycle of wild reclaiming.",
      "Rootweave Festival: Mid-autumn, children and elders weave roots and grasses into totems left in abandoned places.",
      "Thornsday: On the summer solstice, people paint symbolic scratches on their arms to show respect for the land’s hidden defenses.",
      "Mosschant: On the dampest day of the season, a chorus of low hums is sung beneath great boughs. Said to appease sleeping forest spirits.",
      "Shadelight Day: When light filters strongest through the canopy (mid-summer), locals dance in dappled clearings in silent reverence.",
      "Vinefast: One day each year, all cutting tools are put away and no clearing is allowed. Celebrated to acknowledge the land's right to overtake."
  ],
  "Port": [
    "Harborcall: At the start of sailing season, horns are blown from the docks and offerings are cast into the tide. Celebrated to bless departures.",
    "Mastlight Festival: On the longest day of summer, every docked ship raises lights up its mast to mimic stars. Celebrated for safe navigation.",
    "Catchshare Day: After the first large catch of the year, a portion is shared freely on the docks. Celebrated to honor sea generosity.",
    "Dockdance: On the last full moon of autumn, musicians perform on planks while people dance in rhythm with the waves.",
    "Stormfare: Midwinter, sailors and families tell tales of storms survived and name lost vessels in candlelit vigils.",
    "Saltbake Day: Held during the driest week, salt is used to preserve foods in public demonstrations. Celebrated for trade and survival."
  ],
  "Prison Settlement": [
    "Iron Silence: Once a year, all prisoners and guards observe one hour of total silence to honor those who never left the walls.",
    "Keyturn Day: Celebrated on midsummer, one symbolic door is opened and then closed in a ritual overseen by the oldest inmate or warden.",
    "Marking Night: On the first night of winter, prisoners and residents alike leave chalk or coal markings on shared walls to express grief or gratitude.",
    "Chain’s Eve: The night before a full moon, chains are struck against stone to create eerie music. Celebrated to express frustration or hope.",
    "Shackleburn: Held in early spring. Discarded restraints or broken locks are placed in a fire, symbolizing the hope of transformation.",
    "Wallwright Day: Mid-autumn, murals or inscriptions are made on internal walls with charcoal. Celebrated to reclaim identity through expression."
  ],
  "Remote": [
    "Skyreach Fast: On the longest day of the year, no outside contact is made. Celebrated to reconnect inwardly and with nature.",
    "Echoing Flame: One night in late winter, a single fire is lit on a high place. Communities look for its reflection in distant signals.",
    "Stillwind Day: When the wind halts in mid-autumn, locals pause all work and sit outside in quiet, listening to the landscape.",
    "Solitude Vigil: Celebrated on the shortest day. Residents take turns keeping a lone lantern lit from dusk till dawn.",
    "Supplythank: Marked the day the first winter stockpile is sealed. A communal meal is shared and each person thanks the one who packed theirs.",
    "Starchant: On the clearest night of the year, stargazing is paired with humming or long notes sung to the sky. Celebrated to feel less alone."
  ],
  "Sacred Site": [
    "Sanctuary Bloom: Celebrated at the first flowering of sacred plants. Offerings are left at shrine bases to mark spiritual awakening.",
    "Veilthin: At the full moon closest to midspring, people walk barefoot through holy spaces, whispering confessions into the ground.",
    "Lightfall: On the equinox, white stones are arranged to reflect sunlight into a central altar or pool. Celebrated as a moment of divine focus.",
    "Pilgrim’s Rest: A day of storytelling and rest at midsummer, where travelers leave tokens behind and bless the site anew.",
    "Divine Whisper: During the calmest night of the year, prayers are spoken into reeds or wind-chimes. Celebrated to give voice to the unseen.",
    "Blessed Ember: During the coldest week, embers from sacred flames are shared in lanterns and placed at household thresholds for protection."
  ],
  "Trade Hub": [
    "Ledgerlight Festival: On the first day of each fiscal season, illuminated scrolls are paraded through the streets and burned to reset fortunes.",
    "Merchant's Moon: Held on the last full moon before harvest, deals are struck and sealed under moonlight. Celebrated with late-night bazaars.",
    "Barterday: One day per season, coin is banned and only trades are permitted. Celebrated to honor trust and relationships.",
    "Sealmark Day: New artisans present their stamps, sigils, or brands in public. Celebrated to welcome innovation into the market.",
    "Wagonbless: Before the first big outbound caravan of spring, wheels and beasts are anointed with oils and ribbons.",
    "Banner Rise: Held at midmorning of the year’s longest market day. Each guild or merchant group raises its banner and offers a public gift."
  ],
  "Military Outpost": [
    "Drillfast: A competitive fast held just before the training season, to sharpen resolve. Celebrated with chants and mock duels at sundown.",
    "Sentry's Rest: On the first night of spring, sentries are ceremonially relieved by peers for one hour, honored with a hot meal and song.",
    "Linehold Day: At the end of a hard season, each unit paints a symbolic line outside the outpost. None may cross until the morning.",
    "First March: On the first thawed path of the year, a short parade is held around the outpost. Celebrated for discipline and renewal.",
    "Shieldring: On the summer solstice, shields are stacked in circles while stories of past glories are shared within them.",
    "Watchfire Eve: On the longest night, a fire is kept burning on every wall or gate. Celebrated for vigilance and shared protection."
  ],
};

export const HolidaysByTerrainMapping: Partial<Record<TerrainTypes, string[]>> = {
  Coast: [
    "Netmender's Rest (Late Winter): A day for repairing nets and honoring the hands that work the sea. Families gather in coastal sheds to share warm meals and stories.",
    "Stormwake Eve (Mid-Spring): Celebrated the evening before seasonal storms arrive. Bonfires are lit on beaches to ward off ill winds.",
    "Tideward Day (First High Tide of Summer): Sailors make offerings to tide shrines before departing for voyages.",
    "Shellfire Night (Late Summer): Children burn dried seaweed in lanterns shaped like fish and shell creatures.",
    "Seabound Oath (Autumn Equinox): New sailors take their first oaths under the setting sun, marking a rite of passage.",
    "Driftmoon Festival (Full Moon in Late Autumn): Driftwood sculptures are set afloat by moonlight to carry dreams to the deep."
  ],
  Desert: [
    "Mirage Day (High Summer): Dancers perform under the heat mirage to symbolize illusions of hope and survival.",
    "Scorchsend (End of Dry Season): A ritual of shared water and silent gratitude for endurance.",
    "Duneguard Vigil (New Moon of Spring): Watchfires are kept all night to protect against spirits that roam when the dunes shift.",
    "Cactus Light (Mid-Spring Bloom): Lanterns are hung from blooming cacti in celebration of hidden beauty.",
    "Suntrail Festival (Summer Solstice): A barefoot walk on sun-warmed stone, followed by sand-painted blessings.",
    "Glasswind Day (First Windstorm of Autumn): Shards of desert glass are exchanged as tokens of protection."
  ],
  Forest: [
    "Saprise (Early Spring): First sap is tapped, and tree totems are blessed for health and growth.",
    "Hollowdance (Mid-Autumn): Dancers wear carved wooden masks and spin among the trees at dusk.",
    "Fawnday (First Birth of Spring Wildlife): Quiet walks in hopes of glimpsing a fawn, followed by wreath offerings.",
    "Leafturn Vigil (First Red Leaf of Fall): Observers sit still in the woods to hear the ‘voice of change.’",
    "Bramblefire (Late Summer): Bramble thickets are trimmed and burned to protect paths and honor wild spirits.",
    "Rootward Day (Winter Solstice): People gather around large tree roots and whisper wishes into the soil."
  ],
  Jungle: [
    "Mistbloom Festival (Early Wet Season): Glowing fruit is hung at entrances to guide jungle travelers.",
    "Vinebraid Day (End of Dry Season): Community braids vines into hanging banners to ward off creeping dangers.",
    "Underleaf Night (Mid-Summer): Observers walk beneath the canopy in silence, listening for ancestral voices.",
    "Raincall (First Rain of Season): Children beat drums on broad leaves to summon more rainfall.",
    "Canopy Chime (Longest Day of Year): Wind chimes are suspended in the treetops to invite sky spirits.",
    "Sporeveil (New Moon in Wet Season): Fungal caps are collected and arranged into glowing spirals to ward off disease."
  ],
  Hills: [
    "Skyroll (Spring Equinox): Blankets are rolled down grassy slopes in celebration of movement and balance.",
    "Echofeast (Full Moon in Summer): Tables are set on hilltops and echoed calls signal the start of the meal.",
    "Windthread Day (Late Autumn): Ribbons are tied to posts on windy peaks and wishes are spoken aloud.",
    "Stonecradle (First Frost): Small cairns are built as symbols of endurance and peace.",
    "Hilltide Song (Summer Solstice): Groups chant harmonic songs on opposing hills to ‘stitch’ the valley.",
    "Lanterntrail (Early Winter): Lanterns are set along ancient footpaths to guide homeward walkers."
  ],
  Mountains: [
    "Cragwatch (Late Summer): High ledges are manned with watchers who retell old warnings through song.",
    "Icebind Day (First Snow): Gloves and ropes are blessed for safety before the climbing season begins.",
    "Peakveil (New Moon in Spring): Mist nets are strung and spirits of the mountain are asked to show mercy.",
    "Torchreach (Winter Solstice): Fires are lit from base to peak to ward off darkness in all layers of the land.",
    "Echoforge (Autumn): Blacksmiths sing as they work, believing echoes hammer strength into their tools.",
    "Stonegrace (Spring Melt): Locals clean scree paths and leave offerings to prevent rockslides."
  ],
  Plains: [
    "Prairiedust Day (Late Spring): Colored powders are thrown from horseback to mark the return of herds.",
    "Wheatwatch (Mid-Harvest): People watch the fields from dusk till dawn, protecting them with songs.",
    "Horizonfast (Winter Solstice): A day of quiet facing west, in reflection of the year's passing.",
    "Skythread (Spring Equinox): Tall poles are wrapped in streamers to ‘tie’ clouds to the earth.",
    "Fieldborn Day (First Sprouting): Seeds are cast into the wind and tiny effigies are planted in the soil.",
    "Stormmarch (Start of Rainy Season): Drums mimic thunder to march in rhythm with the coming storms."
  ],
  River: [
    "Springflow Day (First Thaw): Tributaries are decorated with fresh flowers and water is tasted with reverence.",
    "Ferrydawn (Mid-Spring): Ferries run from dawn to dusk offering free passage in honor of journey spirits.",
    "Reedveil (Early Summer): Reeds are woven into masks to be worn during sunset river dances.",
    "Moonmirror (Full Moon in Summer): Floating silver bowls are set afloat, catching moonlight and reflecting wishes.",
    "Watersway (Autumn Equinox): A single boat travels the full stretch of the river, carrying family blessings.",
    "Riftlight Day (Midwinter): Cracks in frozen river ice are filled with glowmoss to honor the river’s sleeping face."
  ],
  Swamp: [
    "Fogblessing (Late Autumn): Spirits are called by name in the fog, and gifts are left at the edge of pools.",
    "Toadwake Day (Spring Rain): First toads are honored with gentle drumming and shared tales.",
    "Willowchant (New Moon): Songs are whispered to weeping trees, asking for secrets of the deep water.",
    "Fenlight Vigil (Mid-Summer): Glowmoss is floated in baskets across the bogs to light lost souls' paths.",
    "Mirekind Day (Winter): Elders tell stories of ancient creatures who first walked the mud.",
    "Briarrest (End of Wet Season): Brambles are trimmed and burned while chants offer thanks for protection."
  ],
  Tundra: [
    "Snowbreathe (First Windless Night): People stand silent outside to 'hear the breath of the land.'",
    "Longgleam (Full Moon in Midwinter): Ice crystals are collected and arranged to reflect moonlight in circles.",
    "Packshare Day (End of Deep Winter): Families gather and split food evenly, no matter wealth or standing.",
    "Rimeforge (Late Autumn): Tools are ritually struck against stone to awaken the sleeping heat of the earth.",
    "Shardtrail Festival (Spring): People create paths using shards of ice, lighting the way for travelers.",
    "Auroralace (Peak Aurora Season): Cloaks are embroidered beneath the lights to honor ancestors."
  ],
  Underground: [
    "Glowrest (Midwinter): Phosphorescent minerals are arranged into glowing mosaics to calm restless spirits.",
    "Tunnelbeat Day (Spring): Drums are played at crossroads to ‘wake’ the passages from winter sleep.",
    "Rockpulse (Summer Solstice): Miners thump out heartbeats on cave walls to celebrate unity.",
    "Gemquiet (New Moon): No light or sound is permitted for one hour in deep caverns. Celebrated for introspection.",
    "Stonestep (First Snow Above): Surface is acknowledged by placing offerings in airshafts and chimneys.",
    "Veinlight Festival (Autumn): Gemstones are polished and worn as symbols of ancestral protection."
  ],
  Urban: [
    "Founders' Ring (Early Spring): Circles are drawn in chalk around old plazas and stories retold within them.",
    "Cornermark Day (Summer Solstice): Each city block is adorned with colored banners to show unity.",
    "Bellnight (Late Autumn): Bells ring through the city at dusk to call peace among citizens.",
    "Keykeeper’s Vigil (Midwinter): People place symbolic keys at doorways in remembrance of trusted guardians.",
    "Skymarket Festival (High Summer): Rooftops host markets and performers in celebration of community heights.",
    "Gratestep Day (Autumn Equinox): Streets are swept clean and public steps are painted to honor open passage."
  ]
};

export const HolidaysByClimateMapping: Partial<Record<ClimateTypes, string[]>> = {  
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

export const HolidaysByMagicLevelMapping: Partial<Record<MagicLevel, string[]>> = {
  None: [
    "Lantern Hands (Winter Solstice): A practical holiday where community lanterns are relit and tools blessed for another hard year.",
    "Maker’s March (Early Spring): Honoring inventors, farmers, and builders with public fairs and problem-solving games.",
    "Binding Oath Day (First Week of Summer): Contracts and deals are ceremonially renewed in front of elders and peers.",
    "Stone’s Faith (Late Autumn): A quiet holiday of gratitude, where people place hands on stone walls or hearths and whisper thanks.",
    "Dustwatch Day (End of Harvest): Communities gather to repair roads, sweep public squares, and finish the year’s chores together.",
    "Wordsend (Midwinter): Old books and letters are read aloud to preserve memory in the absence of magic."
  ],
  Low: [
   "Wispwatch (First Fog of Autumn): Small lights are carried through town to honor ancestors who may visit in the mist.",
    "Charmkind Day (Spring Equinox): Artisans gift simple good luck charms made with thread, bone, or clay.",
    "Candlebind (New Moon in Winter): Families light handmade candles believed to ward off misfortune.",
    "Sootspell Day (End of Summer): Hearths are cleaned and minor warding symbols are drawn in soot around homes.",
    "Whisperwind (Early Spring): Messages are tied to kites or tossed on the breeze, hoping spirits carry them.",
    "Rainchant (First Thunderstorm): Light songs and chants are performed to welcome nourishing rain, thought to encourage better harvests."
  ],
  Moderate: [
    "Glintswell (Spring Bloom): Magic wells and fountains are polished, and offerings are tossed in to keep magic flowing cleanly.",
    "Runefrost Eve (First Frost): Old runes are retraced on doors and hearths for winter protection.",
    "Lightleap Day (Summer Solstice): Mages display minor spells in synchronized dances of light and air.",
    "Sealweave Festival (Early Autumn): Local wizards reinforce magical protections on bridges, gates, and walls.",
    "Scrollwake (First Day of School Season): Young learners receive enchanted scrolls or trinkets from elders in good luck ceremonies.",
    "Dust of Ashes (Midwinter): Ash from fire spells is collected and painted into protective wards against sickness."
  ],
  High: [
    "Arcflare Festival (Late Summer): Grand lightshows and illusions fill the sky in a celebration of magical artistry.",
    "Leydrift (Spring Equinox): Communities gather at leyline nexuses for group meditation and magical attunement.",
    "Wandbearers’ Day (First Full Moon of Summer): Mages pass down their first wand or focus to an apprentice.",
    "Etherwake (Autumn Equinox): Floating lanterns are lit with spark spells and sent into the sky or across rivers.",
    "Hexfold (First Week of Winter): Hexcrafters demonstrate complex spell-weaving competitions in public squares.",
    "Soulmark Day (Early Spring): People have temporary sigils drawn on their skin to represent their magical nature or aspirations."
  ],
  Mythic: [
    "Veil’s Shatter (Twilight of the Longest Night): Celebrates the ancient moment when magic flooded the world. Massive rituals reenact the event.",
    "Eclipsewake (Every Solar Eclipse): Mythic-level wards are recast as celestial bodies align, said to keep reality intact.",
    "Myrrhchant (Midwinter): Rare spell ingredients are traded in silent reverence; thought to please primal arcane entities.",
    "Ascendant Flame (Midsummer): The flame of creation is symbolized with mythic fire, often conjured by archmages.",
    "Divination Day (Last Day of Year): Oracles from across the land give prophecies in one unified ritual; believed to shape fate itself.",
    "Eldersign Eve (Full Moon in Spring): Great magical constructs light up across the land, revealing ancient symbols said to predate time."
  ],
};


export const HolidaysByDomainMapping: Partial<Record<DomainTypes, string[]>> = {
  "Arcana": [
    "Cipherday (First New Moon of Spring): Mages and scholars exchange riddles, puzzles, and cryptic scrolls in celebration of hidden knowledge.",
    "Sigilkind (Autumn Equinox): Towns draw ancient sigils in chalk on doors and stones to attract or repel magical forces.",
    "Runebloom (Mid-Spring): Magic users plant enchanted seeds that briefly bloom into glowing symbols, honoring the living nature of magic.",
    "Silence of the Sphere (Every Eclipse): A day of magical fasting and quiet reflection to honor the source of arcane power.",
    "Vaultlight (First Snowfall): Spellbooks are aired in moonlight and rare tomes are read aloud in public squares.",
    "Leythrum (Summer Solstice): Communities gather at leyline crossings to sing harmonic spells and offer crystals to the deep weave."
  ],
  "Arts": [
    "Paintwake (Spring Equinox): Walls and sidewalks are painted freely with vibrant murals; no design is off-limits.",
    "Lyreday (First Day of Summer): Music fills every corner as bards, singers, and dancers perform across the settlement.",
    "Chiselbless (Late Autumn): Sculptors and artisans unveil creations dedicated to the beauty in labor.",
    "Masqueveil (First Frost): Locals don handmade masks and act out improvised tales in the streets.",
    "Scriptkindle (Midwinter): Poets and scribes read work by candlelight; paper lanterns bearing verses are released.",
    "Colorfall (Late Summer Rain): Dyes and powdered pigments are flung in celebration of spontaneous beauty and joy."
  ],
  "Beauty": [
    "Reflections Day (Spring Bloom): People adorn themselves with blossoms and gather by lakes or mirrors for shared praise.",
    "Gracewalk (Summer Solstice): A gentle parade where participants wear their finest and move in unison to soft music.",
    "Petalveil (First Morning Fog): Flowers are scattered in public baths and fountains; said to cleanse body and soul alike.",
    "Glorylight (Twilight of Longest Day): Golden threads are braided into hair or clothing and lit in the sunset.",
    "Dewkiss Festival (Early Spring Rain): Participants let morning dew fall on their faces in a silent ritual of natural beauty.",
    "Finelight (Late Autumn Dusk): Torches dipped in scented oils are lit and placed in windows as a call to beauty in darkness."
  ],
  "Chaos": [
    "Festival of Fools (First Thunderstorm of Spring): Public pranks, backwards clothes, and rule-breaking games dominate the day.",
    "Wreckmarch (Late Winter): Furniture and pottery are symbolically broken and repaired to welcome disorder into order.",
    "Stormglide (During Sudden Downpour): Participants race barefoot through rain-slick streets, invoking chaos-born joy.",
    "Coinflip Day (Undated): Every town decision is made by flipping coins or drawing lots for one day each year."
  ],
  "Commerce": [
    "Coinkindle (Start of Trade Season): New coinage is polished and shared to bless financial prosperity.",
    "Marketday of Weighing (Autumn Equinox): Merchants bring their largest goods for display and ritual weighing.",
    "Silverbell Eve (Winter Solstice): Tiny bells are traded among friends to honor deals made and broken.",
    "Inkmark Day (Late Spring): Contracts, ledgers, and deals are ritually reviewed and renewed.",
    "Guildfire Festival (First Full Moon of Autumn): Guilds host contests and feasts to recruit and boast their services.",
    "Barterbless (Midsummer): All sales pause and only bartering is permitted, reinforcing personal trade values."
  ],
  "Community": [
    "Hearthhold (Winter Solstice): Families and neighbors share fire and food in communal halls.",
    "Kindreach Day (Mid-Spring): Youth and elders exchange stories and gifts across generations.",
    "Bricklink Day (First Day of Construction Season): A communal structure is built or repaired together, stone by stone.",
    "Circlefeast (Every Full Moon): Households eat outdoors in shared circles, offering plates to all passersby.",
    "Welcomelight (Late Autumn): Lanterns are hung at every doorway to signal hospitality to travelers.",
    "Handspan Day (Late Summer): People clasp hands in long chains across bridges, walls, and roads to show unity."
  ],
  "Death": [
    "Veilfall (Late Autumn): Veils are worn and names of the dead whispered into flowing water to guide them onward.",
    "Emberwake (Winter Solstice): Ashes from hearths are collected and placed on ancestor stones.",
    "Quietrest (Midwinter): A full day of silence in honor of all those who can no longer speak.",
    "Last Gift (Day Before Spring Begins): Graves are visited and offerings of food or keepsakes are left behind.",
    "Bell of the Gone (First Misty Morning): A single large bell is rung once per name of the dead that year.",
    "Shadekind (Twilight After Storm): Black ribbons are tied to trees and poles; stories of lost ones are shared aloud."
  ],
  "Decay": [
    "Rotsong (Late Summer): Melodies are played on rusted or cracked instruments to celebrate the beauty of decline.",
    "Spoilwake (Start of Autumn): Fruits are left to ferment and offerings given to the spirits of entropy.",
    "Wormgift Day (Mid-Spring): Compost and soil are blessed and spread, honoring decay as nourishment.",
    "Crackfall (First Freeze): Broken pottery is ritually scattered near tree roots to mark inevitable breaking.",
    "Ashrain (Last Day of Harvest): Ashes from the year’s fire are cast into gardens to blend destruction and growth.",
    "Moldveil Festival (During Humid Week): Mosaics are made from moss and discarded items, celebrating cycles."
  
  ],
  "Dreams": [
    "Sleeper’s Lantern (Mid-Autumn): Dreams are recorded or shared over warm drinks under starlight.",
    "Mistdream Day (Early Morning Fog): Silent walks and whispered wishes mark a day of deep introspection.",
    "Starweave (Spring Equinox): Threads are tied between trees or buildings to represent dreams in the wind.",
    "Wanderrest (Every Blue Moon): Citizens nap in public gardens and decorate blankets with symbolic runes.",
    "Nightfeast (Longest Night): People stay awake through the night sharing their most vivid or recurring dreams.",
    "Oneirotide (New Moon of Summer): Dreamers are asked to sleep with certain herbs to induce prophetic visions."
  ],
  "Fate": [
  "Threadbind (Autumn Equinox): Colored threads are braided into hair or clothing to represent life paths.",
    "Crossroads Day (Late Spring): People leave tokens at literal crossroads to ask for divine direction.",
    "Starfall Night (Meteor Shower): Wishes are made as stars pass; it's said they choose whom to favor.",
    "Loomchant (Winter Solstice): Elders chant stories believed to anchor or twist fate for the coming year.",
    "Turningstep (First Snow Melt): A symbolic 'step forward' is taken across bridges or thresholds.",
    "Unseen Hand Day (Day Before Major Decisions): Dice, cards, and fate tools are drawn ceremonially for guidance."
  ],
  "Forge": [
    "Sparkmark Day (First Hammerstrike of Spring): Tools are blessed in fire and stamped with maker’s marks.",
    "Anvilwake (Summer Solstice): Public smiths work throughout the day, celebrating the craft openly.",
    "Coalfire Eve (Winter's Peak): Bonfires burn low and blacksmiths share tales by the forge.",
    "Moldcrack (Late Autumn): Molds are shattered after use in a ritual of impermanence and rebirth.",
    "Rivetday (First Rain of Spring): Iron nails are driven into new beams or trees as protective wards.",
    "Glowtide (Longest Day): Metal glows are showcased and steelworks left exposed for divine blessing."
  ],
  "Freedom": [
    "Chainbreak (Spring Equinox): Old symbols of bondage are shattered in public ceremonies.",
    "Windstep Day (First Windy Day): Kites, cloaks, and flags are flown to celebrate movement and choice.",
    "Gatewide Festival (Summer Solstice): City gates remain open and guarded less, welcoming all travelers.",
    "Voicewake (Day After New Moon): Every voice, including the most marginalized, is given a chance to be heard.",
    "Unbound Fire (Mid-Autumn): Fire pits are lit without walls or holders, representing raw potential.",
    "Flightwatch (Bird Migration Week): People carve wings onto wood or cloth and float them from high places."
  ],
  "Grave": [
    "Stoneveil (First Snow): Grave markers are brushed clean and wrapped in soft cloth.",
    "Gravenight (Every Third Moon): Watchers sit vigil through the night beside burial grounds.",
    "Dustmarch (First Wind of Spring): Ash from past fires is scattered across the cemetery paths.",
    "Final Light Festival (Autumn Dusk): Lamps are placed in graveyard trees to help lost souls find peace.",
    "Rootwake Day (Late Autumn): Trees growing from old graves are honored with offerings and blessings.",
    "Bonechant (Deepest Winter Night): Soft chimes made from bone or shell are hung in the wind, calling rest."
  ],
  "Harvest": [
    "Bountywake (Autumn Equinox): A day of gratitude and open tables, where all are invited to share the harvest.",
    "Threshgold Day (First Full Moon of Harvest): Wheat and coins are braided into garlands and worn in celebration.",
    "Fieldbless (Spring Planting): Seeds are cast with words of thanks and hope to the land spirits.",
    "Scarecrow Night (Late Autumn): Effigies are built and burned to ward off hunger and loss.",
    "Sicklelight Festival (During Grain Moon): Crescent shapes and tools are honored as symbols of survival.",
    "Ciderfeast (End of Apple Season): Drinks are shared, and games celebrate the sweetness of a year’s work."
  ],
  "Hunt": [
    "Trackfire Day (First Snowfall): Campfires are lit where tracks first appear, to mark the start of the hunt.",
    "Hornwake (Spring Dawn): Horns are sounded from high places to signal a day of wild pursuit and joy.",
    "Feast of the First (First Catch of Season): The first hunted animal is shared among all.",
    "Stalker's Moon (Full Moon of Summer): Hunters walk in silence through woods or streets to honor patience.",
    "Beastmark Day (Mid-Autumn): Hunters mark themselves in paint or blood to emulate the wild.",
    "Arrowbind (Late Spring): Arrows are fletched and tied with colored thread to seek divine aim."
  ],
  "Invention": [
    "Sparkmaker's Day (First new moon of spring): Inventors unveil new creations to the community. Celebrated to inspire innovation and problem-solving.",
    "Blueprint Vigil (Last week of winter): Designs are drafted and burned as offerings to gain divine inspiration. Celebrated to clear mental clutter for new ideas.",
    "Cogdance Festival (Summer solstice): People wear mechanical costumes and mimic gears in dance. Celebrated to honor synergy between people and machines.",
    "Tinker’s Flame (Mid-autumn): Workshops stay open all night, with forge-fires lit in homage to creators. Celebrated to spark perseverance.",
    "Golem Parade (First frost): Animated constructs lead a festive march through the streets. Celebrated for ingenuity and collaboration.",
    "Nullbreaker Day (Every four years, during a rare planetary alignment): Old devices are ceremonially dismantled. Celebrated for the value of release and creative destruction."
  ],
  "Judgment": [
    "Scales of Morrow (Spring equinox): Communities gather to review disputes and resolve longstanding tensions. Celebrated to balance wrongs.",
    "Echo of Verdicts (Early summer): Ancient rulings are recited in open forum. Celebrated for historical reflection and guidance.",
    "Gavelday (Mid-autumn): Judges wear ceremonial robes and re-enact legendary trials. Celebrated to uphold justice.",
    "Light and Ledger (Last harvest moon): Ledgers of transgressions and good deeds are ritually burned. Celebrated to forgive and move forward.",
    "Truthwarden Night (Winter solstice): Truth is tested with riddles and confessions around bonfires. Celebrated to expose falsehood and embrace honesty.",
    "Balancewake (Late spring): Symbols of law and chaos are weighed in ceremony. Celebrated to contemplate moral complexity."
  ],
  "Knowledge": [
    "Scrollfire Festival (Mid-winter): Outdated knowledge is respectfully burned to make way for new study. Celebrated to honor learning cycles.",
    "Inkwell Moon (First full moon of summer): Scribes and scholars host public lectures by moonlight. Celebrated to spread wisdom.",
    "Archivist’s Dawn (Spring equinox): Libraries open before dawn for silent reading. Celebrated in gratitude to record-keepers and teachers.",
    "Quillmark (First frost): Calligraphy contests and riddle duels are held in plazas. Celebrated for cleverness and intellectual beauty.",
    "Loretide (Late summer): Traveling sages visit towns and swap stories. Celebrated to preserve oral histories.",
    "Day of Dissonance (Every three years, during a rare eclipse): Contradictions in sacred texts are debated publicly. Celebrated for the pursuit of deeper truth."
  ],
  "Life": [
    "First Breath (Spring’s first rain): Midwives and healers are honored; newborns are blessed. Celebrated to cherish beginnings.",
    "Greenspring (Vernal equinox): Gardens are planted en masse. Celebrated to nurture growth and community.",
    "Heartbeat Vigil (Midsummer night): Drums are played softly for hours, mimicking the heart’s rhythm. Celebrated to attune to life's pulse.",
    "Quickening Feast (Late summer): Feasts of fruits and fresh harvests are shared. Celebrated for abundance and health.",
    "Lanternbirth (Winter solstice): Lanterns are lit to represent unborn souls. Celebrated with quiet gratitude for potential.",
    "Pulsewake (Full moon of late spring): Runners carry sacred water between towns. Celebrated to spread vitality and connection."
  ],
  "Light": [
    "Dawnrise (First day of the year): Everyone watches the sunrise in silence. Celebrated to embrace clarity and renewal.",
    "Lumina (Summer solstice): Communities adorn homes with mirrors and prisms. Celebrated to reflect truth and beauty.",
    "Glownight (Midsummer full moon): People wear glowing paint and tell stories in darkness. Celebrated to carry light within.",
    "Kindlefast (Late autumn): No fires are lit until sundown, then one flame is shared house to house. Celebrated to unify communities.",
    "Radiant Path (Late spring): Walkways are lit with golden lanterns. Celebrated for guidance and hopeful direction.",
    "Brightwake (First thaw): Children release paper birds with reflective wings. Celebrated to welcome joy after darkness."
  ],
  "Magic": [
    "Mana Surge (Spring equinox): Spells are cast into the sky in brilliant displays. Celebrated to revel in arcane power.",
    "Arcanum Eve (Winter solstice): Mages gather for silent meditation under the stars. Celebrated for introspection and cosmic awareness.",
    "Leyline Bloom (Midsummer): Crystals are buried to 'nurture' magical earth currents. Celebrated to heal magical imbalance.",
    "Rite of Mirrors (Full moon of spring): Illusions and glamours are displayed in artistic competition. Celebrated for illusion and truth.",
    "Spellkindle (First snowfall): Cantrips are exchanged like gifts. Celebrated to foster camaraderie among practitioners.",
    "Nullwake (Rare lunar eclipse): No magic is used for a full day. Celebrated to respect boundaries and magical restraint."
  ],
  "Moon": [
    "Silverwatch (Full moon of autumn): Night vigils are held under the open sky. Celebrated to honor mystery and reflection.",
    "Moonveil (New moon of spring): People wear shimmering cloaks and speak only in whispers. Celebrated to embrace secrets and silence.",
    "Lunarch's Blessing (First full moon after planting season): Fields and water are blessed under moonlight. Celebrated to promote fertility and balance.",
    "Tidecall (Full moon closest to midsummer): Ocean tides are celebrated with moon-dances and salt offerings. Celebrated to honor the moon's pull.",
    "Phasewalk (Quarter moon in midwinter): Participants meditate on transition and personal change. Celebrated for emotional clarity.",
    "Nightgleam (Blue moon): Rare celestial events are marked with stargazing and storytelling. Celebrated to revere cosmic wonder."
  ],
  "Nature": [
    "Verdant Bloom (First week of spring): People plant communal gardens and release insects. Celebrated to welcome life's return.",
    "Rootreach (Mid-autumn): Ceremonies are held around great trees. Celebrated to deepen one's bond with the land.",
    "Stone & Petal Day (Late spring): Flowers are braided into stone sculptures. Celebrated to balance resilience and fragility.",
    "Wildheart Day (Midsummer): Townspeople roam barefoot and feast outdoors. Celebrated to rekindle wild instincts.",
    "Rainchant (First storm of spring): Songs are sung in the rain barefoot. Celebrated to show trust in natural forces.",
    "Equileaf (Autumn equinox): Leaves are collected and pressed into books. Celebrated to preserve fleeting beauty."
  ],
  "Order": [
    "Edict Day (First day of each season): Citizens recite key laws in public spaces. Celebrated to reaffirm civic duty.",
    "Harmonyfast (Full moon of midsummer): Disagreements are set aside for 24 hours. Celebrated to enforce peace and civility.",
    "Pillarwake (Late winter): Each community’s 'pillars' (leaders, elders, artisans) are honored. Celebrated to ground society.",
    "Sigilmark (Spring equinox): Orderly patterns are drawn on thresholds. Celebrated to invite structure and protection.",
    "Steady Sun (High noon of the longest day): Work halts for coordinated acts of maintenance. Celebrated for unity in labor.",
    "Gridlight Festival (Autumn): Streets are lit in geometric paths. Celebrated to map intentions and direction."
  ],
  "Peace": [
    "Stillwater Day (First thaw): Ceremonies held by calm lakes or rivers. Celebrated for serenity and internal quiet.",
    "Gentlehand (Early summer): Elders bless young people with oil or herbs. Celebrated to pass on healing wisdom.",
    "Trucebloom (Late spring): Flowers exchanged with neighbors and rivals. Celebrated to sow kindness and amends.",
    "Quietwatch (New moon in autumn): Towns observe a shared hour of silence. Celebrated to foster collective calm.",
    "Soothing Fire (Midwinter): Small, warm fires are kindled and shared with strangers. Celebrated to ease loneliness.",
    "Restwake (Day after the harvest): Work is forbidden and peace is encouraged. Celebrated to reinforce contentment."
  ],
  "Protection": [
    "Shieldlight (Spring equinox): Reflective shields are polished and displayed. Celebrated to ward off harm.",
    "Wallkeeper’s Day (Mid-autumn): Guards and sentinels are honored with food and songs. Celebrated for their vigilance.",
    "Circlefast (First snow): People draw protective circles around their homes. Celebrated to banish fear and invite safety.",
    "Vowstone Ceremony (Summer solstice): Oaths to protect are spoken before engraved stones. Celebrated to commit to others’ safety.",
    "Ironroot Day (Late spring): Trees and homes are symbolically “fortified” with charms. Celebrated to invoke resilience.",
    "Wardrise (New moon in late winter): Invisible wards are painted with chalk and recited over. Celebrated for unseen safeguards."
  ],
  "Sea": [
    "Tidewake (Spring’s first high tide): Offerings are cast into the sea for safe travels. Celebrated to honor maritime balance.",
    "Saltgift (Midsummer): Seafarers gift salt-preserved goods to landfolk. Celebrated for interdependence.",
    "Stormwatch (Autumn): Communities gather to tell stories of great storms survived. Celebrated for reverence and preparation.",
    "Pearlmoon (Full moon over calm seas): Diving contests and bioluminescent lanterns honor deep-sea mysteries. Celebrated for beauty and depth.",
    "Currentfall (Late spring): Children float paper boats with messages of hope. Celebrated to release burdens.",
    "Driftfast (Late summer): For one day, only fish caught without nets may be eaten. Celebrated to respect the sea’s generosity."
  ],
  "Secrets": [
    "Whisperwake (New moon of autumn): Citizens share anonymous confessions via notes on lanterns. Celebrated to unburden quietly.",
    "Veil Day (Early winter): Masks are worn and identities hidden in games. Celebrated for mischief and privacy.",
    "Silken Thread Festival (Late summer): Invisible ink and hidden messages are exchanged. Celebrated for clever concealment.",
    "Shroudfire (Spring dusk): Fires lit in clay pots release colored smoke—each color meaning a different vow. Celebrated to bind secrets in silence.",
    "Labyrinth Walk (Midnight of midsummer): People navigate hedge mazes blindfolded. Celebrated to honor the hidden path.",
    "Shadowtongue (Rare eclipse): Words are spoken backward in secret gatherings. Celebrated for cryptic wisdom."
  ],
  "Shadow": [
    "Ebonwake (Winter solstice): Candles are placed in windows to call shadows home. Celebrated to respect the unseen.",
    "Silhouettemask (Midspring): People paint their shadows and perform silent plays. Celebrated to explore duality.",
    "Duskmarch (Late autumn): A procession winds through unlit streets. Celebrated to embody shadows and ancestral memory.",
    "Umbrafest (New moon of summer): Dances are performed with cloaks and veils. Celebrated for elegance and concealment.",
    "Hollowlight (First fog of autumn): Myths of shapeshifters are reenacted in foggy fields. Celebrated to embrace ambiguity.",
    "Blackveil Night (Early winter): Meals are eaten in total darkness. Celebrated to deepen senses and remove judgment."
  ],
  "Storms": [
    "Thunderwake (First spring storm): People shout greetings to the thunder. Celebrated to welcome powerful change.",
    "Boltfeast (Midsummer): Charred meats and spicy dishes dominate feasts. Celebrated for storm's primal energy.",
    "Gale Dance (Early fall): Children fly streamers in strong winds. Celebrated for joy and surrender to chaos.",
    "Tempestwatch (Mid-autumn): Rooftops are blessed and fortified. Celebrated for survival and foresight.",
    "Skybrand Day (Summer solstice): Lightning-scarred trees are honored. Celebrated for endurance and awe.",
    "Stormveil (Late winter): Cloaks soaked in stormwater are hung over thresholds. Celebrated to ward off stagnation."
  ],
  "Sun": [
    "Solstice Flare (Summer solstice): Bright banners and feasts under the sun. Celebrated for illumination and life.",
    "Sungift (First warm day of spring): Gold-colored tokens are exchanged. Celebrated for gratitude and new beginnings.",
    "Goldenwake (Mid-autumn): Markets open at sunrise and close at noon. Celebrated to honor the fleeting sun.",
    "Heliarch Day (High noon festival): People stand in silence under the brightest sun. Celebrated for divine focus.",
    "Suncrown (Late spring): Wreaths of yellow flowers are worn. Celebrated to channel warmth and clarity.",
    "Blazebreak (End of summer): Cool water rituals and shaded songs celebrate balance. Celebrated to soothe overexposure."
  ],
  "Tempest": [
    "Rage of the Sky (First thunderstorm of the year): Drumming and wild dances mimic thunder. Celebrated for wild vitality.",
    "Lightning Reap (Late summer): Crops struck by lightning are revered as blessed. Celebrated to find grace in ruin.",
    "Tempestrun (Mid-spring): Runners race barefoot through mud. Celebrated for endurance and passion.",
    "Cloudbreak Vigil (End of storm season): Sky-gazers watch the clearing clouds. Celebrated for catharsis and change.",
    "Stormchord Day (Summer): Musicians try to mimic storms. Celebrated to give storm a voice.",
    "Gustborn (Autumn equinox): Kites with wind prayers are flown. Celebrated to harness chaos with hope."
  ],
  "Time": [
    "Chronofall (Autumn equinox): Leaves are gathered in hourglass shapes. Celebrated for cycles and memory.",
    "Hour's Edge (Winter solstice): Every hour is marked with a chime or bell. Celebrated to feel time’s weight.",
    "Pendulum Dance (Spring equinox): Couples sway in timed movements. Celebrated to feel harmony in motion.",
    "Secondwake (Leap day): Forgotten promises are fulfilled. Celebrated for redemption and rhythm.",
    "Timestitch (Late winter): Mending and repairs are done in silence. Celebrated to symbolically fix the past.",
    "Echolight (Full moon closest to new year): Ancestral stories are told precisely as remembered. Celebrated for history’s heartbeat."
  ],
  "Travel": [
    "Crossroads Day (Spring): Food is shared at road junctions. Celebrated for fellowship among wanderers.",
    "Mapweaver Festival (Autumn): Locals draw maps and exchange them with travelers. Celebrated to honor guidance.",
    "Wayfare Eve (Midsummer): Friends say temporary goodbyes and exchange tokens. Celebrated for sacred partings.",
    "Footstep Song (First snowfall): Songs are sung of paths once walked. Celebrated to remember journeys.",
    "Pilgrimwake (Mid-spring): Processions visit regional shrines. Celebrated for spiritual movement.",
    "Dustcloak Day (Late summer): Scarves are dyed with travel dust. Celebrated for protection and luck."
  ],
  "Trickery": [
    "Fooltide (Spring equinox): Trickster tales and light pranks abound. Celebrated to unsettle arrogance.",
    "Masked Truth (Autumn): Players switch roles for a day. Celebrated for empathy and humor.",
    "Jester’s Star (New moon of summer): Fireworks and illusions celebrate cleverness. Celebrated for joyful mischief.",
    "Slipday (Uncounted day in rare calendars): Nothing is recorded; all acts are deniable. Celebrated for chaos.",
    "Winkfast (Midwinter): Winking is the only permitted greeting. Celebrated for silent bonding.",
    "Cointurn (Late summer): Coin flips decide all minor decisions. Celebrated to embrace uncertainty."
  ],
  "Twilight": [
    "Gloaming Vigil (Spring): People sit on hillsides to watch the changing light. Celebrated for liminality.",
    "Duskmeld (Late autumn): Day and night festivals blend. Celebrated for coexistence and balance.",
    "Shadowgleam (Full moon of midsummer): Reflective clothing and soft lights honor evening beauty. Celebrated to blend seen and unseen.",
    "Mistchant (Early morning in autumn): Choral songs echo through fog. Celebrated to awaken softly.",
    "Twilight Truce (Winter): A single night of shared silence between rivals. Celebrated for stillness.",
    "Evenfall Market (Equinox): Markets open only at sunset. Celebrated to meet between worlds."
  ],
  "War": [
    "Ironwake (Spring): Weapons are cleaned and displayed, but not drawn. Celebrated to honor power with restraint.",
    "Fieldblood Day (Summer): Reenactments of historic battles are staged. Celebrated for memory and sacrifice.",
    "Shieldbond (Late spring): Soldiers exchange armor pieces. Celebrated for unity and brotherhood.",
    "Drumfire Eve (Night before autumn harvest): War drums echo through hills. Celebrated to stir strength.",
    "Trucebrand Day (Midwinter): Symbols of peace are burned, only to be reforged. Celebrated to remind of war's cost.",
    "Victoryfast (After first snow): Combat is forbidden for one day. Celebrated to reflect after triumph."
  ]
}