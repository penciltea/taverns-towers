import { DomainTypes, MagicLevel } from "@/constants/settlement.options";
import { TagTypes, TerrainTypes, ClimateTypes } from "@/constants/environment.options";

export const FolkloreByTagMapping: Record<TagTypes, string[]> = {
  "Ancient Ruins": [
    "It’s said that whispering in the ruins can awaken long-forgotten spirits.",
    "Finding a carved stone here brings visions of the past.",
    "Some say the ruins shift when no one is watching, hiding their secrets anew.",
    "Leaving offerings of herbs wards off restless ghosts.",
    "At twilight, shadows in the ruins are believed to replay ancient battles."
  ],
  "Arcane Nexus": [
    "Magic is strongest here; a single touch can alter one’s fate.",
    "It’s rumored that time bends near the nexus, causing strange dreams.",
    "Those who meditate here may hear the voices of old spellcasters.",
    "Wild magical sparks dance in the air on stormy nights.",
    "Leaving a circle of salt protects one from sudden magical bursts."
  ],
  "Border Post": [
    "Travelers say the spirits of past guards still watch the borders.",
    "Crossing the border at dusk is said to bring luck or misfortune, depending on the stars.",
    "A carved token left at the post ensures safe passage.",
    "The wind here carries whispers from neighboring lands.",
    "Wearing a feather from a local bird is believed to ward off bandits."
  ],
  "Capital": [
    "The heart of power, where rumors are born and secrets traded.",
    "It’s said that the statues in the capital watch over the city at night.",
    "A coin tossed into the city fountain grants a wish for fortune.",
    "Whistling in the capital’s alleys invites good luck.",
    "Finding a lost ring here is a sign of unexpected opportunity."
  ],
  "Criminal Hideout": [
    "Whispers say that stealing from the hideout curses the thief forever.",
    "Leaving a knife at the entrance is a warning to rivals.",
    "Murmurs of unseen eyes watching every shadow.",
    "It’s believed the hideout is protected by dark pacts and old magic.",
    "A secret knock can open hidden doors known only to the trusted."
  ],
  "Druidic": [
    "The trees here remember every footstep taken beneath their branches.",
    "It’s customary to leave a gift of flowers to honor the forest spirits.",
    "A full moon gathering here is said to grant visions of the future.",
    "Healing herbs gathered at dawn are more potent.",
    "Talking to the ancient stones is believed to bring wisdom."
  ],
  "Fishing": [
    "Casting nets at sunrise brings bountiful catches.",
    "It’s bad luck to fish on a new moon night.",
    "Leaving a portion of the catch for river spirits ensures future bounty.",
    "The shape of the waves predicts the weather to come.",
    "A lucky charm carved from driftwood wards off storms."
  ],
  "Fortress": [
    "The fortress walls are said to be imbued with protective spells.",
    "A sentry’s whistle at midnight wards off evil spirits.",
    "Legend says a hidden chamber holds an ancient relic.",
    "Wearing a token from the fortress grants courage in battle.",
    "Old battle scars on the walls are said to bleed when danger is near."
  ],
  "Garrison": [
    "Drumming at dawn wakes the spirits of past soldiers.",
    "A silver coin left at the gates brings protection to the garrison.",
    "Echoes of marching feet are heard on quiet nights.",
    "It’s said that loyal ghosts guard the garrison’s armory.",
    "Breaking bread together here strengthens bonds beyond life."
  ],
  "Hidden": [
    "The hidden paths are watched by unseen guardians.",
    "It’s believed that lost travelers find their way when they leave offerings.",
    "A flicker of light at night reveals secret entrances.",
    "Whispering the hidden name unlocks hidden knowledge.",
    "Footsteps here leave no trace to the untrained eye."
  ],
  "Infested": [
    "The swarms here are said to be the cursed souls of the past.",
    "Carrying garlic wards off the creatures lurking within.",
    "It’s unlucky to enter at dusk without protective charms.",
    "Strange howls echo when the moon is full.",
    "A circle of salt drawn at night keeps the infestations at bay."
  ],
  "Isolated": [
    "Isolation sharpens the senses and reveals hidden truths.",
    "It’s said that time moves differently in these lonely places.",
    "A lone lantern light guides lost souls to safety.",
    "Singing softly here keeps the silence at bay.",
    "Visitors leave tokens to ensure safe return."
  ],
  "Mining Camp": [
    "Miners leave offerings to earth spirits before entering the shafts.",
    "It’s believed that lucky stones found here bring fortune.",
    "Echoes in the tunnels carry warnings from the deep.",
    "A whistle signals safety and good luck underground.",
    "Breaking a pickaxe here is a sign of misfortune to come."
  ],
  "Nomadic": [
    "Nomads tell tales of stars guiding their paths.",
    "Campfires are left burning as a sign of welcome.",
    "It’s unlucky to point at the moon during travels.",
    "Sharing water with strangers brings blessings.",
    "The wind carries messages between distant camps."
  ],
  "Overgrown": [
    "The overgrowth hides both danger and forgotten treasures.",
    "It’s said that vines move to protect sacred places.",
    "Flowers here bloom only under a full moon.",
    "Footsteps vanish in the thick underbrush.",
    "Whistling attracts curious woodland creatures."
  ],
  "Port": [
    "Leaving a coin in the harbor’s water brings safe passage.",
    "Seagulls are believed to be spirits of lost sailors.",
    "Dockworkers share tales of ghost ships appearing at dawn.",
    "Tying a ribbon to the mast wards off storms.",
    "Salt sprinkled on the deck keeps the sea gods pleased."
  ],
  "Prison Settlement": [
    "Prisoners whisper secrets that still echo in the walls.",
    "It’s said that chains left untended rattle on their own.",
    "Crossing paths here after midnight invites misfortune.",
    "Tokens left on cell bars bring hope to the captive.",
    "The prison bell’s toll is said to mark the passing of souls."
  ],
  "Remote": [
    "The remote places hold mysteries untouched by time.",
    "Stars shine brighter here, guiding wanderers home.",
    "It’s believed that wild animals here are guardians in disguise.",
    "A stone cairn built here grants protection on journeys.",
    "Echoes carry the voices of those long gone."
  ],
  "Sacred Site": [
    "The ground here is said to pulse with ancient power.",
    "Visitors leave offerings to honor the gods.",
    "Sacred fires burn without fuel during ceremonies.",
    "Whispering prayers here brings visions of the divine.",
    "Touching the altar grants blessings or curses, depending on one’s heart."
  ],
  "Trade Hub": [
    "Merchants haggle not just over goods, but over luck and fate.",
    "Carrying a coin from the trade hub brings prosperity.",
    "It’s said that deals made here are watched by shadowy figures.",
    "A spilled drink at the market invites fortune in disguise.",
    "Whistling vendors are believed to charm customers with magic."
  ],
  "Military Outpost": [
    "The outpost is guarded by spirits of fallen warriors.",
    "Echoes of battle cries can be heard on stormy nights.",
    "A blade left at the gates honors the soldiers’ courage.",
    "It’s believed that the outpost’s walls absorb the strength of its defenders.",
    "Marching feet heard at dawn bring courage to the living."
  ]
};

export const FolkloreByTerrainMapping: Record<TerrainTypes, string[]> = {
  Coast: [
    "It’s said the sea whispers secrets to those who listen at dawn.",
    "Finding a shell with a hole means a wish will soon come true.",
    "Leaving a coin in the tide is good luck for safe voyages.",
    "Sailors believe that seeing a white heron is a sign of calm seas ahead.",
    "Beware the siren’s song at night; it lures the unwary to the depths."
  ],
  Desert: [
    "Desert winds carry the voices of ancient travelers lost in the sands.",
    "A sudden oasis appearing is a blessing from desert spirits.",
    "Avoid traveling alone at noon, or the sun spirits will steal your shadow.",
    "Finding a desert rose means protection from storms and mirages.",
    "It’s believed that sand dunes shift to hide the treasure of forgotten kings."
  ],
  Forest: [
    "Whistling in the woods calls mischievous sprites to play tricks on you.",
    "A crow’s caw at twilight is a warning of approaching danger.",
    "If you leave a gift for the dryads, your path will be clear in the forest.",
    "Finding a circle of mushrooms is a gateway to the faerie realm.",
    "Never take wood from a fallen tree without thanking the forest."
  ],
  Jungle: [
    "The jungle is alive with watching eyes; never speak ill of its creatures.",
    "A brightly colored butterfly means a spirit is nearby offering protection.",
    "If you hear drums at night, it’s the jungle’s heartbeat and should be respected.",
    "Carrying jungle vines as talismans protects against poison and curses.",
    "It is said the jungle spirits can change forms to test the worthiness of travelers."
  ],
  Hills: [
    "Rolling thunder over the hills is the sound of giants playing their games.",
    "Finding a smooth, round stone on a hilltop brings strength and courage.",
    "Hills are homes to earth spirits who reward those who tread lightly.",
    "At dawn, the mist in the hills carries the voices of lost lovers.",
    "Singing to the hills is said to bring rain and good harvests."
  ],
  Mountains: [
    "Mountains are the realm of ancient spirits that guard hidden knowledge.",
    "Echoes in the mountains are voices from the past offering guidance.",
    "Leaving an offering at a mountain shrine ensures safe passage.",
    "Seeing a hawk soaring high is a sign of honor and protection.",
    "It is said that the mountain winds can carry prayers to the gods."
  ],
  Plains: [
    "A lone wolf howling on the plains signals a time of change.",
    "If wildflowers bloom out of season, the plains are blessed by the spirits.",
    "Sleeping under the stars on the plains invites dreams of prophecy.",
    "Carrying a blade of grass from the plains brings good fortune.",
    "The plains are said to be watched over by guardian horses that protect travelers."
  ],
  River: [
    "Throwing a pebble into the river while making a wish is said to bring it true.",
    "Rivers are home to water spirits who reward respect with safe crossings.",
    "If the river runs red at dawn, a warning of danger is near.",
    "Carrying river stones wards off illness and bad luck.",
    "It is believed that river sprites can grant favors if treated kindly."
  ],
  Swamp: [
    "Swamps are full of ancient magic; never disturb the moss-covered stones.",
    "A frog’s croak at dusk is believed to bring luck in love.",
    "If you see will-o’-the-wisps, follow them carefully to hidden treasures.",
    "Leaving bread crumbs in the swamp keeps the spirits from mischief.",
    "The mist in the swamp is said to carry voices of those lost long ago."
  ],
  Tundra: [
    "The tundra winds carry stories of the old world and forgotten heroes.",
    "Finding a feather frozen in ice is a sign of blessing from the sky spirits.",
    "It is said that singing to the stars in the tundra brings peace to the soul.",
    "Beware stepping on cracks in the ice; they are gates to the spirit world.",
    "Snowflakes falling in a spiral mean a wish will soon be granted."
  ],
  Underground: [
    "The tunnels below are alive with earth spirits who guide or mislead travelers.",
    "Dropping a coin in a cavern pool brings good luck and safe return.",
    "Stalactites are believed to be the teeth of ancient stone dragons.",
    "Whispering secrets to the underground winds keeps you safe from harm.",
    "Finding a glowing crystal is a sign of the deep magic beneath the earth."
  ],
  Urban: [
    "It’s said the city’s shadows hide unseen watchers protecting the streets.",
    "Spilling salt outside your door invites bad luck; toss a pinch over your shoulder.",
    "Leaving bread out at midnight keeps the house safe from spirits.",
    "A black cat crossing your path is a sign of upcoming change.",
    "Carrying a coin from the city’s founding year brings prosperity."
  ]
};

export const FolkloreByClimateMapping: Record<ClimateTypes, string[]> = {
  Polar: [
    "When the northern lights dance fiercely, it’s a sign the spirits are celebrating.",
    "Snow falling on a silent night means the ancestors are watching over the village.",
    "Never leave food out during the long winter night or the frost spirits will steal your warmth.",
    "If your breath freezes in the air, it’s a warning to speak only truth that day.",
    "Finding a piece of ice shaped like a heart is good luck for love in the coming season."
  ],
  Temperate: [
    "A robin singing at dawn means the forest is blessing the day.",
    "If a fox crosses your path three times, a secret is about to be revealed.",
    "Rain falling during a festival is believed to wash away old misfortune.",
    "Wearing a wreath of wildflowers keeps evil eyes from finding you.",
    "Breaking a twig in the woods is disrespectful to the tree spirits and brings bad luck."
  ],
  Tropical: [
    "The rustling of palm leaves at night is said to be the whispering of guardian spirits.",
    "If a sudden downpour begins during a celebration, it’s the gods’ way of joining in.",
    "Never cut a banana tree without asking permission from the forest spirits first.",
    "Brightly colored birds are messengers of good fortune and must never be harmed.",
    "Leaving a bowl of fresh water outside invites helpful water sprites into your home."
  ],
  Dry: [
    "Mirages are illusions created by desert spirits to protect their sacred places.",
    "Finding a feather in the sand means a wanderer’s blessing will follow you.",
    "Never whistle after sundown, or the desert winds will carry your voice away.",
    "Carrying a piece of obsidian protects against the sting of scorpions and bad luck.",
    "Cacti are said to house tiny, prickly guardians who punish those who harm them."
  ],
  Continental: [
    "Thunder rolling from the mountains means the giant gods are angry or pleased.",
    "If the first snow falls before the leaves have turned, expect a harsh winter.",
    "Finding a four-leaf clover near your home brings protection from storms.",
    "Hiding a small stone in your pocket keeps you safe during long travels.",
    "Birds flying low signal an approaching storm and warn the villagers to prepare."
  ]
};

export const FolkloreByMagicLevelMapping: Record<MagicLevel, string[]> = {
  "None": [
    "Never whistle indoors—it's said to attract unwanted attention from the unseen.",
    "Bread baked with a hollow center is a bad omen. It means something's missing at home.",
    "The oldest house in town must never be repainted, or the village’s luck will fade.",
    "Tools left out overnight will rust faster—some say it’s the air punishing laziness.",
    "Don’t sleep with your feet pointing toward the door. That’s how spirits find you."
  ],
  "Low": [
    "A sprig of rosemary under the pillow keeps your dreams clean.",
    "When a candle flickers without wind, a spell has passed nearby.",
    "It’s unlucky to walk in someone else’s shadow during sunrise.",
    "The seventh sneeze in a row means a witch is watching you.",
    "Spilled wine on the hearth? Toss salt over your shoulder and hum a lullaby."
  ],
  "Moderate": [
    "Leave milk on your windowsill during a thunderstorm to keep spiteful elementals away.",
    "Never thank someone for a healing spell—it binds the wound to return.",
    "If your cat sleeps facing the door, expect a visitor with news.",
    "A cracked mirror must be buried under moonlight, or it will reflect your future.",
    "New boots must be dusted with powdered chalk to avoid hexing your path."
  ],
  "High": [
    "Always knock twice on a closed book—some spells sleep between the pages.",
    "Coins found under a tree root are offerings from earthbound spirits. Leave them be.",
    "Dreams of flying mean a spell’s energy is leaking into your thoughts.",
    "When walking past a wizard’s tower, you must hold your breath or risk inhaling a stray charm.",
    "It’s custom to offer thanks to fire after cooking, in case the flame is sentient."
  ],
  "Mythic": [
    "Never count the stars aloud—they’ll hear you and rearrange themselves.",
    "The sky has moods. If the clouds swirl clockwise, don’t speak anyone’s name until morning.",
    "People born during eclipses must never look into mirrors at twilight.",
    "If a raven lands on your shoulder, don’t move. It’s choosing your fate.",
    "At the center of every labyrinth, a forgotten spell sleeps. Walk one in your dreams, and it may awaken."
  ],
};


export const FolkloreByDomainMapping: Record<DomainTypes, string[]> = {
  Arcana: [
    "It’s said that runes glow faintly under the light of a full moon.",
    "Spilling ink while casting a spell invites unexpected magic.",
    "Whispering ancient words near arcane circles keeps spirits at bay.",
    "Crystals left on altars hum softly when magic is near."
  ],
  Arts: [
    "Musicians believe their songs carry the voice of the stars.",
    "An artist’s brush dipped in moonlight paints visions of the future.",
    "Sculptors leave a token in their work to grant it life’s spark.",
    "Performers say that a single dropped coin brings great fortune."
  ],
  Beauty: [
    "Wearing a garland of wildflowers attracts blessings of charm.",
    "Mirrors catching the dawn’s first light reveal true beauty.",
    "A soft breeze after combing hair is a sign of favor from spirits.",
    "Applying rosewater at dawn is believed to enhance one’s allure."
  ],
  Chaos: [
    "Leaving a door unlocked invites the dance of wild spirits.",
    "Breaking a perfectly symmetrical object calls chaos upon the household.",
    "Spontaneous laughter wards off lurking mischief.",
    "Spilling salt thrice dispels bad luck from chaotic forces."
  ],
  Commerce: [
    "A coin placed in the foundation of a shop blesses its prosperity.",
    "Shaking hands before a deal seals more than just a contract.",
    "It’s lucky to wear a merchant’s ring when closing a sale.",
    "Empty purses left open invite wealth to fill them."
  ],
  Community: [
    "Sharing bread at sunset binds the hearts of neighbors.",
    "Lighting a communal fire invites protection from the unseen.",
    "A smile exchanged between strangers fosters lasting friendship.",
    "Gathering under the old oak tree ensures good fortune for all."
  ],
  Death: [
    "Whistling in a graveyard invites restless spirits to follow.",
    "Placing a coin on the eyes of the dead guides their passage.",
    "The scent of lilies signals a soul’s peaceful journey.",
    "Passing a shadowy crossroads at midnight is a test of courage."
  ],
  Decay: [
    "Moss growing on a doorstep is said to protect from rot’s spread.",
    "Leaving a piece of bread on old ruins appeases lingering spirits.",
    "A sudden chill warns of impending decay.",
    "Broken tools left in the earth hasten the cycle of life and death."
  ],
  Dreams: [
    "Leaving a dreamcatcher by the window traps troubled visions.",
    "Writing dreams in ink of midnight blue ensures their memory.",
    "Whispering wishes before sleep invites their coming true.",
    "Sleepwalkers are believed to travel the spirit realm at night."
  ],
  Fate: [
    "Tying a red thread around the wrist guides destiny’s hand.",
    "Crossing paths with a black cat signals a change is near.",
    "Fortune-tellers’ cards shift subtly with the flow of fate.",
    "Dropping a pebble in a river sends wishes to the gods."
  ],
  Forge: [
    "Striking the anvil thrice brings strength to the day’s work.",
    "Leaving coal at the forge keeps fires burning bright.",
    "The first hammer blow of the morning sets the tone for the craftsman.",
    "Sparks flying towards the sky call blessings from the smith gods."
  ],
  Freedom: [
    "Releasing a bird at dawn symbolizes a new beginning.",
    "Breaking chains in a dream foretells liberation from burdens.",
    "Wearing untied shoes invites freedom of spirit.",
    "Open windows at sunrise welcome boundless energy."
  ],
  Grave: [
    "Leaving a white feather near a grave signals peaceful rest.",
    "Placing stones in a circle honors the fallen.",
    "The quiet rustle of leaves warns of nearby spirits.",
    "Speaking a name aloud at dusk calls remembrance."
  ],
  Harvest: [
    "Singing to the crops during harvest invites a generous bounty.",
    "A sheaf of wheat tied to the door keeps hunger at bay.",
    "Leaving the last bundle unharvested honors the earth’s spirit.",
    "Dancing around the fire during harvest festivals ensures good fortune."
  ],
  Hunt: [
    "Hunters wear talismans made from the first kill’s bone.",
    "Whistling softly calms the forest creatures.",
    "Avoiding the path of the fox brings success to the hunt.",
    "Offering thanks to the forest spirits ensures safe passage."
  ],
  Invention: [
    "Leaving a spark of fire near new tools invites creativity.",
    "Inventors sleep with a blueprint under their pillow for inspiration.",
    "A discarded gear in the workshop wards off failure.",
    "The first light touching new machines breathes life into them."
  ],
  Judgment: [
    "Scales balanced at dawn bring fairness to decisions.",
    "A quiet moment before speaking ensures just words.",
    "Leaving a white stone on the bench signifies truth.",
    "Echoes in the hallways reveal hidden judgments."
  ],
  Knowledge: [
    "Books left open under moonlight reveal hidden wisdom.",
    "Quills dipped in midnight ink record truths untold.",
    "Whispering the names of scholars invites their guidance.",
    "A well-worn tome is believed to hold a soul’s secrets."
  ],
  Life: [
    "Planting a seed with whispered hopes invites growth.",
    "Water carried from a sacred spring heals both body and soul.",
    "Butterflies seen at dawn are signs of new beginnings.",
    "Tying ribbons on trees honors the spirits of life."
  ],
  Light: [
    "Lighting a candle before dark wards off shadows.",
    "Sunbeams caught in a crystal bring clarity and joy.",
    "Reflecting light through a prism invites happiness.",
    "Morning dew is said to carry the blessing of the sun."
  ],
  Magic: [
    "Spellcasters leave crystals at crossroads to focus their power.",
    "A circle drawn in salt repels wandering spirits.",
    "Chanting old words strengthens enchantments.",
    "The glow of a candle flame predicts the success of a spell."
  ],
  Moon: [
    "Wolves are said to sing only under the full moon’s watch.",
    "Silver jewelry worn on moonlit nights brings dreams to life.",
    "Tides whispered to at midnight bring good fortune.",
    "Moonflowers bloom only in the presence of true magic."
  ],
  Nature: [
    "Offering berries to forest spirits keeps the woods kind.",
    "Listening to the wind reveals secrets of the earth.",
    "Animals crossing your path bring messages from the wild.",
    "A circle of stones marks places where nature’s magic is strongest."
  ],
  Order: [
    "Aligning tools at dawn invites harmony and discipline.",
    "Strict routines are said to keep chaos at bay.",
    "Wearing matching colors ensures a balanced day.",
    "A perfectly arranged workspace brings peace of mind."
  ],
  Peace: [
    "Sharing a meal in silence strengthens bonds of trust.",
    "White doves released at festivals symbolize lasting peace.",
    "Planting olive branches near homes invites calm.",
    "Soft songs sung at twilight ease troubled hearts."
  ],
  Protection: [
    "Horseshoes nailed above doorways keep evil away.",
    "Sprinkling salt around a home creates a protective barrier.",
    "Carrying a carved talisman wards off harm.",
    "The first guard’s watch at night ensures safety for all."
  ],
  Sea: [
    "Sailors leave coins for the sea gods before voyages.",
    "A knot tied in the anchor’s rope brings safe return.",
    "Seagulls seen circling signal good weather ahead.",
    "Whistling aboard a ship calms the restless waters."
  ],
  Secrets: [
    "Whispering secrets into hollow trees keeps them safe.",
    "Locking a letter with a silver clasp guards its contents.",
    "Eyes drawn on doors ward off unwanted visitors.",
    "Finding a hidden key invites discovery and wonder."
  ],
  Shadow: [
    "Shadows stretching long at dusk carry hidden messages.",
    "Moving silently invites the favor of shadow spirits.",
    "A candle blown out suddenly warns of unseen dangers.",
    "Dark cloaks worn during festivals invite mystery."
  ],
  Storms: [
    "Thunderclaps are said to be the gods’ battle cries.",
    "Leaving iron tools outside calms the wrath of storms.",
    "Watching lightning strike predicts coming change.",
    "A whistle before a storm is said to challenge the skies."
  ],
  Sun: [
    "Sunlight caught on a pendant brings warmth to the heart.",
    "Singing at dawn honors the sun’s journey.",
    "Casting shadows in the morning is a game with spirits.",
    "Golden flowers bloom only where the sun smiles."
  ],
  Time: [
    "Watches wound at midnight keep time steady through the day.",
    "Old clocks are believed to hold memories of their makers.",
    "Passing a sundial at noon invites good fortune.",
    "Dropping sand from an hourglass signals a fresh start."
  ],
  Travel: [
    "Tying a ribbon to a walking staff ensures safe journeys.",
    "Crossing a river barefoot invites blessings from water spirits.",
    "A coin tossed into a well before departure grants luck.",
    "Waving to the horizon welcomes the road ahead."
  ],
  Trickery: [
    "Leaving a trick coin on the doorstep fools unwanted guests.",
    "Masks worn during festivals invite playful mischief.",
    "Telling a tall tale wards off troublemakers.",
    "Spilling salt and tossing a pinch over the shoulder reverses bad luck."
  ],
  Twilight: [
    "Watching the sunset with loved ones invites lasting memories.",
    "Twilight is when spirits walk freely between worlds.",
    "Leaving lanterns lit through the dusk wards off dark spirits.",
    "Whispering wishes to the fading light ensures their coming true."
  ],
  War: [
    "Carrying a piece of fallen armor honors the brave.",
    "Battle drums heard at dawn rally the hearts of warriors.",
    "Drawing a sword in silence calls the spirits of war.",
    "Leaving a token on the battlefield brings protection to the fallen."
  ]
}