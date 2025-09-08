import { applyAgeRule, applyPronounsRule, applyRaceRule, applyAlignmentRule, applyStatusRule, applyTraitsRule } from './applyRules';
import { normalizeNpcInput } from "./normalize";
import * as randomValues from "@/lib/util/randomValues";

describe('applyAgeRule', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // resets spyOn/mocks
    });

    it('replaces "random" age with a valid age', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Adult");

        const input = normalizeNpcInput({ age: "random" });
        const result = applyAgeRule(input);

        expect(result.age).toBe("Adult");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('sets a valid age if age is missing', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Elder");
        const input = normalizeNpcInput({ });
        const result = applyAgeRule(input);
        expect(result.age).toBe("Elder");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('leaves a specified age unchanged', () => {
        const input = normalizeNpcInput({ age: "Young" });
        const result = applyAgeRule(input);
        expect(result.age).toBe("Young");
    });
});

describe('applyPronounsRule', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // resets spyOn/mocks
    });

    it('replaces "random" pronouns with valid pronouns', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("they/them");
        const input = normalizeNpcInput({ pronouns: "random" });
        const result = applyPronounsRule(input);
        expect(result.pronouns).toBe("they/them");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('sets valid pronouns if pronouns are missing', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("she/her");
        const input = normalizeNpcInput({ });
        const result = applyPronounsRule(input);
        expect(result.pronouns).toBe("she/her");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('leaves specified pronouns unchanged', () => {
        const input = normalizeNpcInput({ pronouns: "he/him" });
        const result = applyPronounsRule(input);
        expect(result.pronouns).toBe("he/him");
    });
});

describe('applyRaceRule', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // resets spyOn/mocks
    });

    it('replaces "random" race with valid race', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue({ value: "human"});
        const input = normalizeNpcInput({ race: "random" });
        const result = applyRaceRule(input);
        expect(result.race).toBe("human");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('sets valid race if race is missing', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue({ value: "human" });
        const input = normalizeNpcInput({ });
        const result = applyRaceRule(input);
        expect(result.race).toBe("human");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('leaves specified race unchanged', () => {
        const input = normalizeNpcInput({ race: "human" });
        const result = applyRaceRule(input);
        expect(result.race).toBe("human");
    });
});

describe('applyAlignmentRule', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // resets spyOn/mocks
    });

    it('replaces "random" alignment with valid alignment', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Lawful Good");
        const input = normalizeNpcInput({ alignment: "random" });
        const result = applyAlignmentRule(input);
        expect(result.alignment).toBe("Lawful Good");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('sets valid alignment if alignment is missing', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Lawful Good");
        const input = normalizeNpcInput({ });
        const result = applyAlignmentRule(input);
        expect(result.alignment).toBe("Lawful Good");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('leaves specified alignment unchanged', () => {
        const input = normalizeNpcInput({ alignment: "Lawful Good" });
        const result = applyAlignmentRule(input);
        expect(result.alignment).toBe("Lawful Good");
    });
});


describe('applyStatusRule', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // resets spyOn/mocks
    });

    it('replaces "random" status with valid status', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Alive");
        const input = normalizeNpcInput({ status: "random" });
        const result = applyStatusRule(input);
        expect(result.status).toBe("Alive");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('sets valid status if status is missing', () => {
        jest.spyOn(randomValues, "getRandom").mockReturnValue("Alive");
        const input = normalizeNpcInput({ });
        const result = applyStatusRule(input);
        expect(result.status).toBe("Alive");
        expect(randomValues.getRandom).toHaveBeenCalledWith(expect.any(Array));
    });

    it('leaves specified status unchanged', () => {
        const input = normalizeNpcInput({ status: "Alive" });
        const result = applyStatusRule(input);
        expect(result.status).toBe("Alive");
    });
});


jest.mock("@/constants/npc.options", () => ({
  ...jest.requireActual("@/constants/npc.options"),
  NPC_TRAITS: [
    { label: "Personality", options: [{ label: "Brave", value: "brave" }, { label: "Cunning", value: "cunning" }] },
    { label: "Quirk", options: [{ label: "Stutters", value: "stutters" }, { label: "Laughs Loudly", value: "laughs loudly" }] },
  ],
}));


describe("applyTraitsRule", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("replaces 'random' traits with predictable selection", () => {
    jest.spyOn(randomValues, "getRandomSubset").mockReturnValue(["brave"]);

    const input = normalizeNpcInput({ traits: ["random"] });
    const result = applyTraitsRule(input);

    expect(result.traits).toEqual(["brave"]);
    expect(randomValues.getRandomSubset).toHaveBeenCalledWith(
      expect.arrayContaining(["brave"]),
      { min: 1, max: 4 }
    );
  });

  it("does not change traits if already set", () => {
    const input = normalizeNpcInput({ traits: ["brave", "stutters"] });
    const result = applyTraitsRule(input);

    expect(result.traits).toEqual(["brave", "stutters"]);
  });
});