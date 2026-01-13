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
  let firstVerb = words[0].toLowerCase();

  // Handle irregulars first
  if (firstVerb === "has") {
    words[0] = "have";
    return words.join(" ");
  }

  if (firstVerb === "is") {
    words[0] = "are";
    return words.join(" ");
  }

  if( firstVerb === "uses"){
    words[0] = "use";
    return words.join(" ");
  }

  // ies → y (carries → carry)
  if (firstVerb.endsWith("ies") && firstVerb.length > 3) {
    words[0] = firstVerb.slice(0, -3) + "y";
    return words.join(" ");
  }

  // es → base (pushes → push, dresses → dress)
  const esEndings = ["ches", "shes", "ses", "xes", "zes", "pes"];
  if (esEndings.some(e => firstVerb.endsWith(e))) {
    words[0] = firstVerb.slice(0, -2);
    return words.join(" ");
  }

  // s → base (walks → walk)
  if (firstVerb.endsWith("s")) {
    words[0] = firstVerb.slice(0, -1);
    return words.join(" ");
  }

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
      )
      .replace(/\{possessive\}/g, pronounPossessive.toLowerCase());

      noun.push(text);
      continue;
    }

    if (NpcFeatureVerbText[feature as keyof typeof NpcFeatureVerbText]) {
      let text = getRandom(
        NpcFeatureVerbText[feature as keyof typeof NpcFeatureVerbText]
      )
      .replace(/\{possessive\}/g, pronounPossessive.toLowerCase());

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
    const applicableFeatures = filterApplicableFeatures(data.features);
    const { noun, verb } = getFeaturesDescriptions(
        applicableFeatures,
        pronounNoun,
        pronounPossessive
    );

    const featuresNounText = noun.length ? oxfordCommaList(noun) : undefined;
    const featuresVerbText = verb.length ? oxfordCommaList(verb) : undefined;

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