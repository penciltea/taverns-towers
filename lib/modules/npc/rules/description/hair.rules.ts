import { NPC_HAIR_COLOR, NPC_HAIR_LENGTHS, NPC_HAIR_STYLES, NPC_HAIR_TEXTURES } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";
import { getRandom } from "@/lib/util/randomValues";
import { NpcHairLengthText, NpcHairTextureText, NpcHairStyleText, NpcHairDescriptionTemplates } from "../../mappings/hair.mappings";
import { normalizeNpcInput, NpcDescriptionType } from "../normalize";
import { oxfordCommaList } from "@/lib/util/stringFormats";
import { getNonHumanIntegument } from "../common.rules";

export function groupHairStyles(values: string[]) {
  return values.reduce(
    (acc, value) => {
      // Textures
      if (NPC_HAIR_TEXTURES[0].options.some(o => o.value === value)) {
        acc.textures.push(value);
      }

      // Lengths
      if (NPC_HAIR_LENGTHS[0].options.some(o => o.value === value)) {
        acc.lengths.push(value);
      }

      // Styles
      if (NPC_HAIR_STYLES[0].options.some(o => o.value === value)) {
        acc.styles.push(value);
      }

      return acc;
    },
    {
      textures: [] as string[],
      lengths: [] as string[],
      styles: [] as string[],
    }
  );
}

export function getHairLengthDescriptions(lengths: string[]) {
    return lengths.map(lengthLabel => {
        if (!lengthLabel) return "";
        return getRandom(
            NpcHairLengthText[lengthLabel as keyof typeof NpcHairLengthText]
        );
    });
}

export function getHairTextureDescriptions(textures: string[]) {
    return textures.map(textureLabel => {
        if (!textureLabel) return "";
        return getRandom(
            NpcHairTextureText[textureLabel as keyof typeof NpcHairTextureText]
        );
        }
    );
}


export function getHairStyleDescriptions(styles: string[]) {
    return styles.map(styleLabel => {
        if (!styleLabel) return "";
        return getRandom(
            NpcHairStyleText[styleLabel as keyof typeof NpcHairStyleText]
        );
    });
}

export function getHairColorDescriptions(colors: string[]){
    return colors.map(colorLabel => {
        if(!colorLabel) return "";
        return getDropdownLabel(NPC_HAIR_COLOR, colorLabel).toLowerCase();
    })
};

export function getNpcHairDescription(npc: NpcDescriptionType): string {
  if(npc.hairStyle.includes("none")) return "";
  const surface = getNonHumanIntegument(npc.race);
  const pick = Math.floor(Math.random() * NpcHairDescriptionTemplates.length);
  const option = NpcHairDescriptionTemplates[pick](npc);

  return option.replace(/\{surface\}/g, surface);
}

export function buildNpcHairDescription(data: ReturnType<typeof normalizeNpcInput>, hasOrHave: string, pronounNoun: string, pronounPossessive: string): string {
    const groupedHair = groupHairStyles(data.hairStyle || []);

    let hairLengthText = oxfordCommaList(getHairLengthDescriptions(groupedHair.lengths));
    let hairTextureText = oxfordCommaList(getHairTextureDescriptions(groupedHair.textures));
    let hairStyleText = oxfordCommaList(getHairStyleDescriptions(groupedHair.styles));
    let hairColorText = oxfordCommaList(getHairColorDescriptions(data.hairColor));

    const hairDescription = getNpcHairDescription({
        ...data,
        pronounNoun,
        pronounPossessive,
        hasOrHave,
        hairColorText,
        hairStyleText,
        hairLengthText,
        hairTextureText,
        hairFlags: {
            isBald: groupedHair.lengths.includes("bald"),
            isBuzzCut: groupedHair.lengths.includes("buzzCut")
        },
    } as NpcDescriptionType);

    return hairDescription
}