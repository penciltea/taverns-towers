import { DomainTypes } from "@/constants/settlementOptions"
import { SiteCondition, SiteSize } from "@/constants/site/site.options";

export const RELICS_BY_DOMAIN_MAPPING: Record<DomainTypes, string[]> = {
    "Magic": [
        "The Rune-Carved Eye: A preserved eye socket etched with a forgotten arcane script, said to grant visions of magical anomalies.",
        "Wand of the First Spell: A cracked wand rumored to have cast the first arcane cantrip ever recorded.",
        "Ash of a Dissolved Mage: Contained in a glass vial, these are the remains of a wizard who willingly transmuted into pure energy."
    ],
    "Arts": [
      "Brush of the First Painter: A worn brush said to have captured the very essence of color in its bristles.",
      "Lyre of the Eternal Song: An ancient instrument that plays melodies heard only in moments of deep emotion.",
      "Mask of the Silent Dancer: A delicately carved mask believed to grant grace and inspiration to performers."
    ],
    "Beauty": [
      "Brush of Eternal Grace: A silver-handled brush said to make anything touched by it more pleasing to the eye.",
      "Mirror of True Form: A hand mirror that shows the inner self reflected alongside the outer.",
      "Petal of the First Bloom: Preserved in amber, this flower is said to have blossomed when the goddess of beauty first wept."
    ],
    "Chaos": [
      "Coin of Wild Fortune: A two-faced coin that changes its faces every dawn.",
      "The Spindle of Madness: A broken spinning wheel that causes wild dreams in anyone who sleeps nearby.",
      "Shard of the Broken Rule: A twisted piece of lawstone from a courthouse that exploded during a divine upheaval."
    ],
    "Commerce": [
      "Scales of Honest Trade: A tiny, well-worn balance scale that always detects cheating.",
      "Coin Purse of the Wandering Merchant: This stitched leather pouch always has exactly enough for bread and shelter—for one night.",
      "Ledger of Binding Deals: An ancient merchant’s book that records promises written in blood, ink, or intent."
    ],
    "Community": [
      "Cup of Shared Waters: A simple clay mug from which no one ever leaves thirsty.",
      "Banner of the Hearthhall: A tattered banner said to rally kin and strangers alike in times of hardship.",
      "Stone of the Gathering Circle: Warm to the touch when held during communal prayer or song."
    ],
    "Death": [
      "The Veil-Shroud: A funerary cloth said to thin the boundary between the living and the dead when placed over the face.",
      "Bone of the Last Breath: A fingerbone from a saint who died peacefully, used in rituals to ease the dying.",
      "Lantern of the Quiet End: This blackened lantern burns with no visible flame, only illuminating those near death."
    ],
    "Decay": [
      "Rotwood Idol: A carved totem of soft, blackened wood that crumbles only when not watched.",
      "Fly-Catcher’s Bell: A tarnished bell that draws insects but also dispels minor blight when rung at dusk.",
      "Veil of the Corpse Queen: A funeral veil said to dissolve anything pure it touches—unless kissed by moonlight."
    ],
    "Dreams": [
      "Feather of the Sleepwalker: Taken from a bird seen only in dreams, it’s said to bring prophetic visions if placed under one's pillow.",
      "Bottle of Moonlight Whispers: This sealed flask emits a faint sound only audible when dreaming nearby.",
      "Blank Mask of Reverie: A porcelain mask worn by ancient seers to walk the dreamscape between lives."
    ],
    "Fate": [
      "Thread of the Unspun Life: A single silver strand sealed in a glass bead, uncut and unbroken.",
      "The Looper’s Needle: An ancient bone needle said to mend more than fabric—it weaves destinies together.",
      "Candle of the Crossroads: Its flame leans in the direction of life-changing decisions."
    ],
    "Forge": [
      "Hammer of the Embers: A dented blacksmith's hammer that always glows faintly warm and never rusts.",
      "Tongs of the Fire-Singer: These forge tools resonate with a low hum when held by a worthy crafter.",
      "Anvil Chip of Stoneheart: A fragment from a mythic anvil used to craft weapons said to never dull."
    ],
    "Freedom": [
      "Shackle Key of the Unbound: A broken iron key once used to free a temple full of political prisoners.",
      "Songbird’s Feather: Said to be from the last bird to escape a cage forged by tyrants.",
      "Chain Link of Liberation: Just one link, but warm to the touch when injustice is near."
    ],
    "Grave": [
      "Coin for the Ferryman: Worn smooth and silver-gray, this coin is placed under the tongue of the honored dead.",
      "Vial of Mourner’s Tears: Collected over generations by one family, used in rites to ease restless spirits.",
      "Funerary Reed Flute: A hollow, cracked instrument whose notes can only be heard at sunset."
    ],
    "Harvest": [
      "Scythe Blade of the First Reaping: Dull and rusted, yet still honored by farmers before each planting.",
      "Grain-Woven Crown: A simple circlet made of barley that never wilts as long as the land remains fertile.",
      "Blessed Seed of Renewal: Said to be grown in soil blessed by three gods—planted only in times of famine."
    ],
    "Hunt": [
      "Fang of the Moon Wolf: A large, silver-stained fang taken from a beast said to hunt during eclipses.",
      "Tracker’s Bone Charm: Worn smooth by generations of rangers, it always turns toward fresh prey.",
      "The Last Arrow: A black-feathered arrow that has never been loosed, kept for a hunt that never came."
    ],
    "Invention": [
      "Gear of the Impossible Engine: A finely-toothed cog that doesn’t seem to fit any known mechanism.",
      "Smokestack Charm: A brass trinket shaped like a tiny chimney, always faintly warm and humming.",
      "The Unwritten Blueprint: A scroll that reveals different designs every time it’s unrolled."
    ],
    "Judgment": [
      "Scales of the Fair Arbiter: Small silver scales that never tip unfairly, used in ancient trials.",
      "Gavel of the Last Verdict: A worn wooden mallet said to echo the final decision of a divine court.",
      "Veil of the Justiciar: A translucent veil that reveals the truth when worn during judgment."
    ],
    "Knowledge": [
      "The Endless Index: A rolled parchment that reorganizes its text depending on the question asked.",
      "Eyestone of Recall: When held, this cloudy gem reveals a forgotten memory to its owner.",
      "Scribe's Last Quill: A plain feather pen that never runs out of ink and sometimes writes of its own accord."
    ],
    "Life": [
      "Heartstone Amulet: A smooth green stone reputed to pulse with the heartbeat of the first life.",
      "Vial of Eternal Spring Water: Said to heal wounds when sprinkled, but only during dawn’s first light.",
      "Leaf of the Evergreen Tree: Preserved with holy oils, it never withers and symbolizes unending life."
    ],
    "Light": [
      "Candle of the Dawnbearer: Said to relight itself at dawn no matter the conditions.",
      "Shard of Radiance: A fragment from a shattered stained-glass window blessed by a solar god.",
      "Lantern of the Blind Prophet: Though its flame is invisible, it casts light to those who truly seek clarity."
    ],
    "Magic": [
      "Phantom Thread: An ethereal strand said to link all magic users across time.",
      "Orb of Whispered Secrets: A smoky crystal ball that murmurs forgotten spells to those who listen closely.",
      "Cloak of Flickering Shadows: A tattered cloak that shimmers with arcane energy in moonlight."
    ],
    "Moon": [
      "Silver Crescent Pendant: A delicate moon-shaped pendant said to wax and wane with the lunar phases.",
      "Moonlit Chalice: A cup that fills with water only under the full moon’s light.",
      "Sleeping Wolf’s Pelt: A soft fur rumored to grant visions in dreams when draped across the shoulders."
    ],
    "Nature": [
      "Twig of the World Tree: A brittle branch said to have sprouted from the tree at the world’s dawn.",
      "Stone of the Verdant Grove: A moss-covered rock that glows faintly when near wild animals.",
      "Horn of the Elder Stag: Used in ancient rites to call the spirits of the forest."
    ],
    "Order": [
      "Ring of the Unbroken Chain: A plain iron band said to bind vows and oaths unbreakably.",
      "Seal of the Lawgiver: A carved emblem used to authenticate royal edicts and divine decrees.",
      "Ledger of Unyielding Records: An untearable book that records all transactions and judgments."
    ],
    "Peace": [
      "Dove’s Feather Token: A white feather kept in a crystal vial, believed to calm tempers and soothe anger.",
      "Olive Branch Staff: A simple wooden staff carried by envoys to declare truce.",
      "Bell of Silent Accord: When rung, it hushes arguments and invites compromise."
    ],
    "Protection": [
      "The Guardian’s Sigil: A bronze amulet said to shield its bearer from harm when invoked.",
      "Blessed Chainmail Fragment: A small piece of mail worn by a saint, rumored to ward off evil spirits.",
      "Shield of the Watchful Eye: An ancient buckler carved with a never-blinking eye.",
      "The First Shield-Splinter: A wooden shard taken from the shield that saved a town from invasion.",
      "Sanctified Bracers: Soft leather wrappings said to guard against nightmares and blade alike.",
      "Charm of the Mother's Oath: A small carved token often worn by children, blessed by temple protectors."
    ],
    "Sea": [
      "Conch of the Deep: When blown, it summons a soothing sea breeze or calls aid from nearby fishermen.",
      "Coral Crown: A regal circlet made from living coral, said to grant calm in stormy seas.",
      "Bottle of Endless Saltwater: A vial that never empties, sacred to sailors and coastal priests."
    ],
    "Secrets": [
      "Whispering Locket: A silver locket that murmurs forgotten truths when opened at midnight.",
      "Shadowed Grimoire: A dark leather book with pages that only reveal themselves to the worthy.",
      "Veil of Silent Words: A sheer veil that grants silence and invisibility to the wearer’s whispered speech."
    ],
    "Shadow": [
      "Shade’s Cloak: A dark, whisper-thin garment that seems to absorb all light around it.",
      "Phantom Chain: A rusted chain said to bind spirits wandering between worlds.",
      "Mirror of the Veiled Self: A smoky glass mirror that reveals the hidden fears and secrets of anyone who gazes into it.",
      "Dagger of the Silent Step: A blade that leaves no mark on the air or sound when drawn.",
      "Eclipsed Lantern: A lantern whose light only shines in the absence of all other illumination."
    ],
    "Storms": [
      "Shard of the Thunderheart: A jagged piece of stormglass said to summon distant thunder.",
      "Stormcaller’s Horn: A weathered horn that can call forth a brief gust or heavy rain.",
      "Cape of Rolling Clouds: A cloak woven from storm-swept fibers that crackle faintly with static."
    ],
    "Sun": [
      "Flame of the First Dawn: A preserved ember said to glow brighter with the rising sun.",
      "Golden Circlet of the Solar King: A radiant crown worn by a long-lost sun deity’s champion.",
      "Sunblessed Sand: Grains of sand that warm the hand and never lose their glow."
    ],
    "Time": [
      "Hourglass of Endless Moments: Its sands run slow or fast, seemingly at the bearer’s will.",
      "Chronicle of Forgotten Years: A tome that records events yet to occur.",
      "Clockwork Pendant: A tiny mechanism that ticks in tune with the world’s heartbeat."
    ],
    "Travel": [
      "Boots of the Wandering Star: These worn leather boots never tire on the longest journeys.",
      "Map of the Everchanging Paths: A scroll that redraws itself daily to show safest routes.",
      "Traveler’s Compass: An ancient compass that points to what the bearer most desires."
    ],
    "Trickery": [
      "Mask of the Mirthful Shadow: A painted mask that lets its wearer slip unseen through crowds.",
      "Deck of Unseen Cards: A worn deck that changes its cards with every shuffle.",
      "Pouch of Endless Coins: A small leather pouch that seems to produce a coin when needed—but never enough.",
      "Coin of the Laughing Thief: A dented copper piece that reappears in the pockets of the overly prideful.",
      "Glove of Vanished Hands: This old glove makes sleight-of-hand more subtle—if the wearer knows a good joke.",
      "Jester’s Cracked Bell: When rung, it causes mirth—or mayhem—depending on who hears it."
    ],
    "Twilight": [
      "Mirror of Dusk and Dawn: A polished obsidian mirror that shows two reflections—one for each twilight.",
      "Lantern of the Fading Path: Lights the way only at the exact moment the sun touches the horizon.",
      "Cloak of Hushed Footsteps: This dusk-hued cloak muffles sound at sunset and sunrise."
    ],
    "War": [
      "Sword of the Fallen Champion: A battle-worn blade said to thirst for justice and vengeance.",
      "Banner of the Bloodied Fields: A tattered war banner that inspires courage in the desperate.",
      "Helmet of Silent Resolve: A battered helm said to shield the wearer’s mind from fear and doubt."
    ]
};



export const RELICS_BY_CONDITION_MAPPING: Record<SiteCondition, string[]> = {
    "squalid": [
      "A cracked and faded holy symbol, barely recognizable.",
      "A rusted iron chain said to once bind a local saint.",
      "A torn cloth banner with faint sacred embroidery."
    ],
    "poor": [
      "A simple wooden idol worn smooth by worshippers' hands.",
      "A clay bowl used for humble offerings and blessings.",
      "A faded prayer scroll with partial prayers still legible."
    ],
    "average": [
      "A polished bronze censer used in regular rituals.",
      "A silver pendant engraved with a protective rune.",
      "A bound prayer book passed down through generations."
    ],
    "wealthy": [
      "An ornate gold reliquary containing a saint’s relic.",
      "A finely embroidered altar cloth with sacred symbols.",
      "A jewel-encrusted holy chalice used in grand ceremonies."
    ],
    "aristocratic": [
      "A flawless crystal orb said to reveal divine visions.",
      "An ancient tome bound in dragonhide containing lost secrets.",
      "A jeweled scepter wielded by a legendary high priest."
    ]
};

export const RELICS_BY_SIZE_MAPPING: Record<SiteSize, string[]> = {
    "tiny": [
      "A chipped clay figurine of a local deity.",
      "A simple wooden talisman carved by villagers.",
      "A worn leather pouch containing blessed stones."
    ],
    "small": [
      "A silver pendant with an etched holy symbol.",
      "A stitched prayer banner depicting seasonal festivals.",
      "A hand-carved wooden staff used in rites."
    ],
    "modest": [
      "An engraved bronze censer used for incense offerings.",
      "A copper chalice reputed to hold holy water.",
      "A bound manuscript of local prayers."
    ],
    "large": [
      "A marble statue of a long-forgotten saint.",
      "A gilded reliquary containing sacred relics.",
      "An iron key rumored to open secret temple vaults."
    ],
    "grand": [
      "The Tears of the Goddess, said to bless those who consume them.",
      "An ancient tome bound in dragonhide with divine secrets.",
      "A flawless crystal orb revealing visions of the divine."
    ],
    "sprawling": [
      "The Celestial Scepter wielded by a legendary high priest.",
      "A mosaic floor depicting creation myths in precious stones.",
      "A vault filled with numerous relics of miraculous power."
    ]
}