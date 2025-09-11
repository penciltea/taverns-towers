import { normalizeNpcInput } from "./normalize";
import { normalizeCommonInput } from "@/lib/util/normalizeData";
import { Npc } from "@/interfaces/npc.interface";

jest.mock("@/lib/util/normalizeData");

describe("normalizeNpcInput", () => {
  const mockNormalizeCommonInput = normalizeCommonInput as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fills missing string fields with 'random'", () => {
    mockNormalizeCommonInput.mockReturnValue({ name: "Test NPC" });

    const input: Partial<Npc> = {};
    const result = normalizeNpcInput(input);

    expect(result.race).toBe("random");
    expect(result.age).toBe("random");
    expect(result.pronouns).toBe("random");
    expect(result.alignment).toBe("random");
    expect(result.status).toBe("random");
    expect(result.traits).toEqual(["random"]);
    expect(result.connections).toEqual([]);
    expect(result.name).toBe("Test NPC"); // from common normalization
  });

  it("preserves provided values", () => {
    mockNormalizeCommonInput.mockReturnValue({ name: "NPC Name" });

    const input: Partial<Npc> = {
      race: "elf",
      age: "adult",
      pronouns: "she/her",
      alignment: "Chaotic Good",
      status: "Alive",
      traits: ["brave", "curious"],
      image: "some-image.png",
      description: "A descriptive NPC",
      connections: [
        { type: "settlement", id: "settlement-1", role: "leader" },
        { type: "npc", id: "npc-2", role: "friend" },
      ],
    };

    const result = normalizeNpcInput(input);

    expect(result.race).toBe("elf");
    expect(result.age).toBe("adult");
    expect(result.pronouns).toBe("she/her");
    expect(result.alignment).toBe("Chaotic Good");
    expect(result.status).toBe("Alive");
    expect(result.traits).toEqual(["brave", "curious"]);
    expect(result.image).toBe("some-image.png");
    expect(result.description).toBe("A descriptive NPC");
    expect(result.connections).toEqual([
      { type: "settlement", id: "settlement-1", role: "leader" },
      { type: "npc", id: "npc-2", role: "friend" },
    ]);
  });

  it("treats empty strings as missing and replaces with 'random'", () => {
    mockNormalizeCommonInput.mockReturnValue({ name: "Empty Fields NPC" });

    const input: Partial<Npc> = {
      race: "",
      age: " ",
      pronouns: "",
      alignment: " ",
      status: "",
      traits: [],
    };

    const result = normalizeNpcInput(input);

    expect(result.race).toBe("random");
    expect(result.age).toBe("random");
    expect(result.pronouns).toBe("random");
    expect(result.alignment).toBe("random");
    expect(result.status).toBe("random");
    expect(result.traits).toEqual(["random"]);
    expect(result.connections).toEqual([]);
  });

  it("normalizes invalid or incomplete connections to valid NpcConnection[]", () => {
    mockNormalizeCommonInput.mockReturnValue({ name: "NPC With Bad Connections" });

    // Explicitly mark invalid shapes as Partial<NpcConnection> | null
    const input = {
      connections: [
        { type: "settlement", id: "settlement-1" }, // missing 'role'
        { id: "npc-2", role: "friend" },           // missing 'type'
        null,                                      // completely invalid
      ],
    } as unknown as Partial<Npc>;
    
    const result = normalizeNpcInput(input);

    // Should still default to empty array because the input was invalid
    // You could optionally implement a sanitize step in normalizeNpcInput to filter invalid entries
    expect(result.connections).toEqual([]);
    });

});
