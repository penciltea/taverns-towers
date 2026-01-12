import { oxfordCommaList } from "@/lib/util/stringFormats";
import { normalizeNpcInput, NpcDescriptionType } from "../normalize";
import { NPC_FEATURES, NpcFeatureDescriptionTemplates, NpcFeatureNounText, NpcFeatureVerbText } from "../../mappings/features.mappings";
import { getRandom } from "@/lib/util/randomValues";

export function filterApplicableFeatures(features: string[]): string[]{
    return features.filter(feature => {
        if(NPC_FEATURES.has(feature)) return true;
        return false;
    });
}

function conjugateForPlural(verbPhrase: string, pronoun: string): string {
  const lower = pronoun.toLowerCase();
  
  // Only apply for plural pronouns
  if (!["they", "zey"].includes(lower)) return verbPhrase;

  const words = verbPhrase.split(" ");
  let firstVerb = words[0];

  // Handle common irregulars first
  if (firstVerb === "has") firstVerb = "have";
  else if (firstVerb === "is") firstVerb = "are";
  else {
    const lastChar = firstVerb.slice(-1).toLowerCase();

    if (lastChar === "y" && firstVerb.length > 1 && !/[aeiou]/i.test(firstVerb.slice(-2, -1))) {
      // consonant + y -> ies
      firstVerb = firstVerb.slice(0, -1) + "ies";
    } else if (lastChar === "h") {
      // verbs ending in 'h' -> es (push -> pushes already in singular)
      firstVerb = firstVerb + "es";
    } else if (lastChar === "s") {
      // verbs ending in 's' -> es
      firstVerb = firstVerb + "es";
    } else if (lastChar === "p") {
      // verbs ending in 's' -> es
      firstVerb = firstVerb + "es";
    }else {
      // All other verbs just append 's'
      firstVerb = firstVerb + "s";
    }
  }

  words[0] = firstVerb;
  return words.join(" ");
}

export function getFeaturesDescriptions(
  features: string[],
  pronounNoun: string,
  pronounPossessive: string
): {
  noun: string[];
  verb: string[];
} {
  const noun: string[] = [];
  const verb: string[] = [];

  for (const feature of features) {
    if (!feature) continue;

    if (NpcFeatureNounText[feature as keyof typeof NpcFeatureNounText]) {
      const text = getRandom(
        NpcFeatureNounText[feature as keyof typeof NpcFeatureNounText]
      ).replace(/\{possessive\}/g, pronounPossessive.toLowerCase());

      noun.push(text);
      continue;
    }

    if (NpcFeatureVerbText[feature as keyof typeof NpcFeatureVerbText]) {
      let text = getRandom(
        NpcFeatureVerbText[feature as keyof typeof NpcFeatureVerbText]
      ).replace(/\{possessive\}/g, pronounPossessive.toLowerCase());

      text = conjugateForPlural(text, pronounNoun);

      verb.push(text);
    }
  }

  return { noun, verb };
}

type FeatureTemplate = (npc: NpcDescriptionType) => string;

export function isTemplateApplicable(
  template: FeatureTemplate,
  npc: NpcDescriptionType
): boolean {
  return Boolean(template(npc));
}

export function getNpcFeatureDescriptions(npc: NpcDescriptionType): string {
  const applicableTemplates = NpcFeatureDescriptionTemplates.filter(
    template => isTemplateApplicable(template, npc)
  );

  if (!applicableTemplates.length) {
    return "";
  }

  const pick = Math.floor(Math.random() * applicableTemplates.length);
  return applicableTemplates[pick](npc);
}


export function buildNpcFeaturesDescription(data: ReturnType<typeof normalizeNpcInput>, hasOrHave: string, pronounNoun: string, pronounPossessive: string): string {
    console.log("features data: ", data);
    const applicableFeatures = filterApplicableFeatures(data.features);
    const { noun, verb } = getFeaturesDescriptions(
        applicableFeatures,
        pronounNoun,
        pronounPossessive
    );

    const featuresNounText = noun.length ? oxfordCommaList(noun) : undefined;
    const featuresVerbText = verb.length ? oxfordCommaList(verb) : undefined;

    console.log("noun length: ", noun.length);
    console.log("verb length: ", verb.length);

    // If no distinguishing features, exit early to prevent strange descriptions
    if (!noun.length && !verb.length) {
        return "";
    }

    const isOrAre = ["they", "zey"].includes(pronounNoun.toLowerCase()) ? "are" : "is";
    
    const featureDescription = getNpcFeatureDescriptions({
        ...data,
        pronounNoun,
        pronounPossessive,
        hasOrHave,
        featuresNounText,
        featuresVerbText,
        isOrAre
    } as NpcDescriptionType)

    return featureDescription;
}