import { generateSettlementValues, generateSettlementWithName, generateWildernessContext } from "@/lib/modules/settlement/rules/settlement.dispatcher";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

jest.mock("./size.rules", () => ({ applySizeRule: jest.fn((d) => d) }));
jest.mock("./law.rules", () => ({
    applyWealthBySizeRule: jest.fn((d) => d),
    applyCrimeByWealthRule: jest.fn((d) => d),
    applyRulingStyleBySizeRule: jest.fn((d) => d),
}));
jest.mock("./magic.rules", () => ({ applyMagicByWealthRule: jest.fn((d) => d) }));
jest.mock("./race.rules", () => ({ applyRacesByConditions: jest.fn((d) => d) }));
jest.mock("./trade.rules", () => ({ applyTradeNotesRule: jest.fn((d) => d) }));
jest.mock("./domain.rules", () => ({ applyDomainsByConditions: jest.fn((d) => d) }));
jest.mock("./holiday.rules", () => ({ applyHolidaysByConditions: jest.fn((d) => d) }));
jest.mock("./folklore.rules", () => ({ applyFolkloreByConditions: jest.fn((d) => d) }));
jest.mock("@/lib/actions/settlementGenerator.actions", () => ({
    generateSettlementName: jest.fn().mockResolvedValue("TestTown"),
}));
jest.mock("@/lib/actions/environmentGenerator.actions", () => ({
    generateEnvironment: jest.fn().mockResolvedValue({
        climate: "temperate",
        terrain: ["forest"],
        tags: ["magic"],
    }),
}));

import * as sizeRules from "./size.rules";
import * as lawRules from "./law.rules";
import * as magicRules from "./magic.rules";
import * as raceRules from "./race.rules";
import * as tradeRules from "./trade.rules";
import * as domainRules from "./domain.rules";
import * as holidayRules from "./holiday.rules";
import * as folkloreRules from "./folklore.rules";
import * as settlementActions from "@/lib/actions/settlementGenerator.actions";
import * as envActions from "@/lib/actions/environmentGenerator.actions";

describe("Settlement Dispatcher", () => {
    let baseInput: ReturnType<typeof makeSettlementInput>;

    beforeEach(() => {
        jest.clearAllMocks();
        baseInput = makeSettlementInput();
    });

    it("applies all rules sequentially in generateSettlementValues", async () => {
        const result = await generateSettlementValues(baseInput);

        expect(sizeRules.applySizeRule).toHaveBeenCalledWith(baseInput);
        expect(lawRules.applyWealthBySizeRule).toHaveBeenCalledWith(baseInput);
        expect(lawRules.applyCrimeByWealthRule).toHaveBeenCalledWith(baseInput);
        expect(lawRules.applyRulingStyleBySizeRule).toHaveBeenCalledWith(baseInput);
        expect(magicRules.applyMagicByWealthRule).toHaveBeenCalledWith(baseInput);
        expect(raceRules.applyRacesByConditions).toHaveBeenCalledWith(baseInput);
        expect(tradeRules.applyTradeNotesRule).toHaveBeenCalledWith(baseInput);
        expect(domainRules.applyDomainsByConditions).toHaveBeenCalledWith(baseInput);
        expect(holidayRules.applyHolidaysByConditions).toHaveBeenCalledWith(baseInput);
        expect(folkloreRules.applyFolkloreByConditions).toHaveBeenCalledWith(baseInput);

        expect(result).toEqual(baseInput);
    });

    it("generateSettlementWithName returns settlement with generated name", async () => {
        const result = await generateSettlementWithName(baseInput);

        expect(settlementActions.generateSettlementName).toHaveBeenCalledWith({
            climate: baseInput.climate,
            terrain: baseInput.terrain,
            tags: baseInput.tags,
        });

        expect(result).toEqual({
            ...baseInput,
            name: "TestTown",
        });
    });

    it("generateWildernessContext returns environment from generateEnvironment", async () => {
        const context = await generateWildernessContext();

        expect(envActions.generateEnvironment).toHaveBeenCalledWith({
            climate: "random",
            terrain: ["random"],
            tags: ["random"],
        });

        expect(context).toEqual({
            climate: "temperate",
            terrain: ["forest"],
            tags: ["magic"],
        });
    });
});
