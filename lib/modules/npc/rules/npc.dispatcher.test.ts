import * as npcDispatcher from "./npc.dispatcher";
import { NormalizedNpcInput } from "./normalize";
import * as npcActions from "@/lib/actions/npcGenerator.actions";

jest.mock('@/lib/actions/npcGenerator.actions', () => ({
  generateNpcName: jest.fn(async () => 'Mock NPC Name'),
}));

describe("npc.dispatcher", () => {
  const baseInput: NormalizedNpcInput = {
    name: "Test NPC",
    race: "Elf",
    age: "random",
    pronouns: "random",
    alignment: "random",
    status: "random",
    traits: ["random"],
    image: undefined,
    description: undefined,
    connections: [],
    userId: "user-1",
    editors: [],
    isPublic: false,
    gmNotes: undefined,
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("applies all rules in sequence and updates fields", async () => {
    // Inject mock rules directly to avoid using real rules
    const mockRules = [
      async (x: NormalizedNpcInput) => ({ ...x, age: "Young Adult" }),
      async (x: NormalizedNpcInput) => ({ ...x, pronouns: "they/them" }),
      async (x: NormalizedNpcInput) => ({ ...x, race: "High Elf" }),
      async (x: NormalizedNpcInput) => ({ ...x, alignment: "Chaotic Good" }),
      async (x: NormalizedNpcInput) => ({ ...x, status: "Active" }),
      async (x: NormalizedNpcInput) => ({ ...x, traits: ["brave", "cunning"] }),
    ];

    const result = await npcDispatcher.generateNpcValues(baseInput, mockRules);

    expect(result.age).toBe("Young Adult");
    expect(result.pronouns).toBe("they/them");
    expect(result.race).toBe("High Elf");
    expect(result.alignment).toBe("Chaotic Good");
    expect(result.status).toBe("Active");
    expect(result.traits).toEqual(["brave", "cunning"]);
  });

  it("generates NPC with name using generateNpcName without hitting DB", async () => {
    const mockName = "Elrond";

    // Mock generateNpcName to avoid DB
    (npcActions.generateNpcName as jest.Mock).mockResolvedValue(mockName);

    // Provide rules that just return the input
    const identityRules = [
      async (x: NormalizedNpcInput) => x,
    ];

    const result = await npcDispatcher.generateNpcWithName(baseInput, identityRules);

    expect(result.name).toBe(mockName);
    expect(result.race).toBe(baseInput.race);
    expect(result.age).toBe(baseInput.age);
  });

  it("passes race as array to generateNpcName", async () => {
    const mockName = "Legolas";

    let capturedRace: string[] | undefined = undefined;

    (npcActions.generateNpcName as jest.Mock).mockImplementation(async ({ race }) => {
      capturedRace = race;
      return mockName;
    });

    const identityRules = [
      async (x: NormalizedNpcInput) => x,
    ];

    await npcDispatcher.generateNpcWithName(baseInput, identityRules);

    expect(capturedRace).toEqual([baseInput.race]);
  });
});
