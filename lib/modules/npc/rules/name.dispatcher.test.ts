import { dispatchNpcName } from "./name.dispatcher";
import * as generatorModule from "./generateNpcNameFromFragments";
import { npcNameGeneratorConfigs } from "./nameGenerator.configs";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { NpcGroupKey } from "@/interfaces/npc.interface";

describe("dispatchNpcName", () => {
    const fragments: GeneratorNpcFragmentPlain[] = [
        { value: "Sir", type: "prefix", race: [] },
        { value: "John", type: "first", race: [] },
        { value: "Smith", type: "last", race: [] },
    ];

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("uses default config if race not specified", () => {
        const mockName = "Sir John Smith";
        jest
        .spyOn(generatorModule, "generateNpcNameFromFragments")
        .mockReturnValue(mockName);

        const name = dispatchNpcName(fragments, {});

        expect(name).toBe(mockName);
        expect(generatorModule.generateNpcNameFromFragments).toHaveBeenCalledWith(
        expect.objectContaining({
            fragments,
            filters: {},
            allowedKeys: npcNameGeneratorConfigs.default.allowedKeys,
        })
        );
    });

    it("selects config based on race key", () => {
        const mockName = "Elf Name";
        const elfConfig = { ...npcNameGeneratorConfigs.default, allowedKeys: ["first", "last"] };
        jest.spyOn(generatorModule, "generateNpcNameFromFragments").mockReturnValue(mockName);

        // temporarily override configs for test
        const originalConfigs = { ...npcNameGeneratorConfigs };
        npcNameGeneratorConfigs.elf = elfConfig;

        const name = dispatchNpcName(fragments, { race: ["Elf"] });

        expect(name).toBe(mockName);
        expect(generatorModule.generateNpcNameFromFragments).toHaveBeenCalledWith(
        expect.objectContaining({
            allowedKeys: elfConfig.allowedKeys,
        })
        );

        // restore original configs
        delete npcNameGeneratorConfigs.elf;
        Object.assign(npcNameGeneratorConfigs, originalConfigs);
    });

    it("filters fragments according to allowedKeys in config", () => {
        const mockName = "Filtered Name";
        const customConfig = { allowedKeys: ["first", "last"], fallbackFormats: [] };
        jest.spyOn(generatorModule, "generateNpcNameFromFragments").mockReturnValue(mockName);

        npcNameGeneratorConfigs.custom = customConfig;

        const fragmentsWithExtra = [
        ...fragments,
        { value: "Extra", type: "nickname" as NpcGroupKey, race: [] },
        ];

        const name = dispatchNpcName(fragmentsWithExtra, { race: ["Custom"] });

        expect(name).toBe(mockName);
        expect(generatorModule.generateNpcNameFromFragments).toHaveBeenCalledWith(
        expect.objectContaining({
            fragments: fragmentsWithExtra.filter(f => customConfig.allowedKeys.includes(f.type)),
        })
        );

        delete npcNameGeneratorConfigs.custom;
    });
});
